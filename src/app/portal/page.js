"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function GuideRegistration() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const router = useRouter();

  const mountainOptions = ["Mt. Batulao", "Nasugbu Trilogy", "Mt. Talamitam", "Mt. Apayang", "Mt. Lantik"];

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    
    // Get checkboxes
    const selectedMountains = mountainOptions.filter(m => formData.get(m));

    try {
      // 1. Upload Profile Photo
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('guide-photos')
        .upload(fileName, photo);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('guide-photos').getPublicUrl(fileName);

      // 2. Save Guide Details
      const { error: insertError } = await supabase.from('guides').insert([{
        nickname: formData.get('nickname'),
        phone: formData.get('phone'),
        messenger_url: formData.get('messenger'),
        bio: formData.get('bio'),
        mountains_covered: selectedMountains,
        photo_url: urlData.publicUrl
      }]);

      if (insertError) throw insertError;

      alert("Success! Your profile is now pending verification.");
      router.push('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-6 flex flex-col items-center font-sans">
      <div className="bg-white rounded-4x1 p-8 w-full max-w-lg shadow-2xl">
        <h1 className="text-3xl font-black text-emerald-900 uppercase italic leading-none mb-2">Be a Guide</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase mb-8 tracking-widest">Join the Akyat Tiwala Nasugbu community</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col items-center bg-slate-50 p-6 rounded-2xl border-2 border-dashed">
            <label className="text-xs font-bold uppercase text-slate-400 mb-2 italic">Your Profile Face Photo</label>
            <input required type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="text-xs font-medium" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input required name="nickname" placeholder="Nickname (Ex: Kuya Mario)" className="p-4 rounded-xl border-2 text-sm font-bold bg-slate-50 outline-none focus:border-orange-500" />
            <input required name="phone" placeholder="Phone Number" className="p-4 rounded-xl border-2 text-sm font-bold bg-slate-50 outline-none focus:border-orange-500" />
          </div>

          <input required name="messenger" placeholder="Facebook Username (Ex: mario.local123)" className="w-full p-4 rounded-xl border-2 text-sm font-bold bg-slate-50 outline-none focus:border-orange-500" />

          <textarea required name="bio" placeholder="Tell hikers about your experience..." className="w-full p-4 rounded-xl border-2 text-sm font-bold bg-slate-50 h-24" />

          <div className="p-4 bg-emerald-50 rounded-2xl">
            <p className="text-[10px] font-black uppercase text-emerald-800 mb-2">Which mountains do you guide?</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-emerald-900 uppercase italic">
              {mountainOptions.map(m => (
                <label key={m} className="flex items-center gap-2">
                  <input type="checkbox" name={m} className="accent-orange-500" /> {m}
                </label>
              ))}
            </div>
          </div>

          <button disabled={loading} className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl shadow-lg hover:bg-orange-600 transition uppercase tracking-widest italic">
            {loading ? 'Creating Profile...' : '🚀 Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}