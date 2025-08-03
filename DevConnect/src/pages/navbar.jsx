import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-600">DevConnect</h2>
      
      <div className="flex gap-6 text-xl font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/login" className="hover:text-blue-600">Login</Link>
        <Link to="/register" className="hover:text-blue-600">Register</Link>
        <Link to="/profile" className="hover:text-blue-600">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
