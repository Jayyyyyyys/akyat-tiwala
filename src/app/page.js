"use client";

import { useState } from 'react';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [pax, setPax] = useState(1);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  const mountains = {
    batulao: {
      name: "Mt. Batulao",
      difficulty: "4/9",
      regFee: 220,
      guideFee: 1200,
      desc: "The classic Nasugbu hike. Famous for its 'Mini Pulag' ridges and cool breeze."
    },
    trilogy: {
      name: "Nasugbu Trilogy",
      difficulty: "5/9",
      regFee: 450,
      guideFee: 2100,
      desc: "Full challenge: Mt. Lantik + Mt. Talamitam + Mt. Apayang in one day."
    },
    talamitam: {
      name: "Mt. Talamitam",
      difficulty: "4/9",
      regFee: 150,
      guideFee: 700,
      desc: "The 'Sister Mountain' of Batulao. Vast grasslands and very beginner-friendly."
    },
    apayang: {
      name: "Mt. Apayang",
      difficulty: "3/9",
      regFee: 150,
      guideFee: 700,
      desc: "A slightly more technical peak next to Talamitam with a great view of the range."
    },
    lantik: {
      name: "Mt. Lantik",
      difficulty: "3/9",
      regFee: 150,
      guideFee: 700,
      desc: "A shorter, forested trail. Great if you want to avoid the direct heat of the sun."
    }
  };

  const currentMount = selectedMountain ? mountains[selectedMountain] : null;
  const totalCost = currentMount ? (currentMount.regFee * Number(pax)) + currentMount.guideFee : 0;

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  async function fetchKuyas() {
    if (!currentMount?.name) {
      alert("Please select a mountain first.");
      return;
    }
    setLoading(true);
    setGuides([]);

    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .contains('mountains_covered', [currentMount.name])
      .eq('is_verified', true);

    if (error) {
      alert("Error finding guides: " + error.message);
    } else {
      setGuides(data);
      if (data.length === 0) alert("Walang available na verified Kuya ngayon. Subukan ulit mamaya!");
      setTimeout(() => scrollTo('guide-results'), 300);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen font-sans bg-[#fdfdfd] text-slate-900 selection:bg-orange-200">
      <Head>
        <title>Akyat Tiwala | Nasugbu DIY Hiking</title>
      </Head>

      {/* --- STICKY NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-100 p-6 flex justify-between items-center transition-all duration-300">
        <a href="/" className="font-black text-2xl tracking-tighter uppercase italic text-white drop-shadow-md">
            AKYAT TIWALA
        </a>
        <div className="flex items-center gap-4">
            <a href="/about" className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:border-orange-500 transition shadow-2xl">
                About Us
            </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-scale duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070')`,
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/50 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-80 italic">The Trails of Nasugbu</p>
          <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl italic">
            AKYAT <br/> TIWALA
          </h1>
          <h2 className="text-xs md:text-lg font-bold text-white uppercase tracking-[0.4em] mb-12 opacity-95">
             Diretso sa Lokal. Kampante sa Pag-akyat.
          </h2>

          <div className="inline-flex flex-col sm:flex-row backdrop-blur-xl bg-black/20 border border-white/20 rounded-3xl sm:rounded-full px-2 py-2 shadow-2xl">
             <button onClick={() => scrollTo('plan')} className="px-10 py-4 font-black text-white text-[10px] md:text-xs tracking-widest hover:text-orange-400 transition uppercase">PLAN</button>
             <div className="hidden sm:block w-px h-8 bg-white/20 self-center" />
             <a href="/stories" className="px-10 py-4 font-black text-white text-[10px] md:text-xs tracking-widest hover:text-orange-400 transition uppercase">Kwentong Bundok</a>
             <div className="hidden sm:block w-px h-8 bg-white/20 self-center" />
             <a href="/portal" className="px-10 py-4 font-black text-white text-[10px] md:text-xs tracking-widest hover:text-orange-400 transition uppercase italic leading-none">Lead the Way</a>
          </div>
        </div>
      </section>

      {/* --- PLAN SECTION --- */}
      <section id="plan" className="py-24 px-4 max-w-5xl mx-auto scroll-mt-24">
        <header className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Your Hike Details</h3>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto mt-4 rounded-full" />
        </header>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
          {Object.keys(mountains).map((key) => (
            <button 
              key={key}
              onClick={() => { setSelectedMountain(key); setGuides([]); }}
              className={`p-6 rounded-4xl font-black uppercase text-[10px] md:text-xs border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-2 ${
                selectedMountain === key ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              <span className="opacity-50 tracking-tighter text-[8px]">Mount</span>
              <span className="text-center leading-none">{mountains[key].name.replace('Mt. ', '')}</span>
            </button>
          ))}
        </div>

        {currentMount && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="grid md:grid-cols-12 overflow-hidden rounded-[4rem] shadow-2xl border border-slate-50 bg-white">
              <div className="md:col-span-5 bg-slate-900 p-12 text-white">
                <h4 className="text-4xl font-black uppercase italic mb-6 leading-tight text-orange-500 underline decoration-white underline-offset-8 decoration-4">{currentMount.name}</h4>
                <p className="text-slate-400 italic font-medium leading-relaxed mb-12">&quot;{currentMount.desc}&quot;</p>
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1 leading-none italic underline decoration-white">Hike Difficulty</span>
                    <p className="text-2xl font-black italic">{currentMount.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1 leading-none italic underline decoration-white">Registration/Entry</span>
                    <p className="text-2xl font-black italic">₱{currentMount.regFee} /pax</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 p-12 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-10 px-2">
                    <span className="text-sm font-black text-slate-800 uppercase italic">Number of Hikers:</span>
                    <span className="text-5xl font-black text-orange-500 italic underline decoration-slate-900 underline-offset-4 decoration-8 leading-none tracking-tighter">{pax}</span>
                </div>
                <input type="range" min="1" max="5" value={pax} onChange={(e) => setPax(e.target.value)} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none accent-slate-900 mb-12 cursor-pointer" />
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 p-6 rounded-3xl">
                        <span className="text-[10px] font-black uppercase text-slate-400 mb-2 leading-none italic underline block tracking-tighter">Est. Shared Total</span>
                        <p className="text-3xl font-black italic">₱{totalCost}</p>
                    </div>
                    <div className="bg-orange-500 text-white p-6 rounded-3xl shadow-xl shadow-orange-100">
                        <span className="text-[10px] font-black uppercase text-white/70 mb-2 leading-none italic underline block tracking-tighter decoration-white">Kanya-Kanyang Bayad</span>
                        <p className="text-3xl font-black italic underline-offset-4 decoration-2 tracking-tighter leading-none">₱{(totalCost / pax).toFixed(0)}</p>
                    </div>
                </div>
                <button onClick={fetchKuyas} disabled={loading} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl text-xl uppercase italic shadow-2xl hover:scale-[1.01] active:scale-95 transition-all">
                  {loading ? 'Finding Kuya/Ate...' : '⛰️ Select Available Kuya'}
                </button>
              </div>
            </div>

            <div id="guide-results" className="pt-24 space-y-8 max-w-3xl mx-auto">
                {guides.map((kuya) => (
                    <div key={kuya.id} className="bg-white border p-10 rounded-[4rem] shadow-xl flex flex-col md:flex-row items-center gap-10">
                        <img src={kuya.photo_url || 'https://via.placeholder.com/150'} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl rotate-2" />
                        <div className="flex-1 text-center md:text-left">
                            <h5 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">{kuya.nickname} ✅</h5>
                            <span className="text-[10px] font-black bg-orange-50 text-orange-500 px-3 py-1 rounded-full uppercase border border-orange-100 mt-2 mb-4 inline-block">Nasugbu Lokal</span>
                            <p className="text-slate-500 font-medium italic mb-6 leading-relaxed px-4 md:px-0 opacity-70">&quot;{kuya.bio}&quot;</p>
                            <div className="flex gap-2">
                                <a href={`https://m.me/${kuya.messenger_url}`} className="flex-1 bg-blue-600 text-white text-center py-4 rounded-3xl font-black text-[10px] uppercase italic">Messenger</a>
                                <a href={`tel:${kuya.phone}`} className="flex-1 bg-slate-950 text-white text-center py-4 rounded-3xl font-black text-[10px] uppercase italic tracking-widest">{kuya.phone}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </section>

      <footer className="py-24 bg-white border-t border-slate-50 flex flex-col items-center">
        {/* LOGO AND BRANDING */}
        <p className="text-[10px] font-black uppercase text-slate-900 tracking-[0.5em] mb-10 leading-none">
            Akyat Tiwala • 2025
        </p>

        <div className="flex gap-8 items-center">
            {/* FACEBOOK */}
            <a href="https://facebook.com/jacob.cornejo37" target="_blank" className="text-slate-900 hover:text-blue-600 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
            </a>
            
            {/* INSTAGRAM */}
            <a href="https://instagram.com/j.crnj" target="_blank" className="text-slate-900 hover:text-pink-600 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
            </a>
        </div>

        {/* DEVELOPER SIGNATURE */}
        <p className="mt-20 opacity-30 text-[9px] font-black uppercase tracking-[1em] italic leading-none">
            Built by Jacob Cornejo
        </p>
      </footer>
    </div>
  );
}