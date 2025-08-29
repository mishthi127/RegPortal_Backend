import { useEffect, useState } from "react";
import "./CompetitionPage.css";

function CompetitionsList() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedModule, setSelectedModule] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState("all"); // New state for mode filter

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/competitions/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setData(Array.isArray(json.allcomp) ? json.allcomp : []);
        setData2(Array.isArray(json.modules) ? json.modules : []);
        console.log(json.allcomp);
        console.log(json.modules);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Combined filter: module + search
  const filteredData = data.filter((comp) => {
    // module filter
    const moduleMatch =
      selectedModule === "all" ||
      (comp.module && comp.module.module === selectedModule);

    // mode filter (online / offline / all)
    const modeMatch =
      modeFilter === "all" ||
      (comp.event_mode &&
        comp.event_mode === modeFilter);

    // search filter across all fields
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

  return (
    <div>
      <h1>MODULES</h1>
      <ul className="modules-list">
        <li
          style={{
            cursor: "pointer",
            fontWeight: selectedModule === "all" ? "bold" : "normal",
          }}
          onClick={() => setSelectedModule("all")}
        >
          All Modules
        </li>
        {data2.map((mod) => (
          <li
            key={mod.id}
            style={{
              cursor: "pointer",
              fontWeight: selectedModule === mod.module ? "bold" : "normal",
            }}
            onClick={() => setSelectedModule(mod.module)}
          >
            {mod.module}
          </li>
        ))}
      </ul>

      <h2>Competitions</h2>
      <input
        type="text"
        placeholder="Search competitions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ margin: "10px 0" }}>
        <button
          onClick={() => setModeFilter("all")}
          style={{
            fontWeight: modeFilter === "all" ? "bold" : "normal",
            marginRight: "8px",
          }}
        >
          All
        </button>
        <button
          onClick={() => setModeFilter("online")}
          style={{
            fontWeight: modeFilter === "online" ? "bold" : "normal",
            marginRight: "8px",
          }}
        >
          Online
        </button>
        <button
          onClick={() => setModeFilter("offline")}
          style={{
            fontWeight: modeFilter === "offline" ? "bold" : "normal",
          }}
        >
          Offline
        </button>
      </div>
      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((comp) => (
            <li key={comp.id} className="competitions">
              {comp.event_name}, {comp.solo_or_group}, {comp.event_mode},{" "}
              {comp.event_rules}
            </li>
          ))
        ) : (
          <p>No competitions found.</p>
        )}
      </ul>
    </div>
  );
}

export default CompetitionsList;
