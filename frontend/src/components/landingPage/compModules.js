import { useEffect, useState } from "react";
import Modules from "./modules"; // your module card component
import { motion } from "framer-motion";
import addformbg from "../../assets/backflowers.svg";
import addbottom1 from "../../assets/bottomcompborder.svg";
import pentagonborder from "../../assets/pentagonborder.svg";
import Modulename from "../../assets/modulename.svg";

export function CompModules() {
  const [modulesFromBackend, setModulesFromBackend] = useState([]);
  const [loading, setLoading] = useState(true);

  const formBgStyle = {
    backgroundImage: `url(${addformbg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#EEECD9",
  };
  const formbottom = {
    backgroundImage: `url(${addbottom1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#EEECD9",
  };
  const formbottompentagon = {
    backgroundImage: `url(${pentagonborder})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000",
  };

  // Fetch modules from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/competitions/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        const mods = Array.isArray(json.modules) ? json.modules : [];
        setModulesFromBackend(mods);
      })
      .catch((err) => {
        console.error("Failed to fetch modules:", err);
        setModulesFromBackend([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Framer Motion variants for stagger animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const moduleVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div style={formBgStyle} className="no-scrollbar" >
      <div className="flex justify-center items-center no-scrollbar" >
        <img src={Modulename} alt="modulename" />
      </div>

      {/* Horizontal container without GSAP animation */}
      <div
        className="flex gap-4 py-4 overflow-x-auto overflow-y-hidden  no-scrollbar"
        style={{ padding: "1rem", cursor: "grab" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <p>Loading modules...</p>
        ) : modulesFromBackend.length === 0 ? (
          <p>No modules available.</p>
        ) : (
          modulesFromBackend.map((m) => (
            <motion.div key={m.id ?? m.module} variants={moduleVariants}>
              <Modules module={m} />
            </motion.div>
          ))
        )}
      </div>

      <div className="h-12 w-full" style={formbottom}></div>
      <div style={formbottompentagon} className="h-10 w-full bg-black"></div>
    </div>
  );
}

export default CompModules;
