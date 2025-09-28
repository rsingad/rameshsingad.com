import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getFirestore, doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { addDoc, getDoc, deleteDoc } from 'firebase/firestore'; // त्रुटि ठीक करने के लिए अलग किया गया
import { Phone, PhoneCall, Mic, MicOff, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Global Firebase Variables (Canvas Environment से आवश्यक) ---
// इन्हें App कंपोनेंट के बाहर परिभाषित किया जाता है
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- WebRTC Configuration ---
const PEER_CONFIG = {
    iceServers: [
        // NAT traversal के लिए Google का सार्वजनिक STUN सर्वर
        { urls: 'stun:stun.l.google.com:19302' },
    ],
};

// --- WebRTC Voice Call System Component ---
// यह कंपोनेंट मुख्य App लॉजिक से अलग है।
function VoiceCallSystem({ db, userId, authStatus }) {
    const [status, setStatus] = useState(authStatus);
    const [callId, setCallId] = useState('');
    const [inputCallId, setInputCallId] = useState('');
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);

    // WebRTC और ऑडियो रेफ़रेंस
    const pcRef = useRef(null);
    const localAudioRef = useRef(null);
    const remoteAudioRef = useRef(null);

    // ऑथेंटिकेशन स्थिति के आधार पर स्थिति अपडेट करें
    useEffect(() => {
        setStatus(authStatus);
    }, [authStatus]);

    // --- Firestore Path Helper ---
    // कॉल दस्तावेज़ (document) के लिए Firestore पथ प्राप्त करें
    const getCallDocRef = useCallback((id) => {
        // Public data path: /artifacts/{appId}/public/data/voice_calls/{callId}
        return doc(db, 'artifacts', appId, 'public', 'data', 'voice_calls', id);
    }, [db]);

    const getCollectionRef = useCallback((id, name) => {
        return collection(getCallDocRef(id), name);
    }, [getCallDocRef]);

    // --- 2. स्थानीय मीडिया स्ट्रीम सेटअप (Local Media Stream Setup) ---
    const startLocalStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            setLocalStream(stream);
            if (localAudioRef.current) {
                localAudioRef.current.srcObject = stream;
            }
            return stream;
        } catch (error) {
            console.error("Error accessing media devices:", error);
            setStatus('Error: Microphone access denied or failed.');
            return null;
        }
    };

    // --- 3. WebRTC कोर सेटअप (WebRTC Core Setup) ---
    const setupPeerConnection = (stream, callId) => {
        pcRef.current = new RTCPeerConnection(PEER_CONFIG);

        // स्थानीय ऑडियो ट्रैक Peer Connection में जोड़ें
        stream.getTracks().forEach(track => {
            pcRef.current.addTrack(track, stream);
        });

        // रिमोट ट्रैक (दूसरे उपयोगकर्ता का ऑडियो) को संभालें
        pcRef.current.ontrack = (event) => {
            if (remoteAudioRef.current && event.streams[0]) {
                const newRemoteStream = event.streams[0];
                setRemoteStream(newRemoteStream);
                remoteAudioRef.current.srcObject = newRemoteStream;
            }
        };

        const iceCandidatesCollection = getCollectionRef(callId, 'iceCandidates');

        // स्थानीय ICE Candidate को Firestore में भेजें
        pcRef.current.onicecandidate = async (event) => {
            if (event.candidate) {
                await addDoc(iceCandidatesCollection, event.candidate.toJSON());
            }
        };

        // रिमोट ICE Candidate को सुनें और जोड़ें
        onSnapshot(iceCandidatesCollection, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                if (change.type === 'added') {
                    try {
                        await pcRef.current.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                    } catch (e) {
                        console.error('Error adding remote ICE candidate:', e);
                    }
                }
            });
        });

        setStatus('Peer Connection स्थापित। सिग्नलिंग की प्रतीक्षा...');
    };

    // --- 4. कॉल बनाना (Caller / Offer Initiator) ---
    const createCall = async () => {
        if (!db || !userId) return;
        setStatus('कॉल सेटअप कर रहा है...');

        const stream = await startLocalStream();
        if (!stream) return;

        const newCallId = Math.random().toString(36).substring(2, 8).toUpperCase();
        setCallId(newCallId);

        setupPeerConnection(stream, newCallId);

        try {
            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);

            // Offer को Firestore में सहेजें
            await setDoc(getCallDocRef(newCallId), {
                offer: { type: offer.type, sdp: offer.sdp },
                callerId: userId,
                status: 'pending',
                createdAt: new Date().toISOString(),
            });

            setStatus(`कॉल बनाया गया! ID साझा करें: ${newCallId}`);
            setIsCallActive(true);

            // Answer की प्रतीक्षा करें
            onSnapshot(getCallDocRef(newCallId), async (docSnapshot) => {
                const data = docSnapshot.data();
                if (data?.answer && !pcRef.current.currentRemoteDescription) {
                    const answerDescription = new RTCSessionDescription(data.answer);
                    await pcRef.current.setRemoteDescription(answerDescription);
                    setStatus('कॉल कनेक्ट हो गया!');
                }
            });
        } catch (error) {
            console.error('Error creating call:', error);
            setStatus('कॉल बनाने में त्रुटि। कंसोल देखें।');
        }
    };

    // --- 5. कॉल से जुड़ना (Answerer) ---
    const joinCall = async (idToJoin) => {
        if (!db || !userId || !idToJoin) return;
        setStatus('कॉल से जुड़ रहा है...');

        const stream = await startLocalStream();
        if (!stream) return;

        setCallId(idToJoin);

        try {
            const callDoc = await getDoc(getCallDocRef(idToJoin));
            if (!callDoc.exists() || callDoc.data().status !== 'pending') {
                setStatus('त्रुटि: कॉल ID नहीं मिला या कॉल पहले से सक्रिय है।');
                return;
            }

            setupPeerConnection(stream, idToJoin);

            // Offer प्राप्त करें और Answer बनाएं
            const offerDescription = callDoc.data().offer;
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);

            // Answer को Firestore में सहेजें
            await setDoc(getCallDocRef(idToJoin), {
                ...callDoc.data(),
                answer: { type: answer.type, sdp: answer.sdp },
                answererId: userId,
                status: 'active',
            }, { merge: true });

            setStatus('कॉल कनेक्ट हो गया!');
            setIsCallActive(true);

        } catch (error) {
            console.error('Error joining call:', error);
            setStatus('कॉल से जुड़ने में त्रुटि। कंसोल देखें।');
        }
    };

    // --- 6. कॉल समाप्त करना और क्लीनअप (Hang Up and Cleanup) ---
    const hangUp = async () => {
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
            if (localAudioRef.current) localAudioRef.current.srcObject = null;
        }
        if (remoteStream && remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = null;
            setRemoteStream(null);
        }
        // Firestore दस्तावेज़ हटाएं
        if (callId) {
            await deleteDoc(getCallDocRef(callId));
            setCallId('');
            setInputCallId('');
        }
        setIsCallActive(false);
        setIsMuted(false);
        setStatus('कॉल समाप्त हुआ। नए कॉल के लिए तैयार।');
    };

    // --- 7. म्यूट/अनम्यूट कार्यक्षमता (Mute/Unmute Functionality) ---
    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
            setIsMuted(!isMuted);
        }
    };

    const buttonClass = (color) => `flex-1 py-3 px-4 rounded-xl text-white font-semibold shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 ${color}`;

    return (
        <div className="p-4 sm:p-8 min-h-[90vh] bg-slate-900 text-white font-inter">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
                लाइव वॉयस कनेक्ट
            </h1>
            <p className="text-center text-sm mb-8 text-slate-400">Firestore के माध्यम से सुरक्षित P2P कॉल सिग्नलिंग</p>

            <div className={`max-w-md mx-auto p-6 rounded-2xl shadow-2xl transition-all duration-300 ${isCallActive ? 'bg-indigo-900/50 border border-indigo-700' : 'bg-slate-800/70 border border-slate-700'}`}>
                
                <div className="text-center mb-6">
                    <motion.div
                        className="p-4 inline-block rounded-full mb-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: isCallActive ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                         {isCallActive ? (
                            <PhoneCall size={48} className="text-cyan-400 animate-pulse" />
                        ) : (
                            <Zap size={48} className="text-indigo-400" />
                        )}
                    </motion.div>
                    <p className="text-lg font-mono text-slate-300 break-words">{status}</p>
                </div>

                {isCallActive && callId && (
                    <div className="mb-6 p-4 bg-slate-700 rounded-xl text-center">
                        <p className="text-sm text-slate-300 mb-1">सक्रिय कॉल ID:</p>
                        <p className="text-3xl font-bold text-cyan-300 tracking-wider select-text">{callId}</p>
                        <p className="text-xs text-slate-400 mt-2">कनेक्ट करने के लिए यह ID साझा करें।</p>
                    </div>
                )}
                
                <div className="space-y-4">
                    {!isCallActive ? (
                        <motion.button 
                            onClick={createCall} 
                            disabled={!userId || db === null}
                            className={buttonClass('bg-green-600 hover:bg-green-500')}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Phone size={20} className="inline mr-2" /> 
                            नया कॉल शुरू करें
                        </motion.button>
                    ) : (
                        <div className="flex gap-4">
                            <motion.button 
                                onClick={toggleMute} 
                                className={buttonClass(isMuted ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-indigo-600 hover:bg-indigo-500')}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                {isMuted ? <MicOff size={20} className="inline mr-2" /> : <Mic size={20} className="inline mr-2" />} 
                                {isMuted ? 'अनम्यूट' : 'म्यूट'}
                            </motion.button>

                            <motion.button 
                                onClick={hangUp} 
                                className={buttonClass('bg-red-600 hover:bg-red-500')}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                <Phone size={20} className="inline mr-2 rotate-[135deg]" /> 
                                कॉल काटें
                            </motion.button>
                        </div>
                    )}

                    {!isCallActive && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-slate-700">
                            <input
                                type="text"
                                value={inputCallId}
                                onChange={(e) => setInputCallId(e.target.value.toUpperCase())}
                                placeholder="जुड़ने के लिए कॉल ID दर्ज करें"
                                className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-400 text-white"
                                disabled={!userId || db === null}
                            />
                            <motion.button 
                                onClick={() => joinCall(inputCallId)} 
                                disabled={!userId || db === null || inputCallId.length !== 6}
                                className={buttonClass('bg-cyan-600 hover:bg-cyan-500')}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <User size={20} className="inline mr-2" /> 
                                कॉल से जुड़ें
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* छुपे हुए ऑडियो तत्व (Hidden Audio Elements) */}
                <audio ref={localAudioRef} autoPlay muted className="hidden"></audio>
                <audio ref={remoteAudioRef} autoPlay className="hidden"></audio>
            </div>
        </div>
    );
}

export default VoiceCallSystem;
