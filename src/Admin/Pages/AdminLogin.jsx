import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../serveices/adminApi";

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await adminLogin(credentials);
      
      // Store token in localStorage
      localStorage.setItem("adminToken", response.token);
      
      // Store admin data if needed
      localStorage.setItem("adminData", JSON.stringify(response.admin));
      
      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-600 via-orange-500 to-yellow-400"></div>

      {/* Additional gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-orange-400 opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-800 to-pink-700 opacity-60"></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Form Container */}
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-white text-2xl font-semibold mb-2">
                Admin Login
              </h1>
              <p className="text-white/80 text-xs">
                Please enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-100 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-black/30" : "bg-black/40 hover:bg-black/50"
                } text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/10 flex justify-center items-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;