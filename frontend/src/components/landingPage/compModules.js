import { forwardRef, useEffect, useState } from "react";
import Modules from "./modules"; // your module card component
import { motion } from "framer-motion";
import addformbg from "../../assets/background-pattern.svg";
import addbottom1 from "../../assets/bottomcompborder.svg";
import pentagonborder from "../../assets/pentagonborder.svg";
import Modulename from "../../assets/modulename.svg";
import middle_line from "../../assets/Middle_line.svg";

export const CompModules = forwardRef((props, ref) => {
  const [modulesFromBackend, setModulesFromBackend] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="no-scrollbar" ref={ref}>
      <div className="lg:flex hidden flex-row items-center justify-around w-[100%]  mb-[170px] mt-[140px]">
        <div className="text-center">
          <p className="font-sans font-extrabolt text-[48px]">140k+</p>
          <p className="font-sans font-normal text-[24px]">Footfall</p>
        </div>
        <div className="text-center">
          <p className="font-sans font-extrabolt text-[48px]">100+</p>
          <p className="font-sans font-normal text-[24px]">Events</p>
        </div>
        <div className="text-center">
          <p className="font-sans font-extrabolt text-[48px]">3000k+</p>
          <p className="font-sans font-normal text-[24px]">Participants</p>
        </div>
        <div className="text-center">
          <p className="font-sans font-extrabolt text-[48px]">500+</p>
          <p className="font-sans font-normal text-[24px]">College</p>
        </div>
        <div className="text-center">
          <p className="font-sans font-extrabolt text-[48px]">45+</p>
          <p className="font-sans font-normal text-[24px]">Competitions</p>
        </div>
      </div>
      <div className="flex lg:hidden lg:flex-row flex-col items-center justify-around w-[100%]  mb-[170px] mt-[140px]">
        <div className="flex flex-row gap-[50px] mb-[50px]">
          <div className="text-center">
            <p className="font-sans font-extrabolt text-[24px] lg:text-[48px]">140k+</p>
            <p className="font-sans font-normal text-[12px] lg:text-[24px]">Footfall</p>
          </div>
          <div className="text-center">
            <p className="font-sans font-extrabolt text-[24px] lg:text-[48px]">100+</p>
            <p className="font-sans font-normal text-[12px] lg:text-[24px]">Events</p>
          </div>
        </div>
        <div className="flex flex-row gap-[50px] mb-[50px]">
          <div className="text-center">
            <p className="font-sans font-extrabolt text-[24px] lg:text-[48px]">3000k+</p>
            <p className="font-sans font-normal text-[12px] lg:text-[24px]">Participants</p>
          </div>
          <div className="text-center">
            <p className="font-sans font-extrabolt text-[24px] lg:text-[48px]">500+</p>
            <p className="font-sans font-normal text-[12px] lg:text-[24px]">College</p>
          </div>
        </div>
        <div className="text-center">
          <p className="font-sans font-extrabolt text-[24px] lg:text-[48px]">45+</p>
          <p className="font-sans font-normal text-[12px] lg:text-[24px]">Competitions</p>
        </div>
      </div>
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

      <img src={addbottom1} alt="Decorative Footer Border" className="w-full" />
      <div className="bg-alch-dark">
        <img src={middle_line} alt="Decorative Footer Border" className="w-full bg-alch-dark" />
        <div className="w-full mx-auto flex items-center justify-center bg-black">
          <img src={pentagonborder} className="w-[97.8%] h-full" alt="pentagon" />
        </div>
      </div>
    </div>
  );
})

