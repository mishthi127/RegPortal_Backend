//import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Welcome to the Homepage!</h1>
      <p>This is a demo homepage.</p>
      {/* Login Button */}
      <button
        style={{
          padding: "0.7rem 2rem",
          fontSize: "1.05rem",
          background: "#3265e4",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "1.5rem"
        }}
        onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
}

export default HomePage;
