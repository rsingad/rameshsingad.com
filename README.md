# Ramesh Singad Portfolio - Frontend

A premium, high-performance personal portfolio website built with React and Vite. This project features dynamic tech insights, a real-time SEO traffic dashboard, and a state-of-the-art UI/UX.

## 🚀 Features

- **Dynamic Tech Insights:** AI-powered trending tech news with expert analysis.
- **Traffic & SEO Dashboard:** Internal controller to monitor site visibility and manage content.
- **Insight Detail Pages:** Individual SEO-optimized pages for every tech insight.
- **Interactive Chatbot:** Context-aware assistant for user interaction.
- **Modern UI/UX:** Built with Framer Motion for sleek animations and glassmorphism.
- **Premium Aesthetics:** Custom color palettes, dark mode, and responsive design.
- **SEO Ready:** Integration with `react-helmet-async` for dynamic meta tags and social sharing.

## 🛠️ Technologies Used

- **Framework:** React 18 (Vite)
- **Styling:** CSS3, Tailwind CSS (for layout utilities)
- **Animations:** Framer Motion
- **Icons:** Lucide React, React Icons
- **Routing:** React Router DOM v6
- **Data Fetching:** Axios
- **SEO:** React Helmet Async
- **3D Elements:** Three.js, @react-three/fiber, @react-three/drei
- **AI Integration:** Groq SDK (via backend)

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── TechInsights.jsx # News & Expert Perspectives
│   ├── InsightDetail.jsx# Individual Insight Page
│   ├── TrafficDashboard.jsx # SEO & Traffic Control
│   ├── Chatbot.jsx      # AI Assistant
│   └── ...              # Other core pages (Home, About, etc.)
├── App.jsx              # Main routing and app structure
├── main.jsx             # Entry point with Providers
└── index.css            # Global styles and design system
```

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_APP_NAME="Ramesh Singad Portfolio"
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🌐 SEO & Rendering

This project uses **Client-Side Rendering (CSR)** with dynamic header updates via `react-helmet-async`. Google Bot and other modern search engines are capable of executing the JavaScript to index the dynamic content.

## 📄 License

Individual/Personal Use - Ramesh Singad.
