"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function KwentongBundok() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // --- SHARE FUNCTION ---
    const handleShare = async (story) => {
        const shareData = {
            title: `Akyat Tiwala - ${story.mountain_name}`,
            text: `Check out ${story.hiker_name}'s hike at ${story.mountain_name}: "${story.caption}"`,
            url: window.location.href, // Or a specific link to the post if you build one
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
            }
        } catch (err) {
            console.log("Sharing failed", err);
        }
    };

    return (
        <div className="min-h-screen relative font-sans text-white">
            <div 
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070')`,
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* CONTENT AREA */}
            <div className="relative z-10">
                {/* GLASS NAVIGATION */}
                <nav className="p-6 flex justify-between items-center sticky top-0 backdrop-blur-md bg-black/20 border-b border-white/10 shadow-2xl">
                    <a href="/" className="font-black text-2xl tracking-tighter uppercase italic text-white leading-none">
                        AKYAT <span className="text-orange-500 underline decoration-white underline-offset-4 font-black">TIWALA</span>
                    </a>
                    <a href="/stories/upload" className="bg-white/10 border border-white/30 backdrop-blur-md text-white text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95">
                        + Share Your Story
                    </a>
                </nav>

                <header className="py-20 px-6 text-center max-w-4xl mx-auto">
                    <p className="text-orange-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Hiker Feed</p>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 drop-shadow-xl">
                        Kwentong Bundok
                    </h2>
                    <p className="text-white/60 font-medium italic text-lg leading-relaxed">
                        Voices from the peaks of Nasugbu. High spirits and trail stories.
                    </p>
                    <div className="h-1 w-20 bg-orange-500 mx-auto mt-8 rounded-full" />
                </header>

                <main className="max-w-6xl mx-auto px-6 pb-24">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <p className="font-black italic text-2xl animate-pulse uppercase tracking-tighter">Updating Feed...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stories.length > 0 ? stories.map((story) => (
                                <div key={story.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:scale-[1.02] flex flex-col group">
                                    
                                    {/* High-End Polaroid Style Image */}
                                    <div className="aspect-4/5 bg-slate-900/50 overflow-hidden relative">
                                        <img 
                                            src={story.photo_url} 
                                            alt={story.mountain_name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-[10px] font-black px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest leading-none">
                                            {story.mountain_name}
                                        </div>
                                    </div>

                                    {/* Post Details */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex justify-between items-center mb-6">
                                            <p className="font-black text-xl italic uppercase tracking-tight text-white/90">
                                                By {story.hiker_name}
                                            </p>
                                            <span className="text-[10px] text-white/40 font-black uppercase tracking-tighter">
                                                {new Date(story.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                                            </span>
                                        </div>
                                        
                                        <p className="text-white/70 italic text-base leading-relaxed mb-10 flex-1">
                                            &quot;{story.caption}&quot;
                                        </p>

                                        {/* SHARE ACTIONS */}
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleShare(story)}
                                                className="flex-1 bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition hover:bg-orange-500 hover:text-white"
                                            >
                                                Share to Stories
                                            </button>
                                            <div className="px-5 bg-white/10 flex items-center justify-center rounded-2xl border border-white/20 hover:bg-white/20 transition cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-20 bg-white/5 backdrop-blur-md border border-dashed border-white/20 rounded-[3rem]">
                                    <p className="text-white/30 font-black italic uppercase tracking-widest">Feed is empty. Start the trail.</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
                
                {/* FOOTER */}
                <footer className="py-20 text-center opacity-30 text-[10px] font-black uppercase tracking-[1em]">
                    Akyat Tiwala • Hiker Community • 2025
                </footer>
            </div>
        </div>
    );
}