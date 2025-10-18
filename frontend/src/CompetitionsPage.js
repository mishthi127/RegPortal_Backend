import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import addformbg from "./assets/backflowers.svg";
import logo from "./assets/alcherlogo.svg";
import "./CompetitionPage.css";
import DecorativeButton from "./components/DecorativeButton";
import flower from "./assets/heading-icon-red.svg";
import dropdown_back from "./assets/dropdown_back.svg";
import searchbar_back from "./assets/searchbar_back.svg";
import competitions from "./assets/competitions.svg";
import dropbutton from "./assets/dropbutton.svg";
function ModuleDropdown({ modules, selectedModule, setSelectedModule }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (module) => {
    setSelectedModule(module);
    setOpen(false);
  };
  


  return (
    <div
      className=" relative   relative flex justify-center items-center p-4 w-full max-w-[560px] box-border  w-[90%] sm:w-[80%] md:w-[560px]
    h-[60px] sm:h-[65px] md:h-[71px]"
      style={{
        backgroundImage: `url(${dropdown_back})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundColor:"black",
        position: "relative",
        display: "flex",
        justifyContent: "center",  
        alignItems: "center",
        width: 560,
        height: 71,
        cursor: "pointer",
        fontFamily: "'TT Modernoir', sans-serif",
      }}
    >
      {/* Header / Button */}
      <div
        className="w-full p-2 sm:p-3 md:p-4 text-sm sm:text-base md:text-lg rounded-lg flex items-center justify-center relative"
        onClick={() => setOpen(!open)}
        style={{
          backgroundImage: `url(${searchbar_back})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          width: "419px",
          height: "49px",
          backgroundColor: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
          fontWeight: "bold",
          color: "#EF5243",
          
        }}
      >
        <span style={{marginRight:"10px"}}>{selectedModule === "all" ? "All Module" : selectedModule}

        {/* Dropdown Arrow Button */}
        <button
          aria-label={open ? "Close modules list" : "Open modules list"}
          style={{
            position: "absolute",
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
            left:" calc(100% - 50px)",
          }}
          onClick={(e) => {
            e.stopPropagation(); // don't trigger header click twice
            setOpen((s) => !s);
          }}
        >
          <img src={dropbutton} alt="dropdown arrow" style={{ width: "20px", height: "20px",marginLeft:"10px" }} />
        </button>
        </span>
      </div>

      {/* List */}
      {open && (
        <div
        className="no-scrollbar "
          style={{
            position: "absolute",
            top: 71,
            left: 0,
            backgroundColor: "transparent",
            width: "100%",
            overflow: "hidden",
            textAlign: "center",
            zIndex: 10,
            maxHeight: "180px",
            overflowY: "auto",
            fontFamily: "'TT Modernoir', sans-serif",
          }}
        >
          <div
            className="searchh-input  double-notch-all"
            style={{
              border:"1px solid rgba(0,0,0,0.2)",
              width: "100%",
              height: "90%",
              backgroundColor: "#FFB261",
              cursor: "pointer",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              transition: "background-color 0.2s",
            }}
            onClick={() => handleSelect("all")}
           
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EF5243")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB261")}
          >
            All Modules
          </div>

          {modules.map((mod) => (
            <div
              className="   searchh-input double-notch-all"
              key={mod.id}
              onClick={() => handleSelect(mod.module)}
              style={{
                width: "100%",
                height: "90%",
                cursor: "pointer",
               
                backgroundColor: "#FFB261",
                borderBottom: "1px solid rgba(0,0,0,0.2)",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EF5243")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFB261")}
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
    padding: "20px",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={formBgStyle} className=" min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden box-border">
      <div className="w-full max-w-[1200px] mx-auto  box-border">
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
        className="flex flex-col lg:flex-row items-center gap-4 justify-between w-full"
      >
        <Link to="/" >
          <img src={logo} alt="Alcheringa Logo" style={{ height: "50px", cursor: "pointer" }} className="flex-shrink"/>
        </Link>
         <div  className="w-full lg:w-1/2 flex-shrink">
        <ModuleDropdown
          modules={data2}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
         
        /></div>
        <div className="w-full lg:w-1/6 max-w-[360px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" searchh-input double-notch-all2 "
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: 230,
            height: 28,
            padding: "0 8px",
            backgroundColor: "#FFD09F",
            border: "none",
            fontSize: "0.9rem",
            color: "#000",
            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
          }}
        /></div>
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
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column",width:"100vw" }}>
        <div 
          className="competitions-grid w-full flex transform scale-100 sm:scale-95 md:scale-90  flex-wrap justify-center lg:justify-center overflow-y-auto overscroll-auto no-scrollbar"
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
                className="competition-card card double-notch-all"
                style={{
                  
                  width: "390px",
                  height: "281px",
                  background: comp.image ? `url(${competitions}) center/cover no-repeat ` : "#000",
                  position: "relative",
                  overflow: "hidden",
                  margin: "0.5rem",
                }}
              >
               
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
                   
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // adjust opacity for darkness
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold",display:"flex",color:"#fff" }}><img src={flower} alt="Alcheringa Logo" style={{ height: "20px", cursor: "pointer" ,margin:"7px"}} /> {comp.event_name} <img src={flower} alt="Alcheringa Logo" style={{ height: "20px", cursor: "pointer" ,margin:"7px"}} /></h3>
                  <p className="prize" style={{ margin: 0, fontSize: "0.9rem", textAlign: "center", color:"#fff"}}>{comp.event_desc}</p>
                  <p className="prize" style={{ margin: 0, fontSize: "0.9rem", textAlign: "center", color:"#fff"}}>${comp.prize_worth}</p>

                  <DecorativeButton to={`/register/${comp.event_name}`} onClick={() => setSelectedComp(comp)} className = "dec-btn" variant="orange-sm">Register</DecorativeButton>
                 
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

    </div>
    </div>
  );
}

export default CompetitionsList;
