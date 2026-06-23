
import React from 'react'
import { useState } from 'react'
import { GoPlus } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-hot-toast';
 
const ServerUrl = import.meta.env.VITE_SERVER_URL;
 
const THEMES = [
  "light",
  "dark",
  "glass",
  "neon"
];
 
const TONES = [
  "Friendly",
  "Professional",
  "Sales"
];
 
function Builder({ user, setUser }) {
  const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete);
  const [pages, setPages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const [assistantName, setAssistantName] = useState(user?.assistantName || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [businessType, setBusinessType] = useState(user?.businessType || "");
  const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "");
  const [theme, setTheme] = useState(user?.theme || 'dark');
  const [tone, setTone] = useState(user?.tone || "Professional");
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "");
  const [loading, setLoading] = useState(false);
 
  const addPage = () => {
    if (!pageName || !pagePath) return;
    const newPage = {
      name: pageName,
      path: pagePath,
      keywords: pageKeywords.split(",").map((k) => k.trim())
    };
    setPages([...pages, newPage]);
    setPageName("");
    setPagePath("");
    setPageKeywords("");
  };
 
  const removePage = (index) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    setPages(updatedPages);
  };
 
  const saveAssistant = async () => {
    setLoading(true);
    try {
      const data = {
        assistantName,
        businessName,
        businessDescription,
        businessType,
        tone,
        theme,
        geminiApiKey,
        pages,
      };
      const res = await axios.post(ServerUrl + "/api/user/save-assistant", data, { withCredentials: true });
      console.log(res.data);
      setUser(res.data);
      setEditAssistant(false);
      toast.success("Assistant Saved Successfully");
    } catch (error) {
      toast.error("Failed to save assistant");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className='min-h-screen bg-[#1a1a1a] bg-gradient-to-r to-blue-300/30 px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
 
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-200">
            Assistant Builder
          </h2>
          <p className='text-zinc-200 mt-1'>Customize your virtual assistant</p>
        </div>
 
        {/* Assistant Ready Banner */}
        {user?.isSetupComplete && !editAssistant && (
          <div className="bg-blue-400 rounded-3xl border border-blue-950 shadow-sm p-6 mb-6">
            <p className='text-sm text-zinc-800'>Assistant</p>
            <h2 className='text-3xl font-bold text-zinc-800 mt-1'>{user.assistantName}</h2>
            <p className='text-zinc-800 mt-3 leading-7'>Your assistant is ready to use on your website</p>
            <button
              onClick={() => setEditAssistant(true)}
              className='mt-4 px-6 py-2 rounded-xl bg-white text-blue-600 font-medium hover:scale-[1.04] transition-all'>
              Edit Assistant
            </button>
          </div>
        )}
 
        {/* Edit Form */}
        {editAssistant && (
          <div className="space-y-6">
 
            {/* Basic Information */}
            <div className="bg-blue-200 bg-gradient-to-r to-blue-500 rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className='text-lg font-semibold mb-5'>Basic Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  onChange={(e) => setAssistantName(e.target.value)}
                  value={assistantName}
                  placeholder='Assistant Name'
                  className='w-full border border-gray-200 rounded-2xl px-4 py-3'
                />
                <input
                  type="text"
                  onChange={(e) => setBusinessName(e.target.value)}
                  value={businessName}
                  placeholder='Business Name'
                  className='w-full border border-gray-200 rounded-2xl px-4 py-3'
                />
                <input
                  type="text"
                  onChange={(e) => setBusinessType(e.target.value)}
                  value={businessType}
                  placeholder='Business Type'
                  className='w-full border border-gray-200 rounded-2xl px-4 py-3'
                />
                <textarea
                  rows={4}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  value={businessDescription}
                  placeholder='Business Description'
                  className='w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none'
                />
              </div>
            </div>
 
            {/* Appearance */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className='text-lg font-semibold mb-5'>Appearance</h2>
              <div>
                <label className='text-sm text-zinc-800 mb-3 block'>Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setTheme(item)}
                      className={`py-3 rounded-2xl border-2 capitalize ${theme === item ? "border-blue-400 bg-blue-300 text-zinc-800" : "border-blue-400"}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className='mt-6'>
                <label className='text-sm text-zinc-800 mb-3 block'>Assistant Tone</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TONES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setTone(item)}
                      className={`py-3 rounded-2xl border-2 capitalize ${tone === item ? "border-blue-400 bg-blue-300 text-zinc-800" : "border-blue-400"}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
 
          </div>
        )}
 
        {/* Gemini API Key */}
        <div className='bg-blue-300 rounded-3xl border border-blue-400 shadow-sm p-6 mt-6'>
          <div className='flex items-center justify-between mb-5 gap-4 flex-wrap'>
            <div>
              <h2 className='text-lg font-semibold'>GEMINI API KEY</h2>
              <p className='text-sm text-zinc-800 mt-1'>
                Add your Gemini API key to power your assistant
              </p>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel='noopener noreferrer'
              className='px-4 py-2 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-zinc-800 text-sm font-medium hover:scale-[1.06] transition-all cursor-pointer'>
              Get API KEY
            </a>
          </div>
          <input
            type="password"
            placeholder='Enter your Gemini API Key...'
            onChange={(e) => setGeminiApiKey(e.target.value)}
            value={geminiApiKey}
            className='w-full border border-blue-500 rounded-2xl px-4 py-3'
          />
          <p className='text-xs text-zinc-800 mt-3 leading-6'>
            Your API key is securely stored and only used for generating AI responses.
          </p>
        </div>
 
        {/* Navigation Pages */}
        <div className='bg-blue-300 rounded-3xl border border-blue-950 shadow-sm p-6 mt-6'>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold">Navigation Pages</h2>
              <p className="text-sm text-zinc-800">
                Assistant can redirect users to these pages
              </p>
            </div>
            <button
              onClick={addPage}
              className='flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-zinc-800 text-sm font-medium hover:scale-[1.06] transition-all cursor-pointer'>
              <GoPlus className='text-xl' /> Add
            </button>
          </div>
 
          {/* Page Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder='Page Name'
              className='border border-zinc-300 rounded-2xl px-4 py-3'
              onChange={(e) => setPageName(e.target.value)}
              value={pageName}
            />
            <input
              type="text"
              placeholder='/pricing'
              className='border border-zinc-300 rounded-2xl px-4 py-3'
              onChange={(e) => setPagePath(e.target.value)}
              value={pagePath}
            />
            <input
              type="text"
              placeholder='Pricing, Plan'
              className='border border-zinc-300 rounded-2xl px-4 py-3'
              onChange={(e) => setPageKeywords(e.target.value)}
              value={pageKeywords}
            />
          </div>
 
          {/* Pages List */}
          <div className="mt-5 space-y-3">
            {pages.map((page, index) => (
              <div
                key={index}
                className='flex items-center justify-between border border-zinc-300 rounded-2xl p-4 bg-white/40'>
                <div>
                  <p className='font-medium font-bold'>{page.name}</p>
                  <p className='text-sm text-zinc-800'>{page.path}</p>
                  <p className='text-sm text-zinc-600'>{page.keywords.join(", ")}</p>
                </div>
                <button
                  onClick={() => removePage(index)}
                  className='text-red-600 hover:text-red-800 transition-colors p-2'>
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </div>
 
        {/* Save Button */}
        <button
          onClick={saveAssistant}
          disabled={loading}
          className='w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-600 text-zinc-700 font-semibold hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed'>
          {loading ? "Saving..." : user?.isSetupComplete ? "Update Assistant" : "Save Assistant"}
        </button>
 
      </div>
    </div>
  );
}
 
export default Builder;