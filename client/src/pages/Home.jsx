import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-green-400 text-center">Welkom bij mijn Spotify Clone 🎶</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Stream je favoriete muziek, maak afspeellijsten en geniet van een gepersonaliseerde muziekervaring – helemaal gratis.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Inloggen
        </Link>
        <Link
          to="/register"
          className="bg-green-500 px-6 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          Registreren
        </Link>
      </div>
    </div>
  );
};

export default Home;
