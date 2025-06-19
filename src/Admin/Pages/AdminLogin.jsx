import React, { useState } from "react";

function AdminLogin() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-600 via-orange-500 to-yellow-400"></div>

      {/* Additional gradient overlays for more complexity */}
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
                Login to Account
              </h1>
              <p className="text-white/80 text-xs">
                Please enter your email and password to continue
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="enter-email"
                />
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="password"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white/30 focus:ring-2"
                />
                <label htmlFor="terms" className="text-white/90 text-sm">
                  Remember Password
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="button"
                className="w-full bg-black/40 hover:bg-black/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                Sign In
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-white/80 text-sm">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
