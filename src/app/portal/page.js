"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function GuideRegistration() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const mountainOptions = ["Mt. Batulao", "Nasugbu Trilogy", "Mt. Talamitam", "Mt. Apayang", "Mt. Lantik"];

  // Helper for image preview so Kuya knows his photo worked
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const selectedMountains = mountainOptions.filter(m => formData.get(m));

    try {
      if (!photo) throw new Error("Please upload a photo first.");

      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('guide-photos')
        .upload(fileName, photo);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('guide-photos').getPublicUrl(fileName);

      const { error: insertError } = await supabase.from('guides').insert([{
        nickname: formData.get('nickname'),
        phone: formData.get('phone'),
        messenger_url: formData.get('messenger'),
        bio: formData.get('bio'),
        mountains_covered: selectedMountains,
        photo_url: urlData.publicUrl
      }]);

      if (insertError) throw insertError;

      alert("Salamat Kuya! Tapos na ang registration. Antayin ang text o call namin para sa verification.");
      router.push('/');
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-orange-500">
      {/* BACKGROUND IMAGE - Consistent with other pages */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black-950/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto p-6 pt-10 pb-24">
        {/* NAV/HEADER */}
        <header className="mb-10 text-center">
            <a href="/" className="font-black text-2xl tracking-tighter uppercase italic text-orange-500 underline decoration-white underline-offset-4">AKYAT TIWALA</a>
            <h1 className="mt-8 text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">Be a Guide</h1>
            <p className="text-white/50 font-bold text-[10px] uppercase tracking-[0.2em]">Mag-sign up bilang Lokal na Gabay</p>
        </header>

        {/* FROSTED GLASS FORM */}
        <form onSubmit={handleRegister} className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-[3rem] shadow-2xl space-y-8">
          
          {/* PHOTO SECTION - Improved for visual confirmation */}
          <div className="flex flex-col items-center">
             <p className="text-[10px] font-black uppercase text-orange-400 mb-4 tracking-widest leading-none">1. Litrato ng Mukha</p>
             <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center overflow-hidden transition hover:border-orange-500">
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">📷</span>
                  )}
                  <input required type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 opacity-0 cursor-pointer" title="Pindutin para mag-upload ng photo" />
                </div>
             </div>
             <p className="mt-3 text-[9px] font-medium text-white/40 italic leading-none underline">Click box para pumili ng photo</p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase text-orange-400 mb-2 tracking-widest leading-none">2. Personal Information</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[8px] font-bold text-white/30 uppercase ml-4">Nickname / Alyas</label>
                    <input required name="nickname" placeholder="Kuya Mario" className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:border-orange-500 focus:bg-white/10 transition-all shadow-inner" />
                </div>
                <div className="space-y-1">
                    <label className="text-[8px] font-bold text-white/30 uppercase ml-4">Mobile Number</label>
                    <input required name="phone" placeholder="09123456789" className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:border-orange-500 focus:bg-white/10 transition-all shadow-inner" />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[8px] font-bold text-white/30 uppercase ml-4 underline decoration-orange-500 decoration-2 italic">Messenger Username</label>
                <input required name="messenger" placeholder="fb.com/mario.local" className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:border-orange-500 shadow-inner" />
            </div>

            <div className="space-y-1">
                <label className="text-[8px] font-bold text-white/30 uppercase ml-4">Ang iyong bio / intro</label>
                <textarea required name="bio" placeholder="Sabihin ang iyong karanasan sa bundok..." className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:border-orange-500 h-24 shadow-inner" />
            </div>
          </div>

          {/* MOUNTAIN SELECTION - Bigger tap targets for Kuyas */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase text-orange-400 mb-2 tracking-widest leading-none italic">3. Mga Bundok na Kabisado</p>
            <div className="grid grid-cols-2 gap-3">
              {mountainOptions.map(m => (
                <label key={m} className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition group">
                  <input type="checkbox" name={m} className="w-5 h-5 rounded-lg border-2 border-white/20 bg-transparent accent-orange-500 cursor-pointer" />
                  <span className="text-[10px] font-black uppercase italic group-hover:text-orange-500 transition-colors">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            disabled={loading} 
            className={`w-full ${loading ? 'bg-white/20' : 'bg-orange-500 hover:bg-orange-600'} text-white font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.2em] italic text-sm active:scale-95`}
          >
            {loading ? 'Sinesave ang Profile...' : 'Submit Registration'}
          </button>
        </form>

        <p className="mt-8 text-center text-white/20 text-[9px] font-black uppercase tracking-widest italic">Admin Verified Local Community</p>
      </div>
    </div>
  );
}