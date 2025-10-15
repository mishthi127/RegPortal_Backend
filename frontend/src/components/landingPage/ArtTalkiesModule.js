// import React from "react";
// import dancerImg from "../../assets/dancer1.svg";           
// import borderPattern from "../../assets/background-pattern.svg"; 

// const patternBgUrl = `${process.env.PUBLIC_URL}/pattern-bg.png`;

// const ArtTalkiesModule = () => {
//   return (
//     <section className="relative bg-[#fdf8ef] py-16 px-4 sm:px-8 lg:px-20 text-center overflow-hidden">
//       {/* Subtle Background Pattern (behind content) */}
//       <div
//         className="absolute inset-0 opacity-10 bg-repeat pointer-events-none z-0"
//         style={{
//           backgroundImage: `url(${patternBgUrl})`,
//           backgroundSize: "auto",
//           backgroundPosition: "center",
//         }}
//       />

//       {/* Content wrapper sits above the pattern */}
//       <div className="relative z-10">
//         {/* Heading */}
//         <h2 className="text-[#e25d3f] text-2xl sm:text-3xl font-bold tracking-widest uppercase mb-10">
//           Module 
//         </h2>

//         {/* Responsive grid: 1 / 2 / 4 columns */}
//         {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center */}
//         <div className="flex flex-column h-[320px] w-full overflow-x-auto overflow-y-hidden gap-6 px-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
//   {[1, 2, 3, 4, 5, 6, 7].map((n) => (
//     <article
//   key={n}
//   className="relative bg-black text-white shadow-xl w-[92%] sm:w-[70%] md:w-[230px] flex-shrink-0 transition-transform duration-300 hover:scale-105 snap-center overflow-hidden"
//   aria-label={`Art Talkies card ${n}`}
// >
//   <img
//     src={dancerImg}
//     alt="Art Talkies dancer"
//     className="w-full h-[320px] object-cover border-[6px] border-[#fdf8ef] block transition-opacity duration-300"
//     onError={(e) => {
//       e.currentTarget.style.display = "none";
//     }}
//   />

//   {/* Overlay */}
//   <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center text-white p-4">
//     <h3 className="font-bold text-sm sm:text-base mb-2">ART TALKIES</h3>
//     <ul className="text-xs sm:text-sm space-y-1 mb-3">
//       <li>Comp name</li>
//       <li>Comp name</li>
//       <li>Comp name</li>
//       <li>Comp name</li>
//       <li>Comp name</li>
//     </ul>
//     <button className="bg-red-500 text-white text-xs sm:text-sm px-4 py-2 rounded hover:bg-red-600 transition-colors">
//       Explore
//     </button>
//   </div>
// </article>

//   ))}
// </div>


//         {/* Decorative Border */}
//         <div className="mt-12 w-full">
//           <img
//             src={borderPattern}
//             alt="Decorative Border"
//             className="w-full object-cover"
//             onError={(e) => { e.currentTarget.style.display = "none"; }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArtTalkiesModule;
