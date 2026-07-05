import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-white dark:bg-[#030014] overflow-hidden transition-colors duration-500">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Profile Card (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-[2.5rem] opacity-10 blur-2xl pointer-events-none" />
            
            <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl glow-purple transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Akash Mallvi</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mt-1.5 font-bold uppercase tracking-wider">Full Stack Engineer</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Academic Background */}
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 text-lg">
                    🎓
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Academic Background</h4>
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold mt-0.5">BCA Graduate</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Class of 2026 • Nagpur, India</p>
                  </div>
                </div>

                {/* Professional Journey */}
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 text-lg">
                    💼
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Professional Journey</h4>
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold mt-0.5">Full Stack Development Intern</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Mastering MERN & System Architecture</p>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30 text-center">
                  <p className="text-3xl font-black text-purple-600 dark:text-purple-400">10+</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Projects</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 text-center">
                  <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">2026</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Graduation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Focus (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
                Core Specialization
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-black">Focus.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-3 max-w-xl">
                I design and build applications with an engineering mindset, prioritizing scalability, low-latency, and system integrity.
              </p>
            </div>

            {/* Structured Engineering Focus Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Card 1: Scalable Backend Systems */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-4 font-bold group-hover:scale-110 transition-transform">
                  ⚙️
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">Scalable Backend Systems</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Structuring robust REST/GraphQL APIs, handling asynchronous execution queues, database pool clustering, and service segregation.
                </p>
              </div>

              {/* Card 2: Real-time Applications */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg mb-4 font-bold group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">Real-Time Applications</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Building full-duplex socket connections, active event emitters, chat engines, and live push notifications with state synchronization.
                </p>
              </div>

              {/* Card 3: API Optimization & Caching */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-950/50 text-yellow-605 dark:text-yellow-400 flex items-center justify-center text-lg mb-4 font-bold group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">API Optimization & Caching</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Optimizing database queries, managing Redis in-memory cache keys, indexing tables, and utilizing CDN caching.
                </p>
              </div>

              {/* Card 4: System Design Thinking */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 flex items-center justify-center text-lg mb-4 font-bold group-hover:scale-110 transition-transform">
                  📐
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">System Design Thinking</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Containerizing apps with Docker, setting up reverse proxy routing, rate-limiting, and managing data modeling transactions.
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-purple-500/10 active:scale-95 duration-200"
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-slate-800 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all active:scale-95 duration-200"
              >
                View Portfolio
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;