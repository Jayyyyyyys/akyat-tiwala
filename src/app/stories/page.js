"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Make sure you have this file set up

export default function KwentongBundok() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch stories from Supabase
    useEffect(() => {
        fetchStories();
    }, []);

    async function fetchStories() {
        const { data, error } = await supabase
            .from('stories')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) console.log('Error fetching stories:', error);
        else setStories(data);
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* NAVBAR */}
            <nav className="bg-emerald-900 text-white p-4 flex justify-between items-center shadow-md">
                <a href="/" className="font-black text-xl tracking-tighter uppercase italic text-orange-400">AKYAT TIWALA</a>
                <a href="/stories/upload" className="bg-orange-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                    + Share Story
                </a>
            </nav>

            <header className="py-10 px-6 text-center">
                <h2 className="text-3xl font-black text-emerald-900 uppercase">Kwentong Bundok</h2>
                <p className="text-slate-500 font-medium italic">Latest experiences from Nasugbu trails</p>
            </header>

            <main className="max-w-4xl mx-auto px-4 pb-20">
                {loading ? (
                    <p className="text-center font-bold animate-pulse">Loading stories...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stories.length > 0 ? stories.map((story) => (
                            <div key={story.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                                {/* Photo */}
                                <div className="aspect-square bg-slate-200 overflow-hidden">
                                    <img 
                                        src={story.photo_url} 
                                        alt={story.mountain_name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Details */}
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">
                                            {story.mountain_name}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                                            {new Date(story.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">By: {story.hiker_name}</h4>
                                    <p className="text-sm text-slate-600 italic leading-relaxed">&quot;{story.caption}&quot;</p>
                                </div>
                            </div>
                        )) : (
                            <p className="col-span-full text-center py-10 text-slate-400 italic">No stories yet. Be the first to share!</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}