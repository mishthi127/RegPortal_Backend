// import React, { useState } from "react";

// const CompetitionRegistration = ({ competition }) => {
//   const [teamName, setTeamName] = useState("");
//   const [teamMembers, setTeamMembers] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/api/register/${competition.id}/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // attach token if required
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//           body: JSON.stringify({
//             team_name: teamName,
//             members: teamMembers.split(",").map((m) => m.trim()),
//           }),
//         }
//       );

//       // Safely read response
//       let data = null;
//       const text = await res.text();
//       if (text) {
//         data = JSON.parse(text);
//       }

//       if (!res.ok) {
//         throw new Error(
//           (data && (data.detail || data.message)) ||
//             `Error ${res.status}: ${res.statusText}`
//         );
//       }

//       alert("✅ Registered successfully!");
//       setTeamName("");
//       setTeamMembers("");
//     } catch (err) {
//       console.error("❌ Registration error:", err);
//       alert(`Failed to register: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-4">
//           Register for {competition?.event_name || "Competition"}
//         </h2>
//         <p className="text-gray-600 mb-6">
//           {competition?.description ||
//             "Fill in your team details below to register."}
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Team Name</label>
//             <input
//               type="text"
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">
//               Team Members (comma separated)
//             </label>
//             <input
//               type="text"
//               value={teamMembers}
//               onChange={(e) => setTeamMembers(e.target.value)}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Submitting..." : "Submit Registration"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompetitionRegistration;
