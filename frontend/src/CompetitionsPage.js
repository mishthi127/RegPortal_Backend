import { useEffect, useState } from "react";
import './CompetitionPage.css';

function CompetitionsList() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedModule, setSelectedModule] = useState("all"); // store clicked module

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

  // Filter competitions based on selected module
  const filteredData = selectedModule === "all"
    ? data
    : data.filter((comp) => { if (comp.module === null) return null;
       else if (comp.module.module === selectedModule) return comp;
    });

  return (
    <div >
      <h1>MODULES</h1>
      <ul className="modules-list">
        <li
          style={{ cursor: "pointer", fontWeight: selectedModule === "all" ? "bold" : "normal" }}
          onClick={() => setSelectedModule("all")}
        >
          All Modules
        </li>
        {data2.map((mod) => (
          <li
            key={mod.id}
            style={{ cursor: "pointer", fontWeight: selectedModule === mod.module ? "bold" : "normal" }}
            onClick={() => setSelectedModule(mod.module)}
          >
            {mod.module}
          </li>
        ))}
      </ul>

      <h2>Competitions</h2>
      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((comp) => (
            <li key={comp.id} className="competitions">
              {comp.event_name} , {comp.solo_or_group}, {comp.event_mode}, {comp.event_rules}
            </li>
          ))
        ) : (
          <p>No competitions found for this module.</p>
        )}
      </ul>
    </div>
  );
}

export default CompetitionsList;
