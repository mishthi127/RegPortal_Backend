import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${BASE_URL}/login/`, { email, password });
      setLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="registration-container">
      <h2>Login</h2>
      {loggedIn ?
        <div className="success">Login successful!</div>
        : (
          <form className="form-block" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
          </form>
        )
      }
    </div>
  );
}

export default LoginForm;
