// import React, { useState } from "react";

// const CompetitionModal = ({ competition, onClose }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [teamMembers, setTeamMembers] = useState("");

//   const handleRegisterClick = () => {
//     setShowForm(true); // show form only after Register button is clicked
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Example POST request to backend (adjust URL according to your API)
//     fetch(`http://127.0.0.1:8000/api/register/${competition.id}/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         team_name: teamName,
//         members: teamMembers.split(","), // assume comma separated names
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert("Registered successfully!");
//         setShowForm(false);
//         setTeamName("");
//         setTeamMembers("");
//         onClose(); // close modal
//       })
//       .catch((err) => {
//         console.error("Registration error:", err);
//         alert("Failed to register!");
//       });
//   };

//   if (!competition) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-1/2 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
//         >
//           ✖
//         </button>

//         {/* Competition Info */}
//         <h2 className="text-2xl font-bold mb-4">{competition.event_name}</h2>
//         <p className="text-gray-700 mb-2">{competition.description}</p>
//         <p className="text-sm text-gray-500 mb-4">
//           Min Members: {competition.min_members} | Max Members:{" "}
//           {competition.max_members}
//         </p>

//         {/* Show Register button OR Form */}
//         {!showForm ? (
//           <button
//             onClick={handleRegisterClick}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Register
//           </button>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Team Name</label>
//               <input
//                 type="text"
//                 value={teamName}
//                 onChange={(e) => setTeamName(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">
//                 Team Members (comma separated)
//               </label>
//               <input
//                 type="text"
//                 value={teamMembers}
//                 onChange={(e) => setTeamMembers(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Submit Registration
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompetitionModal;
