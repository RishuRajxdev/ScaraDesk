import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clean from "../src/assets/clean.svg";        // Sahi rasta (src ke andar assets)
import { signOut } from "firebase/auth";
import { auth } from "../src/utils/firebase.js";    // Sahi rasta (src ke andar utils)
import axios from "axios";
import { ServerUrl } from "../src/App.jsx";         // Sahi rasta (src ke andar App.jsx)
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      // 1. Sign out from Firebase Auth
      await signOut(auth);

      // 2. Clear backend sessions/cookies
      await axios.post(`${ServerUrl}/api/auth/logout`, {}, { withCredentials: true });

      // 3. Reset the state in your React context
      if (setUser) setUser(null);

      // 4. Send user back to the login screen
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-blue-950/95 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <img
            src={clean}
            alt="favicon"
            className="h-9 w-auto bg-zinc-300 rounded-full object-contain"
          />
          <h1 className="font-bold text-xl text-zinc-300">
            ScaraDesk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse">
              AI
            </span>
          </h1>
        </div>

        {/* Nav Buttons */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/builder")}
              className="px-4 py-2 rounded-xl bg-[#1e293b]/60 border border-blue-500/20 text-blue-400 text-sm font-medium shadow-sm hover:bg-[#1e293b]/90 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Builder
            </button>
            <button
              onClick={() => navigate("/billing")}
              className="px-4 py-2 rounded-xl bg-[#1e293b]/60 border border-blue-500/20 text-blue-400 text-sm font-medium shadow-sm hover:bg-[#1e293b]/90 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Billing
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-[#1e293b]/40 border border-gray-800 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                <span className="text-white text-sm font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="max-w-[140px]">
                <p className="text-sm font-semibold text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>

            {/* Integrated Logout Button next to Profile Card */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Logout"
              className={`p-2.5 rounded-xl border border-gray-800 bg-[#1e293b]/40 text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all cursor-pointer flex items-center justify-center ${
                isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <HiArrowLeftOnRectangle className={`text-lg ${isLoggingOut ? "animate-spin" : ""}`} />
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;