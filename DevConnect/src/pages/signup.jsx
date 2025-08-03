import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/register', {
        username,
        email,
        password,
      });
      console.log(res.data);
      
      // Save token to localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-center text-gray-800">
          Create an account
        </h2>
       

        <label
          htmlFor="username"
          className="block text-lg md:text-base font-medium mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="username"
          className="w-full border rounded-md px-4 py-2 mb-4 text-lg md:text-base"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label
          htmlFor="email"
          className="block text-lg md:text-base font-medium mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border rounded-md px-4 py-2 mb-4 text-lg md:text-base"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label
          htmlFor="password"
          className="block text-lg md:text-base font-medium mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border rounded-md px-4 py-2 mb-2 text-lg md:text-base"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <ul className="text-xs md:text-lg text-gray-500 mb-4 list-disc pl-5">
          <li>Must be at least 8 characters</li>
          <li>Must include at least one special symbol</li>
        </ul>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg md:text-base font-medium hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <div className="text-center my-2">
          <span className="text-gray-400 text-lg">or</span>
        </div>

        <button
          type="button"
          className="w-full border py-2 rounded-md flex items-center justify-center gap-2 text-lg md:text-base"
        >
          <img
            src="https://img.icons8.com/color/16/google-logo.png"
            alt="Google"
          />
          Sign Up with Google
        </button>

        <p className="text-center text-lg mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
