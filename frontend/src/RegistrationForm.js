import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import countryCodes from './countryCodes';

const BASE_URL = 'http://localhost:8000';

function RegistrationForm() {
  const [profile, setProfile] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    alternate_phone: '',
    country_code: '+91',
  });

  const [team, setTeam] = useState({
    collegename: '',
    city: '',
    state: '',
  });

  const [step, setStep] = useState(1); // 1 - Profile, 2 - Team, 3 - OTP
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Collect profile form inputs
  const handleProfileChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  // Collect team form inputs
  const handleTeamChange = e => setTeam({ ...team, [e.target.name]: e.target.value });

  // Submit profile step
  const handleProfileSubmit = e => {
    e.preventDefault();
    setError('');

    if (profile.password !== profile.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    if (!profile.fullname || !profile.email || !profile.username || !profile.password) {
      setError('All profile fields are required.');
      return;
    }
    setStep(2);
  };

  // Submit team info and register
  const handleTeamSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!team.collegename || !team.city || !team.state) {
      setError('All team fields are required.');
      return;
    }

    let requestData = {
      ...profile,
      phone_number: profile.country_code + profile.phone_number,
      alternate_phone: profile.alternate_phone ? (profile.country_code + profile.alternate_phone) : '',
      collegename: team.collegename,
      city: team.city,
      state: team.state,
    };

    try {
      await axios.post(`${BASE_URL}/register/`, requestData);
      setStep(3);
      setSuccess('OTP sent to your email. Please verify.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Try again.');
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${BASE_URL}/verify-otp/`, {
        email: profile.email,
        otp,
      });
      setSuccess('Registration complete!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'OTP verification failed.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {step === 1 && (
        <form className="form-block" onSubmit={handleProfileSubmit}>
          <label>Full Name*</label>
          <input name="fullname" value={profile.fullname} onChange={handleProfileChange} required />
          <label>Email*</label>
          <input type="email" name="email" value={profile.email} onChange={handleProfileChange} required />
          <label>Username*</label>
          <input name="username" value={profile.username} onChange={handleProfileChange} required />

          <label>Country Code*</label>
          <select name="country_code" value={profile.country_code} onChange={handleProfileChange}>
            {countryCodes.map(c => (
              <option value={c.code} key={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
          <label>Phone Number*</label>
          <input name="phone_number" value={profile.phone_number} onChange={handleProfileChange} required />
          <label>Alternate Phone</label>
          <input name="alternate_phone" value={profile.alternate_phone} onChange={handleProfileChange} />

          <label>Password*</label>
          <input type="password" name="password" value={profile.password} onChange={handleProfileChange} required />
          <label>Confirm Password*</label>
          <input type="password" name="confirm_password" value={profile.confirm_password} onChange={handleProfileChange} required />

          {error && <div className="error">{error}</div>}
          <button type="submit">Next: Team Info</button>
        </form>
      )}
      {step === 2 && (
        <form className="form-block" onSubmit={handleTeamSubmit}>
          <label>College Name*</label>
          <input name="collegename" value={team.collegename} onChange={handleTeamChange} required />
          <label>City*</label>
          <input name="city" value={team.city} onChange={handleTeamChange} required />
          <label>State*</label>
          <input name="state" value={team.state} onChange={handleTeamChange} required />
          {error && <div className="error">{error}</div>}
          <button type="submit">Register & Send OTP</button>
        </form>
      )}
      {step === 3 && (
        <form className="form-block" onSubmit={handleOtpSubmit}>
          <label>Enter OTP sent to your email*</label>
          <input name="otp" value={otp} onChange={e => setOtp(e.target.value)} required />
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {step === 3 && success === 'Registration complete!' && (
        <div className="success">
          <h3>Registration Successful!</h3>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
