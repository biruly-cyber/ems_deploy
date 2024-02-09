import axios from "axios";
import React, { useState } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
  
      // LOGIN
      const response = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
  
      const { data } = response;
      const { success, message } = data;
  
      if (success) {
        alert(message);
        // Navigate to the dashboard
        navigate("../dashboard");
      } else {
        // Handle unsuccessful login
        alert(message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
  
      // Handle specific error cases if needed
      if (error.response) {
        // The request was made, but the server responded with a status code outside the 2xx range
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
  
      // Handle general error or show a user-friendly message
      alert("An error occurred during login. Please try again.");
    }
  };
  
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-4 bg-slate-900 p-4 flex items-center">
        <div className="mx-auto">
          <span className=" text-8xl font-bold text-white">
            Blurock <br />
          </span>
          <span className="text-slate-200">The Wealth Management</span>
        </div>
      </div>
      <div className="col-span-8 bg-slate-50 p-4 flex items-center justify-center">
        {/* log in form  */}

        <form
          className="bg-white p-8 rounded shadow-lg w-96 mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
