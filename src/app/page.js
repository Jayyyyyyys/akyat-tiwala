"use client";

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [pax, setPax] = useState(1);

  // Updated Data for Nasugbu Mountains (2025 Estimates)
  const mountains = {
    batulao: {
      name: "Mt. Batulao",
      difficulty: "3/9",
      regFee: 140,
      guideFee: 800,
      desc: "The classic Nasugbu hike. Famous for its 'Mini Pulag' ridges and cool breeze."
    },
    trilogy: {
      name: "Nasugbu Trilogy",
      difficulty: "5/9",
      regFee: 140, 
      guideFee: 2100,
      desc: "Full challenge: Mt. Lantik + Mt. Talamitam + Mt. Apayang in one day."
    },
    talamitam: {
      name: "Mt. Talamitam (Only)",
      difficulty: "2/9",
      regFee: 140,
      guideFee: 700,
      desc: "The 'Sister Mountain' of Batulao. Vast grasslands and very beginner-friendly."
    },
    apayang: {
      name: "Mt. Apayang (Only)",
      difficulty: "3/9",
      regFee: 140,
      guideFee: 700,
      desc: "A slightly more technical peak next to Talamitam with a great view of the range."
    },
    lantik: {
      name: "Mt. Lantik (Only)",
      difficulty: "2/9",
      regFee: 140,
      guideFee: 700,
      desc: "A shorter, forested trail. Great if you want to avoid the direct heat of the sun."
    }
  };

  const currentMount = mountains[selectedMountain];
  const totalCost = currentMount ? (currentMount.regFee * pax) + currentMount.guideFee : 0;

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Head>
        <title>Akyat Tiwala | Nasugbu DIY Hiking</title>
      </Head>

      {/* NAVBAR */}
      <nav className="sticky top-0 bg-emerald-900 text-white p-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="font-black text-xl tracking-tighter uppercase italic">Akyat Tiwala</h1>
        <div className="space-x-4 text-xs font-bold uppercase">
          <a href="#plan" className="hover:text-orange-400">Plan</a>
          <a href="/portal" className="bg-orange-500 px-3 py-2 rounded">Guide Portal</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="bg-emerald-800 text-white py-16 px-6 text-center">
        <h2 className="text-5xl font-black mb-4 leading-tight">Diretso sa Lokal.</h2>
        <h2 className="text-3xl font-black mb-6 uppercase text-orange-400 italic">Kampante sa Pag-akyat.</h2>
        <p className="max-w-md mx-auto text-emerald-100 mb-8 text-lg">
          DIY hiking platform for Nasugbu. Choose your peak, see the budget, pick your guide.
        </p>
      </header>

      {/* PLAN YOUR HIKE SECTION */}
      <section id="plan" className="py-12 px-4 max-w-3xl mx-auto">
        <h3 className="text-3xl font-black text-center mb-8 text-emerald-900 uppercase">Plan Your Hike</h3>
        
        {/* STEP 1: SELECT MOUNTAIN (Grid Layout for more options) */}
        <div className="mb-10">
          <p className="font-bold mb-4 uppercase text-xs text-slate-500 text-center tracking-widest italic">Step 1: Choose your destination</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onClick={() => setSelectedMountain('batulao')}
              className={`p-4 rounded-xl font-bold border-2 transition ${selectedMountain === 'batulao' ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white border-slate-200'}`}
            >
              Mt. Batulao
            </button>
            <button 
              onClick={() => setSelectedMountain('trilogy')}
              className={`p-4 rounded-xl font-bold border-2 transition ${selectedMountain === 'trilogy' ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white border-slate-200'}`}
            >
              Nasugbu Trilogy (All 3)
            </button>
            <button 
              onClick={() => setSelectedMountain('talamitam')}
              className={`p-4 rounded-xl font-bold border-2 transition ${selectedMountain === 'talamitam' ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white border-slate-200'}`}
            >
              Mt. Talamitam Only
            </button>
            <button 
              onClick={() => setSelectedMountain('apayang')}
              className={`p-4 rounded-xl font-bold border-2 transition ${selectedMountain === 'apayang' ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white border-slate-200'}`}
            >
              Mt. Apayang Only
            </button>
            <button 
              onClick={() => setSelectedMountain('lantik')}
              className={`p-4 rounded-xl font-bold border-2 transition ${selectedMountain === 'lantik' ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white border-slate-200'}`}
            >
              Mt. Lantik Only
            </button>
          </div>
        </div>

        {currentMount && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* STEP 2: MOUNTAIN DETAILS & BUDGET */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-8">
              <h4 className="text-3xl font-black text-emerald-900 mb-2 underline decoration-orange-400 underline-offset-8">
                {currentMount.name}
              </h4>
              <p className="text-slate-600 mb-6 font-medium leading-relaxed italic mt-4">"{currentMount.desc}"</p>
              
              <div className="flex gap-4 mb-8">
                <div className="flex-1 bg-emerald-50 p-4 rounded-2xl text-center">
                  <span className="block text-[10px] uppercase font-black text-emerald-700">Difficulty</span>
                  <span className="font-black text-xl">{currentMount.difficulty}</span>
                </div>
                <div className="flex-1 bg-emerald-50 p-4 rounded-2xl text-center">
                  <span className="block text-[10px] uppercase font-black text-emerald-700">Registration</span>
                  <span className="font-black text-xl">₱{currentMount.regFee}</span>
                </div>
              </div>

              {/* BUDGET CALCULATOR */}
              <div className="border-t border-slate-100 pt-6">
                <p className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-tighter">Budget Estimator (DIY Sharing)</p>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold">Group Size (Pax):</label>
                  <span className="bg-orange-100 text-orange-600 font-black px-3 py-1 rounded-full text-lg">{pax}</span>
                </div>
                <input 
                  type="range" min="1" max="10" value={pax} 
                  onChange={(e) => setPax(e.target.value)}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-8"
                />
                
                <div className="flex justify-between items-center p-6 bg-slate-900 text-white rounded-2xl shadow-inner">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Group Cost</span>
                    <p className="text-3xl font-black">₱{totalCost}</p>
                  </div>
                  <div className="text-right border-l border-slate-700 pl-6">
                    <span className="text-[10px] uppercase font-bold text-orange-400 italic leading-none">Your Share</span>
                    <p className="text-2xl font-black">₱{(totalCost / pax).toFixed(0)}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-orange-500 text-white font-black py-5 rounded-2xl text-xl shadow-lg hover:bg-orange-600 transition uppercase italic">
                ⛰️ Pick Your Kuya!
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="py-12 bg-emerald-950 text-emerald-700 text-center text-xs font-bold uppercase tracking-widest">
        AKYAT TIWALA © 2025 | Nasugbu DIY Hiking Platform
      </footer>
    </div>
  );
}