"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [guides, setGuides] = useState([]);
  const [pass, setPass] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);

  // YOUR SECRET KEY - Change this!
  const SECRET_KEY = "AkyatAdmin2025";

  useEffect(() => {
    if (isAuthorized) fetchAllGuides();
  }, [isAuthorized]);

  async function fetchAllGuides() {
    setLoading(true);
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setGuides(data);
    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from('guides')
      .update({ is_verified: newStatus })
      .eq('id', id);

    if (error) alert(error.message);
    else fetchAllGuides(); // Refresh the list
  }

  async function deleteGuide(id) {
    if (confirm("Permanently delete this applicant?")) {
      const { error } = await supabase.from('guides').delete().eq('id', id);
      if (!error) fetchAllGuides();
    }
  }

  // --- PASSWORD PROTECTION SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-black text-slate-800 mb-6 uppercase text-center italic tracking-tighter">Admin Access</h1>
          <input 
            type="password" 
            placeholder="Admin Code" 
            className="w-full p-4 border-2 rounded-xl mb-4 text-center font-bold"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button 
            onClick={() => pass === SECRET_KEY ? setIsAuthorized(true) : alert("Wrong code")}
            className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-lg"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 pb-20">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10 bg-emerald-900 p-6 rounded-3xl text-white shadow-lg">
        <div>
          <h2 className="text-2xl font-black uppercase italic">AKYAT TIWALA ADMIN</h2>
          <p className="text-[10px] font-bold opacity-70 tracking-widest uppercase mt-1 text-orange-400">Verifying Local Guides</p>
        </div>
        <button onClick={() => window.location.reload()} className="text-[10px] bg-emerald-800 px-4 py-2 rounded-full font-black border border-emerald-700">LOGOUT</button>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className={`p-6 bg-white border-2 rounded-4xl shadow-sm transition-all ${guide.is_verified ? 'border-emerald-500/30 shadow-emerald-100/50' : 'border-orange-500 shadow-orange-100'}`}>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border shadow-sm shrink-0 bg-slate-200">
                  <img src={guide.photo_url} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-xl text-slate-800 leading-none truncate italic uppercase">{guide.nickname}</h3>
                  <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase ${guide.is_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700 animate-pulse'}`}>
                    {guide.is_verified ? "Verified ✅" : "Pending 🕒"}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Introduction</p>
                  <p className="text-sm font-medium italic text-slate-600 line-clamp-3 leading-relaxed">"{guide.bio}"</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-2xl flex justify-around">
                   <div className="text-center">
                      <p className="text-[7px] font-bold uppercase text-slate-400 leading-none mb-1 tracking-tighter text-left ml-2">Contacts</p>
                      <div className="flex gap-2">
                         <span className="text-[10px] font-bold">📞 {guide.phone}</span>
                         <span className="text-[10px] font-bold">💬 {guide.messenger_url}</span>
                      </div>
                   </div>
                </div>

                <div>
                   <p className="text-[8px] font-black uppercase text-slate-400 mb-1 leading-none ml-2">Destinations</p>
                   <p className="text-xs font-bold text-emerald-700">{guide.mountains_covered?.join(" • ")}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-2">
                {!guide.is_verified ? (
                  <button 
                    onClick={() => updateStatus(guide.id, true)}
                    className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl uppercase tracking-tighter text-xs shadow-md shadow-emerald-200 hover:bg-emerald-700 transition"
                  >
                    Accept and Publish Site
                  </button>
                ) : (
                  <button 
                    onClick={() => updateStatus(guide.id, false)}
                    className="w-full bg-slate-200 text-slate-500 font-black py-4 rounded-2xl uppercase tracking-tighter text-xs hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    Unverify (Hide)
                  </button>
                )}
                <button 
                   onClick={() => deleteGuide(guide.id)}
                   className="text-[10px] font-bold text-red-300 hover:text-red-500 transition py-2"
                >
                    Permanently Delete
                </button>
              </div>

            </div>
          ))}
        </div>

        {!loading && guides.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 italic font-bold text-slate-400">
             No one has signed up as a guide yet.
          </div>
        )}
      </main>
    </div>
  );
}