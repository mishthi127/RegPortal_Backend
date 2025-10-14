// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMail, FiChevronDown } from "react-icons/fi";

// Import all necessary components and assets
import { ReactComponent as AuthFrame } from "../assets/auth-frame.svg";
import { ReactComponent as TabBarDeco } from "../assets/nav-item-deco.svg";
import DecoratedInput from "../components/AuthPage/DecoratedInput.js";
import DecoratedButton from "../components/AuthPage/DecoratedButton.js";
import authorPlaceholder from "../assets/author-placeholder.png";
import backgroundPattern from "../assets/background-pattern.svg";

const BASE_URL = "http://localhost:8000";

const ProfilePage = () => {
  const navigate = useNavigate();
  // State for displaying saved profile data
  const [profileData, setProfileData] = useState(null);
  // State for handling form input during editing
  const [formData, setFormData] = useState(null);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setError("You are not logged in. Redirecting...");
      setIsLoading(false);
      setTimeout(() => navigate("/signin"), 2000);
      return;
    }
    axios
      .get(`${BASE_URL}/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const dataFromApi = {
          ...res.data,
          profilePic: authorPlaceholder, // Keep placeholder for now
          // Ensure phone numbers are empty strings if null
          phone_number: res.data.phone_number || "",
          alternate_phone: res.data.alternate_phone || "",
        };
        setProfileData(dataFromApi);
        setFormData(dataFromApi); // Initialize form data
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(
          "Profile load failed:",
          err.response ? err.response.data : err.message
        );
        setError("Failed to load profile. Please log in again.");
        setIsLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/signin";
  };

  const handleChange = (e) => {
    // Update the temporary formData state, not the main profileData
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaveSuccess(false);
    setError("");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setError("");
    setSaveSuccess(false);
  };
  
  // ADDED: Cancel button functionality
  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(profileData); // Revert any changes
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setError("");
    const token = localStorage.getItem("access");

    // Construct the data to send from the formData state
    const dataToSend = {
      fullname: formData.fullname,
      gender: formData.gender,
      collegename: formData.collegename,
      city: formData.city,
      state: formData.state,
      phone_number: String(formData.phone_number || "").trim(),
      alternate_phone: String(formData.alternate_phone || "").trim(),
    };

    try {
      const response = await axios.patch(
        `${BASE_URL}/auth/edit-profile/`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const updatedUser = { ...profileData, ...response.data.user };
      
      // Update both states with the saved data from the backend
      setProfileData(updatedUser);
      setFormData(updatedUser);

      setSaveSuccess(true);
      setIsEditing(false); // Switch back to VIEW mode
      setTimeout(() => setSaveSuccess(false), 3000);

    } catch (err) {
      const responseError = err.response?.data;
      let errorMessage = "Failed to save profile. Check your input.";
      if (responseError) {
        errorMessage = Object.keys(responseError)
          .map(key => `${key}: ${responseError[key]}`)
          .join(" ");
      }
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = ["Profile", "My registration", "Team members"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }
  
  // Use formData for the form values, as it can be null before the API call finishes
  if (!formData || !profileData) return null; 

  return (
    <div
      style={{ backgroundImage: `url(${backgroundPattern})` }}
      className="min-h-screen bg-brand-dark p-4 sm:p-8"
    >
      <main className="w-full max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{`Welcome, ${profileData.fullname}`}</h1>
            <p className="text-gray-400">{`Alcher ID #${profileData.alcherid}`}</p>
          </div>
          <DecoratedButton size="sm" onClick={handleLogout}>
            Logout
          </DecoratedButton>
        </div>

        <div className="relative w-full max-w-[1032px] mx-auto h-16 sm:h-20 mb-12 sm:mb-20">
          <TabBarDeco
            className="absolute inset-0 w-full h-full text-brand-dark"
            preserveAspectRatio="none"
          />
          <div className="relative z-10 flex justify-around items-center h-full pb-7">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] sm:text-sm font-bold transition-colors duration-300 text-center px-1 ${
                  activeTab === tab
                    ? "text-brand-black"
                    : "text-brand-gray hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[1032px] mx-auto mt-[-2.5rem] pb-10">
          <AuthFrame
            className="absolute inset-0 w-full h-full text-brand-beige z-0"
            preserveAspectRatio="none"
          />
          <div className="relative z-10 p-6 sm:p-10">
            {activeTab === "Profile" && (
              <div>
                <div className="flex items-center gap-x-4">
                  <img
                    src={profileData.profilePic}
                    alt="Profile"
                    className="w-16 h-16 flex"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold">{profileData.fullname}</h3>
                    <p className="text-gray-500 text-sm">{profileData.email}</p>
                  </div>
                </div>
                <hr className="my-6 border-gray-300" />

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                >
                  <DecoratedInput id="fullname" name="fullname" label="Full Name" value={formData.fullname} onChange={handleChange} disabled={!isEditing} />
                  <DecoratedInput id="phone_number" name="phone_number" label="Phone Number*" value={formData.phone_number} onChange={handleChange} disabled={!isEditing} />

                  <div>
                    <label htmlFor="gender" className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                    <div className="relative h-8 group">
                      <DecoratedInput id="gender-base" label="" disabled={!isEditing} />
                      <select name="gender" id="gender" value={formData.gender || "M"} onChange={handleChange} disabled={!isEditing} className={`absolute inset-0 z-20 appearance-none w-full h-full bg-transparent border-none focus:outline-none px-3 text-sm ${!isEditing ? "text-gray-500 cursor-default" : "text-gray-800"}`}>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                        <option value="O">Other</option>
                      </select>
                      <FiChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
                    </div>
                  </div>

                  <DecoratedInput id="alternate_phone" name="alternate_phone" label="Alternate Phone Number" value={formData.alternate_phone} placeholder="Optional" onChange={handleChange} disabled={!isEditing} />
                  <DecoratedInput id="team_name" name="team_name" label="Team Name" value={profileData.team_name || "No Team Assigned"} readOnly className="text-gray-500 bg-gray-100 cursor-not-allowed" />
                  <DecoratedInput id="collegename" name="collegename" label="College" value={formData.collegename} onChange={handleChange} disabled={!isEditing} />
                  <DecoratedInput id="city" name="city" label="City" value={formData.city} onChange={handleChange} disabled={!isEditing} />
                  <DecoratedInput id="state" name="state" label="State" value={formData.state} onChange={handleChange} disabled={!isEditing} />
                  
                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-end items-center gap-4 mt-4">
                    <div className="flex-grow text-left">
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      {saveSuccess && <p className="text-sm text-green-500">Profile Saved Successfully!</p>}
                    </div>
                    {isEditing ? (
                      <>
                        <button type="button" onClick={handleCancelClick} className="text-sm font-semibold text-gray-600 hover:text-black px-4 py-2">
                          Cancel
                        </button>
                        <DecoratedButton type="submit" size="md" disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save Changes"}
                        </DecoratedButton>
                      </>
                    ) : (
                      <DecoratedButton type="button" size="md" onClick={handleEditClick}>
                        Edit Profile
                      </DecoratedButton>
                    )}
                  </div>
                </form>

                <div className="flex items-center gap-x-3 mt-8 border-t border-gray-300 pt-10">
                  <FiMail className="w-8 h-8 text-brand-red flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Email Address</p>
                    <p className="text-sm text-gray-600">{profileData.email}</p>
                    <p className="text-xs text-gray-400">{`Joined ${profileData.registered_on}`}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "My registration" && <div className="text-center p-8">My Registration Content Goes Here</div>}
            {activeTab === "Team members" && <div className="text-center p-8">Team Members Content Goes Here</div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;