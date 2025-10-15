import { useState } from 'react';
import axios from 'axios';
import countryCodes from './countryCodes'; // list of {name, code}

const BASE_URL = 'http://localhost:8000';

function CompleteProfile() {
  const [fullname, setFullname] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // default
  const [phone_number, setPhoneNumber] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [collegename, setCollegeName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    setError('');

    try {
      await axios.post(
        `${BASE_URL}/api/auth/complete-profile/`,
        {
          fullname,
          phone_number: countryCode + phone_number,
          alternate_phone: alternatePhone ? countryCode + alternatePhone : '',
          collegename,
          city,
          state,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = '/profile';
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    }
  };

  return (
    <div className="container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullname}
          onChange={e => setFullname(e.target.value)}
          placeholder="Full Name"
          required
        />

        {/* ✅ Country code dropdown */}
        <label>
          Country Code:
          <select
            value={countryCode}
            onChange={e => setCountryCode(e.target.value)}
            required
          >
            {countryCodes.map(code => (
              <option key={code.code} value={code.code}>
                {code.name} ({code.code})
              </option>
            ))}
          </select>
        </label>

        <input
          type="text"
          value={phone_number}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />

        <input
          type="text"
          value={alternatePhone}
          onChange={e => setAlternatePhone(e.target.value)}
          placeholder="Alternate Phone Number (optional)"
        />

        <input
          type="text"
          value={collegename}
          onChange={e => setCollegeName(e.target.value)}
          placeholder="College Name"
          required
        />

        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
          required
        />

        <input
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="State"
          required
        />

        <button type="submit">Save & Continue</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CompleteProfile;
