import React, { useState } from "react"; // 1. Added useState
import clean from "../assets/clean.svg";
import { HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2";
import { PiSparkleBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";

import { TbMathFunction } from "react-icons/tb";
import { auth, provider } from "../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios"
import { ServerUrl } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 2. Track loading state

  const FEATURES = [
    { icon: <HiOutlineMicrophone />, title: "Voice AI", desc: "Natural real-time voice conversations." },
    { icon: <HiOutlineSparkles />, title: "Smart Navigation", desc: "Navigation pages using voice commands." },
    { icon: <HiOutlineCodeBracket />, title: "Easy Embed", desc: "Add assistant using one script tag." },
    { icon: <HiOutlineBolt />, title: "Fast Responses", desc: "Optimized Gemini AI responses" }
  ];

  const handleLogin = async () => {
    if (loading) return; // Prevent double execution if already loading
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const res = await axios.post(ServerUrl + "/api/auth/google", { name: displayName, email }, { withCredentials: true })
     
      navigate("/")
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setLoading(false); // 3. Ensure loading resets if it fails
    }
  }

  return (
    <div className="min-h-screen bg-[#171717] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r to-blue-300/40 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500 bg-gradient-to-r from-blue-200 to-blue-400 text-zinc-700 text-sm font-medium ">
              <PiSparkleBold className="animate-pulse"/>
              AI Voice Assistant Platform
            </div>
            <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-white">
              Build AI Assistants
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-300">
                For Any Website
              </span>
            </h1>
            <p className="mt-8 text-lg text-white leading-8 max-w-2xl">
              Create customizable AI voice assistants that talk, guide users, and integrate into any website instantly.
            </p>
            
            {/* 4. Disabled state and visual indicator added below */}
            <button 
              onClick={handleLogin} 
              disabled={loading}
              className={`mt-10 h-16 px-8 rounded-2xl bg-gradient-to-r from-blue-200 to-blue-400 text-lg font-semibold flex items-center gap-4 shadow-[0_20px_80px_rgba(139,92,246,0.25)] text-zinc-700 transition-all cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
            >
              <FcGoogle className="text-3xl bg-white rounded-full" />
              {loading ? "Connecting..." : "Continue with Google"}
            </button>
            
            <p className="mt-4 text-sm text-blue-400">
              Free plan includes 200 AI responses
            </p>
          </div>

          <div className="relative rounded-[40px] border-black/5 bg-gradient-to-r from-blue-200 to-blue-300 shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mt-2 text-2xl font-bold text-zinc-600"><TbMathFunction className="text-blue-400 inline" />Features</h2>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center shadow-[0_10px_40px_rgba(139,92,246,0.25)] p-3">
                <img src={clean} alt="logo" />
              </div>
            </div>
            <div className="mt-10 space-y-5">
              {FEATURES.map(({ icon, title, desc }, index) =>
                <div key={index} className="flex gap-5 rounded-3xl border-black/5 bg-blue-100 p-5">
                  <div className="min-w-[60px] h-[60px] rounded-2xl bg-gradient-to-r from-blue-300 to-blue-400 text-zinc-600 text-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(139,92,246,0.20)]">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-zinc-600 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">{desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;