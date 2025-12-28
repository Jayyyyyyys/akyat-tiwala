"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function UploadStory() {
    const [hikerName, setHikerName] = useState('');
    const [mountain, setMountain] = useState('Mt. Batulao');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setUploading(true);

        try {
            // 1. Upload Image to Supabase Storage
            const fileExt = image.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('story-photos')
                .upload(filePath, image);

            if (uploadError) throw uploadError;

            // 2. Get the Public URL of the image
            const { data } = supabase.storage
                .from('story-photos')
                .getPublicUrl(filePath);

            const photoUrl = data.publicUrl;

            // 3. Save details to "stories" table
            const { error: insertError } = await supabase
                .from('stories')
                .insert([{ 
                    hiker_name: hikerName, 
                    mountain_name: mountain, 
                    caption, 
                    photo_url: photoUrl 
                }]);

            if (insertError) throw insertError;

            alert('Story shared successfully!');
            router.push('/stories');
        } catch (error) {
            alert('Error uploading story: ' + error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="min-h-screen bg-emerald-900 p-6 flex items-center justify-center font-sans">
            <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-black text-emerald-900 uppercase italic mb-6">Share Your Hike</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Your Name</label>
                        <input required type="text" value={hikerName} onChange={(e) => setHikerName(e.target.value)} className="w-full border p-3 rounded-xl focus:ring-2 ring-emerald-500 outline-none" placeholder="Hiker Juan" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Mountain</label>
                        <select value={mountain} onChange={(e) => setMountain(e.target.value)} className="w-full border p-3 rounded-xl">
                            <option>Mt. Batulao</option>
                            <option>Nasugbu Trilogy</option>
                            <option>Mt. Talamitam</option>
                            <option>Mt. Apayang</option>
                            <option>Mt. Lantik</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Caption</label>
                        <textarea required value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full border p-3 rounded-xl h-24" placeholder="Kumusta ang akyat mo?"></textarea>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Photo</label>
                        <input required type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-sm" />
                    </div>
                    <button disabled={uploading} type="submit" className="w-full bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-lg">
                        {uploading ? 'Uploading...' : 'Post Kwentong Bundok'}
                    </button>
                    <button type="button" onClick={() => router.back()} className="w-full text-slate-400 font-bold text-xs">Cancel</button>
                </form>
            </div>
        </div>
    );
}