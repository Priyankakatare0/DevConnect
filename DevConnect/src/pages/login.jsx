import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://devconnect-3-10k9.onrender.com/login', {
        username,
        password,
      });

      // Save token to localStorage if needed
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl sm:text-xl font-bold mb-1 text-center text-gray-800">
          Welcome back
        </h2>
        <p className="text-lg sm:text-lg text-gray-500 mb-5 text-center">
          Login to your DevConnect account
        </p>

        <label className="block text-lg mb-1 font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full border rounded px-3 py-2 text-lg mb-4"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block text-lg mb-1 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border rounded px-3 py-2 text-lg mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 text-lg rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center my-3">
          <span className="text-gray-400 text-lg">or</span>
        </div>

        <button
          type="button"
          className="w-full border py-2 rounded flex items-center justify-center gap-2 text-lg"
        >
          <img
            src="https://img.icons8.com/color/16/google-logo.png"
            alt="Google"
          />
          Sign in with Google
        </button>

        <p className="text-center text-lg mt-4 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
