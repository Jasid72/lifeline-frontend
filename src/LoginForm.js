import React, { useState } from 'react';
import bgImage from "./bg.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login/`,
        {username:email, password: password}
      );
      if (response.status >= 200 && response.status < 300) {
        // Success message on successful response 
        navigate('/dashboard');
      } else {
        // Handling non-200 responses (e.g., 400, 500)
        alert("Error occurred during the update.");
      }
    } catch (error) {
      // Handling network errors or other exceptions
      console.error("Error during the POST request:", error);
      alert("Error occurred during the POST request.");
    }
  };

  return (
    <div className="bg-cover"
    style={{ backgroundImage: `url(${bgImage})` }}
    >
    <div className="h-screen flex items-center justify-center">
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-md mx-auto">

      <h1 className="text-3xl font-bold mb-4 text-red-600">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <div className="mb-4 text-center">
          <a href="#" className="text-red-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;