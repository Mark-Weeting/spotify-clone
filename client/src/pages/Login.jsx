import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token); // of gebruik context
      navigate('/dashboard'); // nog aan te maken
    } catch (err) {
      setError('Inloggen mislukt. Controleer je gegevens.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Inloggen</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1">Wachtwoord</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded">
          Inloggen
        </button>
      </form>
    </div>
  );
};

export default Login;
