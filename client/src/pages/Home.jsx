import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AssistantPreview from '../../components/AssistantPreview';

const STEPS = [
  {
    step: "01",
    title: "sign up free",
    desc: "Continue with Google and create your assistant instantly."
  },
  {
    step: "02",
    title: "Customize assistant",
    desc: "Set your business name, tone, voice and theme"
  },
  {
    step: "03",
    title: "Train your assistant",
    desc: "Add business details and personalize responses."
  },
  {
    step: "04",
    title: "Embed anywhere",
    desc: "Copy one script tag and add it to your website."
  },
];

function Home({ user }) {
  const navigate = useNavigate(); 

  return (
    <div className="bg-[#000000] min-h-screen text-white flex flex-col justify-between">
      
      {/* Duplicate header completely removed from here */}

      <section className='relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20'>
        {/* Background Gradients/Glows */}
        <div className="absolute inset-0 bg-gradient-to-r to-blue-300/40 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] to-blue-300/40 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] to-blue-300/40 blur-[120px] rounded-full pointer-events-none" />
        
        <div className='relative max-w-6xl mx-auto'>
          {/* Top Badge */}
          <div className='flex justify-center'>
            <span className='inline-flex items-center gap-2 bg-[#1e293b]/60 border border-blue-500/20 shadow-sm text-blue-400 text-xs sm:text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm'>
              <span className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'/>
              Voice AI for modern websites
            </span>
          </div>

          {/* Hero Header Section */}
          <div className='text-center mt-10 sm:mt-12'>
            <h1 className='max-w-5xl mx-auto text-[42px] leading-[52px] sm:text-6xl sm:leading-[72px] lg:text-7xl lg:leading-[88px] font-black tracking-[-0.02em] text-zinc-300'>
              Add a{" "}
              <span className="inline-block px-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">
                  Virtual Assistant
                </span>
              </span>
              <br className="hidden sm:block" />
              to your Website
            </h1>

            <p className='max-w-2xl mx-auto mt-7 text-sm sm:text-lg lg:text-xl text-zinc-300 leading-relaxed px-2'>
              Create customizable AI voice assistants that talk, guide users, 
              and integrate into any website instantly.
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
              <button 
                onClick={() => navigate("/builder")} 
                className='w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-600 text-zinc-700 font-semibold text-sm sm:text-base shadow-[0_12px_40px_rgba(59,130,246,0.25)] hover:scale-[1.02] transition-all cursor-pointer'
              >
                Build Your Assistant
              </button>
            </div>

            <p className='mt-5 text-xs sm:text-sm text-white'>
              Free plan includes 200 AI responses
            </p>
          </div>
          <AssistantPreview/>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className='px-4 sm:px-6 lg:px-8 py-20 bg-blue-300/10 border-t border-zinc-900'>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className='text-3xl sm:text-4xl font-bold text-white'>
              Get started in minutes
            </h2>
            <p className='text-zinc-500 mt-3 text-sm sm:text-base'>
              Simple setup. No complicated integration.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className='group hover:bg-blue-300/10 border border-zinc-800 rounded-[28px] p-7 transition-all hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)] bg-zinc-900/20'>
                <span className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>{s.step}</span> 
                <h3 className='mt-5 text-lg font-semibold text-zinc-300'>{s.title}</h3>
                <p className='mt-3 text-sm text-zinc-400 leading-relaxed'>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-zinc-950/80 border-t border-zinc-900 px-6 py-10'>
        <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left '>
          <div>
            <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer">
              <h1 className="font-bold text-xl text-zinc-300">
                ScaraDesk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse">AI</span>
              </h1>
            </div>
            <p className='text-zinc-500 text-sm mt-1'>Voice AI assistant for websites</p>
          </div>
          <p className='text-zinc-500 text-sm'> &copy;{new Date().getFullYear()} ScaraDeskAI. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;