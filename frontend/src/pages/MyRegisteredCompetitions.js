import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Assets ---
import BackgroundPattern from "../assets/background-pattern.svg";
import BelowNavbar from "../assets/below-navbar.svg";
import WhiteBack from "../assets/white-back.svg";
import OrangeLine from "../assets/orange -line.svg";

function MyRegistrations() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registeredCompetitions")) || [];
    setCompetitions(stored);
        setLoading(false);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full text-white flex flex-col items-center"
      style={{
        backgroundColor: "#000",
        backgroundImage: `url(${BackgroundPattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER */}
      <div className="w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mx-auto mt-8 px-4 md:px-8 flex flex-col items-center">
        <div className="w-full text-left mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Welcome, Lorem Ipsum</h1>
          <p className="text-gray-400 text-sm">Alcher ID #23098756</p>
        </div>
        <div className="w-full relative bg-[#FFF8E7] text-black rounded-t-lg overflow-hidden shadow-md">
          <div className="flex justify-between items-center text-center">
            <div
              className="flex-1 py-2 text-gray-600 hover:text-black transition cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </div>
            <div className="flex-1 py-2 text-black font-semibold relative">
              My registrations
              <img
                src={OrangeLine}
                alt="Orange underline"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 sm:w-1/2 md:max-w-full h-1"
              />
            </div>
            <div
              className="flex-1 py-2 text-gray-600 hover:text-black transition cursor-pointer"
              onClick={() => navigate("/members")}
            >
              Team Members
            </div>
          </div>
        </div>
      </div>

      {/* BELOW NAVBAR */}
      <div className="w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mx-auto">
        <img src={BelowNavbar} alt="Below Navbar" className="w-full object-cover -mt-[1px]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mx-auto mt-6 md:mt-10 px-4 md:px-8 flex flex-col items-center">
        {/* Cream Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img src={WhiteBack} alt="Cream Background" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-full">
        {loading ? (
            <div className="text-black py-10 font-semibold text-center">
              Loading competitions...
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 py-10">
            {competitions.length > 0 ? (
                competitions.map((comp, index) => (
                <div
                    key={index}
                  className="flex flex-col items-center text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative w-full">
                    <img
                        src={comp.image || "http://localhost:8000/media/image_uploads/event_pics/event_default.png"}
                        alt={comp.name || "Competition"}
                      className="w-full md:w-[90%] lg:w-[95%] h-auto object-contain mx-auto rounded-xl"
                    />
                  </div>

                  <p className="mt-3 text-black font-semibold text-sm sm:text-base md:text-lg">
                      {comp.name}
                  </p>

                  <p className="text-gray-700 text-xs sm:text-sm md:text-base mt-2">
                      {comp.description || "No description provided."}
                  </p>

                    {/* <p className="text-gray-500 text-xs mt-1">
                      Registered on: {new Date(comp.registered_at).toLocaleString()}
                    </p> */}
                </div>
              ))
            ) : (
                <p className="text-black text-center w-full">No registered competitions yet.</p>
            )}
          </div>
        )}

        {/* EXPLORE MORE */}
        <div className="relative flex flex-col items-center justify-center mt-8 mb-12 sm:mb-16 w-full">
          <div
            className="relative flex items-center justify-center cursor-pointer w-full max-w-xs mx-auto"
            onClick={() => navigate("/competitions")}
          >
            <img src={OrangeLine} alt="Orange underline" className="w-full" />
            <span className="absolute text-black font-semibold text-sm sm:text-base md:text-lg">
              Explore More Competitions
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRegistrations;
