"use client";

import { useState } from 'react';
import Head from 'next/head';
import { supabase } from '@/lib/supabase'; // Make sure this import is here!

export default function Home() {
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [pax, setPax] = useState(1);
  const [guides, setGuides] = useState([]); // List of kuyas found
  const [loading, setLoading] = useState(false); // To show loading state

  // Updated Data for Nasugbu Mountains
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
  const totalCost = currentMount ? (currentMount.regFee * Number(pax)) + currentMount.guideFee : 0;

  // NEW: Function to search for Kuyas in Supabase
  async function fetchKuyas() {
    setLoading(true);
    setGuides([]); // Clear old results

    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .contains('mountains_covered', [currentMount.name])
      .eq('is_verified', true); // Show only verified kuyas

    if (error) {
      alert("Error finding guides: " + error.message);
    } else {
      setGuides(data);
      if (data.length === 0) alert("Walang available na verified Kuya sa bundok na ito ngayon. Subukan ulit mamaya!");
      
      // Auto-scroll down to results
      setTimeout(() => {
        document.getElementById('guide-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Head>
        <title>Akyat Tiwala | Nasugbu DIY Hiking</title>
      </Head>

      <nav className="sticky top-0 bg-emerald-900 text-white p-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="font-black text-xl tracking-tighter uppercase italic">Akyat Tiwala</h1>
        <div className="space-x-4 text-xs font-bold uppercase">
          <a href="/" className="hover:text-orange-400 underline underline-offset-4">Plan</a>
          <a href="/stories" className="hover:text-orange-400">Kwentong Bundok</a> 
          <a href="/portal" className="bg-orange-500 px-3 py-2 rounded">Guide Portal</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="bg-emerald-800 text-white py-16 px-6 text-center">
        <h2 className="text-5xl font-black mb-4 leading-tight tracking-tighter uppercase italic underline decoration-orange-500 underline-offset-8">Akyat Tiwala</h2>
        <h2 className="text-2xl font-black mb-6 uppercase text-emerald-200 italic leading-none">Diretso sa Lokal. Kampante sa Pag-akyat.</h2>
        <p className="max-w-md mx-auto text-emerald-100 mb-8 text-lg font-medium opacity-80 leading-relaxed">
          DIY platform for Nasugbu hikers. Find a local guide, get accurate budgets, and see the trail before you climb.
        </p>
      </header>

      {/* PLAN YOUR HIKE SECTION */}
      <section id="plan" className="py-12 px-4 max-w-3xl mx-auto">
        <h3 className="text-3xl font-black text-center mb-8 text-emerald-900 uppercase italic">Plan Your Hike</h3>
        
        {/* STEP 1: SELECT MOUNTAIN */}
        <div className="mb-10">
          <p className="font-bold mb-4 uppercase text-[10px] text-slate-400 text-center tracking-widest italic leading-none">Step 1: Choose your destination</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(mountains).map((key) => (
                <button 
                  key={key}
                  onClick={() => { setSelectedMountain(key); setGuides([]); }}
                  className={`p-5 rounded4xl font-black uppercase text-sm border-4 transition-all active:scale-95 ${selectedMountain === key ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'}`}
                >
                  {mountains[key].name}
                </button>
            ))}
          </div>
        </div>

        {currentMount && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* STEP 2: MOUNTAIN DETAILS & BUDGET */}
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-b-8 border-orange-500 mb-8">
              <h4 className="text-3xl font-black text-emerald-900 mb-2 underline decoration-orange-400 underline-offset-8">
                {currentMount.name}
              </h4>
              <p className="text-slate-600 mb-6 font-medium leading-relaxed italic mt-6 opacity-75">
                &quot;{currentMount.desc}&quot;
              </p>
              
              <div className="flex gap-4 mb-10">
                <div className="flex-1 bg-emerald-50 p-4 rounded-3xl text-center">
                  <span className="block text-[10px] uppercase font-black text-emerald-700 tracking-tighter">Difficulty</span>
                  <span className="font-black text-2xl">{currentMount.difficulty}</span>
                </div>
                <div className="flex-1 bg-emerald-50 p-4 rounded-3xl text-center">
                  <span className="block text-[10px] uppercase font-black text-emerald-700 tracking-tighter">Registration</span>
                  <span className="font-black text-2xl">₱{currentMount.regFee}</span>
                </div>
              </div>

              {/* BUDGET CALCULATOR */}
              <div className="border-t border-slate-50 pt-10">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-black text-emerald-900 uppercase italic underline decoration-orange-500 decoration-4">How many are you?</span>
                    <span className="bg-orange-100 text-orange-600 font-black px-5 py-2 rounded-full text-xl shadow-inner italic uppercase">pax {pax}</span>
                </div>
                
                <input 
                  type="range" min="1" max="10" value={pax} 
                  onChange={(e) => setPax(e.target.value)}
                  className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-orange-500 mb-10"
                />
                
                <div className="grid grid-cols-2 bg-emerald-950 p-8 rounded-[2.5rem] shadow-2xl mb-8 border-r-8 border-orange-500">
                  <div className="border-r border-emerald-800 pr-6">
                    <span className="text-[10px] uppercase font-black text-emerald-500 opacity-60 italic leading-none block mb-1">Total Budget</span>
                    <p className="text-3xl font-black text-white">₱{totalCost}</p>
                  </div>
                  <div className="pl-6">
                    <span className="text-[10px] uppercase font-black text-orange-400 opacity-80 italic leading-none block mb-1 underline">Individual Share</span>
                    <p className="text-2xl font-black text-white italic">₱{(totalCost / Number(pax)).toFixed(0)}</p>
                  </div>
                </div>

                {/* THE PICK BUTTON */}
                <button 
                  onClick={fetchKuyas}
                  disabled={loading}
                  className="w-full bg-emerald-900 text-white font-black py-6 rounded-[2.5rem] text-xl shadow-xl hover:bg-orange-500 transition-all uppercase italic active:scale-95 flex items-center justify-center gap-3 border-b-4 border-emerald-950"
                >
                  {loading ? 'Hahanapin si Kuya...' : '⛰️ Pick Your Kuya!'}
                </button>
              </div>
            </div>

            {/* RESULTS: THE KUYAS LIST (FACES & CARDS) */}
            <div id="guide-results" className="pt-10 space-y-6">
              {guides.map((kuya) => (
                <div key={kuya.id} className="bg-white p-6 rounded-[3rem] shadow-xl border-l-8 border-emerald-900 flex flex-col items-center animate-in slide-in-from-right-4 duration-500">
                  {/* FACE IMAGE */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200 mb-4 bg-slate-100 shrink-0 shadow-lg">
                    <img 
                      src={kuya.photo_url || 'https://via.placeholder.com/150'} 
                      alt={kuya.nickname} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="text-center mb-6">
                    <h5 className="text-2xl font-black text-emerald-900 uppercase italic mb-2 tracking-tighter">
                        {kuya.nickname} ✅
                    </h5>
                    <p className="text-[10px] font-black bg-emerald-50 text-emerald-600 py-1 px-4 rounded-full uppercase inline-block mb-3 border border-emerald-100 tracking-widest">
                      Local Guide • {kuya.mountains_covered.join(" • ")}
                    </p>
                    <p className="text-slate-500 font-medium italic text-sm leading-relaxed px-4">
                      &quot;{kuya.bio}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                    <a href={`https://m.me/${kuya.messenger_url}`} target="_blank" className="bg-blue-600 text-white text-center py-4 rounded-3xl font-black text-[10px] uppercase italic tracking-widest shadow-lg">Messenger</a>
                    <a href={`tel:${kuya.phone}`} className="bg-slate-900 text-white text-center py-4 rounded-3xl font-black text-[10px] uppercase italic tracking-widest shadow-lg leading-tight">
                        Tawag na! <br/> <span className="text-[9px] opacity-60 leading-none lowercase tracking-tighter">{kuya.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </section>

      <footer className="py-16 bg-emerald-950 text-emerald-700 text-center text-[10px] font-black uppercase tracking-[0.2em] mt-20 opacity-40">
        Akyat Tiwala • 2025 • Para sa lokal.
      </footer>
    </div>
  );
}