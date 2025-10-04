import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { id } = useParams(); // competition id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: "",
    teamVideo: "",
    college: "",
  });

  const [teamMembers, setTeamMembers] = useState([""]); // start with 1 empty input

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberChange = (index, value) => {
    const updated = [...teamMembers];
    updated[index] = value;
    setTeamMembers(updated);
  };

  const addMember = () => {
    setTeamMembers([...teamMembers, ""]);
  };

  const removeMember = (index) => {
    const updated = [...teamMembers];
    updated.splice(index, 1);
    setTeamMembers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = { ...formData, teamMembers, competitionId: id };
    console.log("Form submitted:", finalData);

    // TODO: send finalData to backend API using fetch/axios

    // Redirect to ProfilePage with data
    navigate("/profile", { state: finalData });
  };

  return (
    <div className="register-page p-6">
      <h2 className="text-2xl font-bold mb-4">
        Register for Competition #{id}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 max-w-2xl bg-white p-6 rounded shadow"
      >
        {/* Team Name */}
        <div className="col-span-1">
          <label className="block font-medium mb-1">Team Name</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Team Video */}
        <div className="col-span-1">
          <label className="block font-medium mb-1">Team Video (URL)</label>
          <input
            type="url"
            name="teamVideo"
            value={formData.teamVideo}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* College */}
        <div className="col-span-1">
          <label className="block font-medium mb-1">College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Team Members */}
        <div className="col-span-2">
          <label className="block font-medium mb-2">Team Members</label>

          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="w-full border rounded p-2"
                placeholder={`Member ${index + 1} Name`}
                required
              />
              {teamMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  –
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            + Add Member
          </button>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
