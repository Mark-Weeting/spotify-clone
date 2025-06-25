import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-800">
      <Link
        to="/"
        className="text-xl font-bold text-green-400 hover:text-green-500 transition"
      >
        Spotify Clone
      </Link>

      <div className="space-x-6 flex items-center">
        <Link
          to="/login"
          className={`text-sm font-semibold transition ${
            isActive('/login')
              ? 'text-green-400'
              : 'text-gray-400 hover:text-green-400'
          }`}
        >
          Inloggen
        </Link>
        <Link
          to="/register"
          className={`text-sm font-semibold transition ${
            isActive('/register')
              ? 'text-green-400'
              : 'text-gray-400 hover:text-green-400'
          }`}
        >
          Registreren
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
