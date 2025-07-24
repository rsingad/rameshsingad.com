import { NavLink } from "react-router-dom";
function Project() {
  const projects = [
    {
      title: "tourscape",
      url: "https://singgad-site.netlify.app",
      github: "https://github.com/rsingad/singad.git",
      img: "tourscape.png",
      technology: [
        "react",
        "bootstrap",
        "mok-api",
        "js",
        "hooks",
        "log-authentication",
        "custumber-support(real time chat)",
        "contxt-api",
      ],
    },
    {
      title: "weading web",
      url: "https://ramesh2ndproject.netlify.app",
      img: "image.png",
      github: "https://github.com/rsingad/desktop-base-web.git",
      technology: ["html", "css", "media quary"],
    },
    {
      title: "desktop base website[NAMARI]",
      url: "https://rameshproject4.netlify.app",
      github: "https://github.com/rsingad/desktop-base-web.git",
      img: "namari.png",
      technology: ["html", "css"],
    },{
      title: "ecoworld",
      url: "https://ecoworldiii.netlify.app/",
      // github: "https://github.com/rsingad/desktop-base-web.git",
      // img: "namari.png",
      technology: ["Reactjs+vite", "netlify","express","mongodb"],
    },{
      title: "thelakemount0-2",
      url: "https://the-lake-mount-0-2.vercel.app/",
      // github: "https://github.com/rsingad/desktop-base-web.git",
      // img: "namari.png",
      technology: ["html", "css"],
    },
    {
      title: "thelakemount0-3",
      url: "https://the-lake-mount-0-3-lred.vercel.app/",
      // github: "https://github.com/rsingad/desktop-base-web.git",
      // img: "namari.png",
      technology: ["html", "css"],
    },
   
  ];
  return (
    <>
      <h1>latest project</h1>

      <div className="project">
        {projects.map((project, index) => (
          <div key={index} className="project_card">
            {/* <div className="project-title">{project.title}</div> */}
            <img src={project.img} alt="" />
            <h1 className="fam2">{project.title}</h1>
            <p>Some text about the project....</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {project.technology.map((item, ind) => {
                return (
                  <div className=""
                    style={{
                      backgroundColor: " rgb(222, 222, 222)",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <p>
              <NavLink to={project.url} target="_blank">
                <button>demo</button>
              </NavLink>{" "}
              <NavLink to={project.github} target="_blank">
                <button>GitHub</button>
              </NavLink>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Project;
