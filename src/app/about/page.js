"use client";
import React from 'react';
import Head from 'next/head';

export default function AboutUs() {
    return (
        <div className="min-h-screen relative font-sans text-white overflow-x-hidden">
            <Head>
                <title>About Us | Akyat Tiwala</title>
            </Head>

            {/* --- BACKGROUND PHOTOGRAPHY --- */}
            <div 
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2070')`,
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[3px]" />
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="relative z-10">
                
                {/* GLASS NAVIGATION */}
                <nav className="p-6 flex justify-between items-center sticky top-0 backdrop-blur-md bg-black/20 border-b border-white/10 shadow-2xl">
                    <a href="/" className="font-black text-2xl tracking-tighter uppercase italic text-white leading-none">
                        AKYAT <span className="text-orange-500 underline decoration-white underline-offset-4 font-black tracking-tighter uppercase italic">TIWALA</span>
                    </a>
                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
                        <a href="/" className="hover:text-orange-500 transition underline underline-offset-4 decoration-white">HOME</a>
                        <a href="/stories" className="hover:text-orange-500 transition underline underline-offset-4 decoration-white">KWENTONG BUNDOK</a>
                    </div>
                </nav>

                {/* HERO HEADER */}
                <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
                    <p className="text-orange-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4">Establishing Trust</p>
                    <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 drop-shadow-2xl">
                        ABOUT THE MISSION
                    </h2>
                    <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mb-8" />
                    <p className="text-white font-medium italic text-xl md:text-2xl leading-relaxed">
                        AKYAT TIWALA was created by <span className="text-white underline decoration-orange-500 font-black tracking-tight">Jacob Cornejo</span> to empower independent hikers.
                    </p>
                </header>

                <main className="max-w-6xl mx-auto px-6 pb-32">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed mb-8">
                        
                        {/* THE AIM (Full Width on mobile, span 2 on md) */}
                        <div className="md:col-span-2 backdrop-blur-2xl bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3.5rem] shadow-2xl flex flex-col items-center text-center">
                            <span className="text-orange-500 font-black text-xs uppercase mb-4 tracking-[0.3em]">The Core Purpose</span>
                            <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter underline decoration-white underline-offset-8">THE AIM</h3>
                            <p className="text-white/80 text-lg md:text-xl font-medium italic leading-loose">
                                &quot;To help DIY hikers by providing clear and organized information that makes hike planning easier, especially for hikes in Nasugbu.&quot;
                            </p>
                        </div>

                        {/* WHAT Section */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl group hover:bg-white/10 transition-all duration-500">
                            <div className="text-orange-500 font-black text-[10px] uppercase mb-4 tracking-widest italic opacity-50">Offerings</div>
                            <h4 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">WHAT WE DO</h4>
                            <p className="text-white/70 text-sm font-medium italic leading-relaxed">
                                Practical tools such as step-by-step hike planning, access to local guide information, and a space for sharing real hiking experiences through community posts. We focus on preparation, awareness, and responsibility.
                            </p>
                        </div>

                        {/* WHO Section */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl group hover:bg-white/10 transition-all duration-500">
                            <div className="text-orange-500 font-black text-[10px] uppercase mb-4 tracking-widest italic opacity-50">Audience</div>
                            <h4 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">WHO IT&apos;S FOR</h4>
                            <p className="text-white/70 text-sm font-medium italic leading-relaxed">
                                This platform is for DIY hikers, first-time climbers, local guides, and individuals looking for shared hiking experiences and local insights.
                            </p>
                        </div>

                        {/* WHERE Section */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl group hover:bg-white/10 transition-all duration-500">
                            <div className="text-orange-500 font-black text-[10px] uppercase mb-4 tracking-widest italic opacity-50">Location</div>
                            <h4 className="text-2xl font-black uppercase italic mb-4 tracking-tighter text-white">WHERE WE ARE</h4>
                            <p className="text-white/70 text-sm font-medium italic leading-relaxed">
                                Focused on Nasugbu and nearby hiking areas, with information contributed by the community and verified local guides.
                            </p>
                        </div>

                        {/* WHEN Section */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl group hover:bg-white/10 transition-all duration-500 text-left">
                            <div className="text-orange-500 font-black text-[10px] uppercase mb-4 tracking-widest italic opacity-50">Utility</div>
                            <h4 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">WHEN TO USE IT</h4>
                            <p className="text-white/70 text-sm font-medium italic leading-relaxed">
                                Use Akyat Tiwala during your planning stage and as a reference before, during, and after hiking activities to ensure you stay on budget and on trail.
                            </p>
                        </div>

                    </div>

                    {/* WHY Section (Wide Background Card) */}
                    <div className="backdrop-blur-2xl bg-emerald-950/40 border border-white/10 p-12 md:p-20 rounded-[4rem] text-center mb-8 shadow-3xl flex flex-col items-center">
                        <span className="text-orange-400 font-black text-xs uppercase mb-6 tracking-[0.5em] italic opacity-50 leading-none">THE PROBLEM</span>
                        <h4 className="text-2xl md:text-4xl font-black uppercase italic mb-8 tracking-tighter">WHY WE EXIST</h4>
                        <p className="text-white/70 text-lg font-medium italic leading-loose max-w-3xl">
                            &quot;Many people want to hike independently but find it difficult to access clear, reliable, and organized information in one place.&quot;
                        </p>
                    </div>

                    {/* --- SAFETY DISCLAIMER (CRUCIAL) --- */}
                    <section className="bg-orange-500 text-black p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-orange-500/20 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="text-5xl shrink-0 opacity-100 italic font-black uppercase border-b-8 border-black leading-none pb-2">BEWARE</div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-black uppercase italic tracking-widest">Responsibility First</h4>
                                <p className="text-base font-bold italic leading-relaxed tracking-tight">
                                    This website does not replace personal responsibility. Users are expected to prepare properly, follow local rules, and ensure their own safety at all times.
                                </p>
                            </div>
                        </div>
                    </section>

                    <p className="mt-20 text-center text-white/20 text-[10px] font-black uppercase tracking-[1em]">Akyat Tiwala • Para sa lokal.</p>
                </main>
            </div>
        </div>
    );
}