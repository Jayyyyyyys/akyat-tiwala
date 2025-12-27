import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [pax, setPax] = useState(1);

  // Data for Nasugbu Mountains
  const mountains = {
    batulao: {
      name: "Mt. Batulao",
      difficulty: "3/9",
      regFee: 140,
      guideFee: 800,
      desc: "Famous for its jagged peaks and rolling ridges. Perfect for beginners."
    },
    trilogy: {
      name: "Nasugbu Trilogy",
      difficulty: "5/9",
      regFee: 200,
      guideFee: 1500,
      desc: "Talamitam + Apayang + Lantik. A challenging day hike for endurance."
    }
  };

  const currentMount = mountains[selectedMountain];
  const totalCost = currentMount ? (currentMount.regFee * pax) + currentMount.guideFee : 0;

  return (
    <div className="min-h-screen font-sans">
      <Head>
        <title>Akyat Tiwala | Nasugbu DIY Hiking</title>
      </Head>

      {/* NAVBAR */}
      <nav className="sticky top-0 bg-emerald-900 text-white p-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="font-black text-xl tracking-tighter uppercase">Akyat Tiwala</h1>
        <div className="space-x-4 text-xs font-bold uppercase">
          <a href="#plan">Plan</a>
          <a href="/stories" className="opacity-70">Stories</a>
          <a href="/portal" className="bg-orange-500 px-3 py-2 rounded">Guide Portal</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="bg-emerald-800 text-white py-16 px-6 text-center">
        <h2 className="text-5xl font-black mb-4 leading-tight">Diretso sa Lokal.</h2>
        <h2 className="text-4xl font-black mb-6 uppercase text-orange-400 leading-none">Kampante sa Pag-akyat.</h2>
        <p className="max-w-md mx-auto text-emerald-100 mb-8 text-lg">
          The DIY platform for Nasugbu hikers. No middleman fees. No joiner markups.
        </p>
        <a href="#plan" className="bg-white text-emerald-900 font-bold px-8 py-4 rounded-full shadow-xl inline-block">
          🧭 START PLANNING
        </a>
      </header>

      {/* WHAT IS AKYAT TIWALA? */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-black text-center mb-10 text-emerald-900">Ano ang Akyat Tiwala?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h4 className="font-bold mb-2">Tapat na Presyo</h4>
            <p className="text-sm text-slate-600 font-medium">Sinasabi namin ang tunay na registration at guide fees. Walang dagdag.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="font-bold mb-2">Direktang Kontrata</h4>
            <p className="text-sm text-slate-600 font-medium">Direktang chat o tawag sa mga local guides ng Nasugbu.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⛰️</div>
            <h4 className="font-bold mb-2">Suporta sa Lokal</h4>
            <p className="text-sm text-slate-600 font-medium">100% ng bayad ay napupunta sa mga local kuyas at barangay.</p>
          </div>
        </div>
      </section>

      {/* PLAN YOUR HIKE SECTION */}
      <section id="plan" className="bg-slate-100 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-black text-center mb-8">Plan Your Hike</h3>
          
          {/* STEP 1: SELECT MOUNTAIN */}
          <div className="mb-10 text-center">
            <p className="font-bold mb-4 uppercase text-xs text-slate-500 tracking-widest">Step 1: Saan ang akyat?</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setSelectedMountain('batulao')}
                className={`px-6 py-3 rounded-xl font-bold transition ${selectedMountain === 'batulao' ? 'bg-emerald-900 text-white shadow-lg' : 'bg-white border'}`}
              >
                Mt. Batulao
              </button>
              <button 
                onClick={() => setSelectedMountain('trilogy')}
                className={`px-6 py-3 rounded-xl font-bold transition ${selectedMountain === 'trilogy' ? 'bg-emerald-900 text-white shadow-lg' : 'bg-white border'}`}
              >
                Nasugbu Trilogy
              </button>
            </div>
          </div>

          {currentMount && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* STEP 2: DETAILS & BUDGET */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
                <h4 className="text-2xl font-black text-emerald-900 mb-2">{currentMount.name}</h4>
                <p className="text-slate-600 mb-6 font-medium leading-relaxed">{currentMount.desc}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-emerald-700">Difficulty</span>
                    <span className="font-bold">{currentMount.difficulty}</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-emerald-700">Reg Fee</span>
                    <span className="font-bold">₱{currentMount.regFee}/pax</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-center font-bold text-xs uppercase text-slate-400 mb-4">Budget Estimator</p>
                  <label className="block text-sm font-bold mb-2">Ilang kayo? (Number of Hikers): {pax}</label>
                  <input 
                    type="range" min="1" max="10" value={pax} 
                    onChange={(e) => setPax(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-6"
                  />
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Total (Reg + Guide)</span>
                      <p className="text-3xl font-black">₱{totalCost}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 uppercase italic">Kanya-kanya (Per Person)</span>
                      <p className="text-xl font-black text-emerald-700">₱{(totalCost / pax).toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: PICK YOUR KUYA */}
              <div className="text-center">
                <button className="bg-orange-500 text-white font-black px-10 py-5 rounded-2xl shadow-xl text-lg hover:scale-105 transition active:scale-95">
                  ⛰️ PICK YOUR KUYA!
                </button>
                <p className="mt-4 text-xs text-slate-500 font-medium">Click to see list of verified local guides for {currentMount.name}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-emerald-950 text-emerald-500 text-center text-sm font-medium">
        <p>© 2025 Akyat Tiwala. Para sa mountaineer, para sa lokal.</p>
      </footer>
    </div>
  );
}