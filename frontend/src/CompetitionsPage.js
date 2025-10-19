import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import addformbg from "./assets/backflowers.svg";
import { Footer } from "./components/landingPage/Footer";
import logo from "./assets/alcherlogo.svg";
import "./CompetitionPage.css";
import DecorativeButton from "./components/DecorativeButton";
import flower from "./assets/heading-icon-red.svg";
import exampleimage from "./assets/addmembtn.png";

function ModuleDropdown({ modules, selectedModule, setSelectedModule }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (module) => {
    setSelectedModule(module);
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: 560,
        height: 71,
        borderLeft: "20px solid black",
        borderTop: "20px solid transparent",
        borderBottom: "20px solid transparent",
        borderRight: "20px solid black",
        borderRadius: 12,
        boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        backgroundColor: "#FDF6E3",
        cursor: "pointer",
        padding: "25px",
        fontFamily: "'TT Modernoir', sans-serif",
      }}
    >
      {/* Header / Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#FDF6E3",
          borderRadius: 12,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
          fontWeight: "bold",
          color: "#EF5243",
        }}
      >
        <span>{selectedModule === "all" ? "All Modules" : selectedModule}</span>

        {/* Dropdown Arrow Button */}
        <button
          aria-label={open ? "Close modules list" : "Open modules list"}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: open ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#EF5243",
            transition: "transform 0.2s ease",
            padding: 0,
            lineHeight: 1,
          }}
          onClick={(e) => {
            e.stopPropagation(); // don't trigger header click twice
            setOpen((s) => !s);
          }}
        >
          ▼
        </button>
      </div>

      {/* List */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 71,
            left: 0,
            width: "100%",
            background: "#FDF6E3",
            borderRadius: 12,
            overflow: "hidden",
            zIndex: 10,
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            maxHeight: "300px",
            overflowY: "auto",
            fontFamily: "'TT Modernoir', sans-serif",
          }}
        >
          <div
            onClick={() => handleSelect("all")}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D3D3D3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FDF6E3")}
          >
            All Modules
          </div>

          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => handleSelect(mod.module)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid rgba(0,0,0,0.2)",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D3D3D3")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FDF6E3")}
            >
              {mod.module}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CompetitionsList() {
  const location = useLocation();
  const moduleFromNav = location.state?.module;

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedModule, setSelectedModule] = useState(moduleFromNav || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState("all");

  // modal state - selected competition to show details
  const [selectedComp, setSelectedComp] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/competitions/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setData(Array.isArray(json.allcomp) ? json.allcomp : []);
        setData2(Array.isArray(json.modules) ? json.modules : []);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredData = data.filter((comp) => {
    const moduleMatch =
      selectedModule === "all" ||
      (comp.module && comp.module.module === selectedModule);
    const modeMatch =
      modeFilter === "all" || (comp.event_mode && comp.event_mode === modeFilter);
    const allFields = Object.values(comp)
      .map((val) =>
        typeof val === "object"
          ? JSON.stringify(val).toLowerCase()
          : (val ? val.toString().toLowerCase() : "")
      )
      .join(" ");
    const searchMatch = allFields.includes(searchTerm.toLowerCase());
    return moduleMatch && searchMatch && modeMatch;
  });

  const formBgStyle = {
    backgroundImage: `url(${addformbg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#EEECD9",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={formBgStyle} className="no-scrollbar">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
        className="lg:flex-row flex-col"
      >
        <Link to="/" >
          <img src={logo} alt="Alcheringa Logo" style={{ height: "50px", cursor: "pointer" }} />
        </Link>

        <ModuleDropdown
          modules={data2}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
         
        />

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" search-input w-full flex flex-col sm:flex-row items-center sm:justify-between gap-3 px-4 sm:px-8 mt-4"
          style={{
            width: 220,
            height: 28,
            padding: "0 8px",
            borderRadius: 6,
            border: "2px solid #000",
            backgroundColor: "#FDF6E3",
            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            fontSize: "0.9rem",
            color: "#000",
          }}
        />
      </div>

      {/* Mode Filters */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {["all", "online", "offline"].map((mode) => (
          <div
            key={mode}
            onClick={() => setModeFilter(mode)}
            style={{
              padding: "6px 12px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: modeFilter === mode ? "bold" : "normal",
              backgroundColor: modeFilter === mode ? "#EF5243" : "#FDF6E3",
              border: "1px solid #000",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D3D3D3")}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                modeFilter === mode ? "#EF5243" : "#FDF6E3";
            }}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </div>
        ))}
      </div>

      {/* Competitions Grid */}
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <div
          className="competitions-grid flex flex-col lg:flex-wrap gap-4 justify-center lg:justify-start max-w-full overflow-y-auto overscroll-auto no-scrollbar"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "flex-start",
            maxWidth: "100%",
            overflowY: "auto",
            overscrollBehavior: "auto",
          }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((comp) => (
              <div
                key={comp.id}
                className="competition-card"
                style={{
                  width: "416px",
                  height: "281px",
                  background: comp.image ? `url(${comp.image}) center/cover no-repeat` : "#000",
                  borderRadius: "12px",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                  position: "relative",
                  overflow: "hidden",
                  margin: "0.5rem",
                }}
              >
                <img src="http://localhost:8000/media/image_uploads/batmobile-car-with-neon-lights.jpg" className="w-full h-full"/>
                  <div
                  className="competition-default"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "1rem",
                    color: "#fff",
                  
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold",display:"flex",color:"#EF5243" }}><img src={flower} alt="Alcheringa Logo" style={{ height: "20px", cursor: "pointer" ,margin:"7px"}} /> {comp.event_name} <img src={flower} alt="Alcheringa Logo" style={{ height: "20px", cursor: "pointer" ,margin:"7px"}} /></h3>
                  <p className="prize" style={{ margin: 0, fontSize: "0.9rem", textAlign: "center", color:"#000"}}>{comp.event_desc}</p>
                  <p className="prize" style={{ margin: 0, fontSize: "0.9rem", textAlign: "center", color:"#000"}}>${comp.prize_worth}</p>

                  <DecorativeButton to={`/register/${comp.id}`} onClick={() => setSelectedComp(comp)} className = "dec-btn" variant="orange-sm"> Register</DecorativeButton>
                 
                </div>
              
                    
          
              </div>
            ))
          ) : (
            <p>No competitions found.</p>
          )}
        </div>
      </div>

      {/* Details Modal (first step) */}
      {selectedComp && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
        >
          <div
            className="modal-content"
            style={{
              width: "100%",
              maxWidth: "720px",
              background: "#fff",
              borderRadius: 12,
              padding: "1.5rem",
              boxSizing: "border-box",
            }}
          >
            

            {/* Actions: Close or go to registration form */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                onClick={() => setSelectedComp(null)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Close
              </button>

              <Link to={`/register/${selectedComp.id}`}>
                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#EF5243",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CompetitionsList;
