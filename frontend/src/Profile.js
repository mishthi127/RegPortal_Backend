import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You are not logged in.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setMessage('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  if (message) return <p>{message}</p>;

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <h2>Your Profile</h2>
      <p>Email: {profile.email}</p>
      {/* Replace with fields your API provides */}
    </>
  );
}

export default Profile;
