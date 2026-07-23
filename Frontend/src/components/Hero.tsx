import React from 'react';
import { usePortfolioQuery } from '../hooks/usePortfolio';

const Hero: React.FC = () => {
  const { data, isLoading } = usePortfolioQuery();
  const profile = data?.profile;
  const projectsCount = data?.projects ? Math.max(10, data.projects.length) : 10;

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = profile?.resumeUrl || '/Akash.Malvi.pdf';
    link.download = 'Akash_Malvi_FullStack_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parsedSocials = (() => {
    try {
      if (profile?.socialLinks) {
        return typeof profile.socialLinks === 'string' 
          ? JSON.parse(profile.socialLinks) 
          : profile.socialLinks;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      github: "https://github.com/malviakash7666",
      linkedin: "https://www.linkedin.com/in/akash-malvi-50313b281",
      email: "malviakash7666@gmail.com",
    };
  })();

  const defaultSubtext = "Junior Full Stack Developer building scalable web applications using React.js, Node.js, TypeScript, PostgreSQL and modern cloud technologies.";

  if (isLoading) {
    return (
      <section className="relative w-full min-h-screen flex items-center justify-center bg-[#030014] overflow-hidden pt-28 pb-16 transition-colors duration-500">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-7 text-left space-y-7">
              {/* Badge skeleton */}
              <div className="h-7 w-48 bg-slate-800/60 rounded-full animate-pulse border border-slate-700/30" />
              
              {/* Headline skeleton */}
              <div className="space-y-3">
                <div className="h-14 w-3/4 bg-slate-800/60 rounded-2xl animate-pulse" />
                <div className="h-14 w-1/2 bg-slate-800/60 rounded-2xl animate-pulse" />
              </div>

              {/* Subtext skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-800/60 rounded-lg animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-800/60 rounded-lg animate-pulse" />
                <div className="h-4 w-2/3 bg-slate-800/60 rounded-lg animate-pulse" />
              </div>

              {/* CTA Buttons skeleton */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="h-12 w-36 bg-slate-800/60 rounded-xl animate-pulse" />
                <div className="h-12 w-44 bg-slate-800/60 rounded-xl animate-pulse" />
                <div className="h-12 w-32 bg-slate-800/60 rounded-xl animate-pulse" />
              </div>

              {/* Achievement Stats Grid skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-900/60 border border-slate-850 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 rounded-3xl blur-2xl transform scale-95" />
              <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 animate-pulse">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                  </div>
                  <div className="h-3 w-28 bg-slate-850 rounded" />
                </div>
                {/* Profile row */}
                <div className="flex items-center gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-28 bg-slate-800 rounded" />
                    <div className="h-3 w-36 bg-slate-850 rounded" />
                  </div>
                </div>
                {/* Code box */}
                <div className="h-32 bg-slate-950/80 border border-slate-850 rounded-2xl" />
                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <div className="h-8 w-20 bg-slate-800 rounded-lg" />
                  <div className="h-8 w-24 bg-slate-800 rounded-lg" />
                  <div className="h-8 w-20 bg-slate-800 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#030014] overflow-hidden pt-28 pb-16 transition-colors duration-500">
      
      {/* Background radial glow & grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & CTAs (7 columns) */}
          <div className="lg:col-span-7 text-left space-y-7">
            
            {/* Status / Role Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-900/40 text-[#818cf8] text-xs font-bold font-sans tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">{profile?.name || "Akash Malvi"}</span> 👋
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {defaultSubtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* 1. View Projects */}
              <a
                href="#projects"
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-900/20 active:scale-95 duration-200 text-sm"
              >
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* 2. Download Resume */}
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-750 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2 active:scale-95 duration-200 text-sm cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </button>

              {/* 3. Contact Me */}
              <a
                href="#contact"
                className="px-6 py-3.5 bg-transparent text-slate-300 font-bold rounded-xl border border-slate-800 hover:border-slate-700 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 duration-200 text-sm cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h-3a2 2 0 01-2-2V7a2 2 0 012-2h3M9 19a2 2 0 002 2h3a2 2 0 002-2m-8-2h8" />
                </svg>
                Contact Me
              </a>
            </div>

            {/* Achievement Stats Grid (4 Pills) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
              <div className="p-3.5 bg-slate-900/60 border border-slate-850 rounded-xl flex flex-col justify-center items-start hover:border-purple-500/30 transition-all">
                <span className="text-xl font-black text-white">{projectsCount}+</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Projects Built</span>
              </div>
              
              <div className="p-3.5 bg-slate-900/60 border border-slate-850 rounded-xl flex flex-col justify-center items-start hover:border-purple-500/30 transition-all">
                <span className="text-base font-bold text-purple-400">Full Stack</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Development</span>
              </div>

              <div className="p-3.5 bg-slate-900/60 border border-slate-850 rounded-xl flex flex-col justify-center items-start hover:border-purple-500/30 transition-all">
                <span className="text-base font-bold text-indigo-400">React + Node</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Core Stack</span>
              </div>

              <div className="p-3.5 bg-slate-900/60 border border-slate-850 rounded-xl flex flex-col justify-center items-start hover:border-purple-500/30 transition-all">
                <span className="text-base font-bold text-emerald-400">Open For Roles</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Full-Time</span>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Developer Illustration Card (5 columns) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Glowing background halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-3xl blur-2xl transform scale-95" />

            {/* Glassmorphic Developer Code Window */}
            <div className="relative w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">akash_developer.ts</span>
                <div className="w-4 h-4 text-purple-400 opacity-60">⚡</div>
              </div>

              {/* Code Snippet Header */}
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{profile?.name || "Akash Malvi"}</h3>
                  <p className="text-xs text-purple-400 font-mono font-medium">Full Stack Software Engineer</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">React.js • Node.js • PostgreSQL</p>
                </div>
              </div>

              {/* Code Editor Box */}
              <div className="bg-[#030014]/90 rounded-2xl p-4 font-mono text-xs text-left space-y-2 border border-slate-800/80">
                <div className="text-purple-400"><span className="text-indigo-400">const</span> developer <span className="text-pink-400">=</span> &#123;</div>
                <div className="pl-4 text-slate-300">name: <span className="text-emerald-400">'Akash Malvi'</span>,</div>
                <div className="pl-4 text-slate-300">role: <span className="text-amber-300">'Full Stack Developer'</span>,</div>
                <div className="pl-4 text-slate-300">skills: [<span className="text-cyan-300">'React'</span>, <span className="text-cyan-300">'Node'</span>, <span className="text-cyan-300">'TypeScript'</span>, <span className="text-cyan-300">'Postgres'</span>],</div>
                <div className="pl-4 text-slate-300">status: <span className="text-emerald-400">'Ready for Impact'</span></div>
                <div className="text-purple-400">&#125;;</div>
              </div>

              {/* Floating Tech Badges Row */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5 animate-float-slow">
                  <span>⚛️</span> React.js
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 animate-float-slow-delayed">
                  <span>🟢</span> Node.js
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold flex items-center gap-1.5 animate-float-slow">
                  <span>📘</span> TypeScript
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 animate-float-slow-delayed">
                  <span>🐘</span> PostgreSQL
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;