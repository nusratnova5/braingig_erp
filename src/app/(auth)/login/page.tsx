"use client";

import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save user info in localStorage
        localStorage.setItem("erpUser", JSON.stringify(data.user));

        // ✅ Optional: show welcome message
        alert(`Welcome ${data.user.name}`);

        // ✅ Redirect to dashboard
        window.location.href = "/";
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">ERP System</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaUserAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-orange-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-orange-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
