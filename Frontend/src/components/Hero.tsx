import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [simMode, setSimMode] = useState<'hit' | 'miss'>('hit');
  const [simStep, setSimStep] = useState<'idle' | 'client-to-api' | 'api-to-redis' | 'api-to-db' | 'redis-to-api' | 'db-to-api' | 'api-to-client' | 'done'>('idle');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const triggerSimulation = () => {
    if (simStep !== 'idle') return;
    
    setLatency(null);
    setSimStep('client-to-api');

    // Steps timing
    setTimeout(() => {
      setSimStep('api-to-redis');
      
      setTimeout(() => {
        if (simMode === 'hit') {
          setSimStep('redis-to-api');
          setTimeout(() => {
            setSimStep('api-to-client');
            setTimeout(() => {
              setSimStep('done');
              setLatency(2); // 2ms Redis hit
              setTimeout(() => setSimStep('idle'), 3000);
            }, 500);
          }, 400);
        } else {
          // Miss flow
          setTimeout(() => {
            setSimStep('api-to-db');
            setTimeout(() => {
              setSimStep('db-to-api');
              setTimeout(() => {
                setSimStep('api-to-client');
                setTimeout(() => {
                  setSimStep('done');
                  setLatency(48); // 48ms DB query
                  setTimeout(() => setSimStep('idle'), 3000);
                }, 500);
              }, 600);
            }, 600);
          }, 400);
        }
      }, 500);
    }, 500);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Akash.Malvi.pdf'; // Correct filepath from public directory
    link.download = 'Akash_Malvi_FullStack_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030014] overflow-hidden pt-24 pb-16 transition-colors duration-500">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copywriting Area (7 columns) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Actively Interviewing
            </div>

            {/* Role Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Full Stack Developer <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 font-black">
                (React + Node.js)
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-slate-500 dark:text-slate-400 mt-2 font-mono">
                Scalable Systems & Backend Enthusiast
              </div>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              I build scalable web applications using <span className="font-semibold text-slate-900 dark:text-white">Redis</span>, <span className="font-semibold text-slate-900 dark:text-white">Docker</span>, and <span className="font-semibold text-slate-900 dark:text-white">real-time architectures</span>. Focused on resolving bottlenecks, database concurrency, and writing clean, testable code.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-center transition-all shadow-xl shadow-purple-500/20 active:scale-95 duration-200"
              >
                View Projects
              </a>
              <button
                onClick={handleDownloadResume}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center justify-center gap-2 active:scale-95 duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 max-w-lg border-t border-slate-200 dark:border-slate-800/80 pt-6">
              <div>
                <p className="text-3xl font-extrabold text-slate-950 dark:text-white">10+</p>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Projects Built</p>
              </div>
             
              <div>
                <p className="text-3xl font-extrabold text-slate-950 dark:text-white">2.0ms</p>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Cache Latency</p>
              </div>
            </div>

          </div>

          {/* Interactive Simulator (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-[2.5rem] opacity-10 blur-2xl pointer-events-none" />
            
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-[2.5rem] shadow-2xl overflow-hidden glow-purple">
              
              {/* Simulator Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Latency Simulator</span>
                </div>
                
                {/* Simulator Mode Selector */}
                <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                  <button
                    onClick={() => setSimMode('hit')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      simMode === 'hit'
                        ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Redis Hit
                  </button>
                  <button
                    onClick={() => setSimMode('miss')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      simMode === 'miss'
                        ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Redis Miss
                  </button>
                </div>
              </div>

              {/* Architecture Node Visualization */}
              <div className="relative py-8 flex flex-col items-center justify-between min-h-[300px]">
                
                {/* Ping Dot Animations */}
                <AnimatePresence>
                  {simStep === 'client-to-api' && (
                    <motion.div
                      initial={{ y: -80, opacity: 1 }}
                      animate={{ y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] z-20"
                    />
                  )}
                  {simStep === 'api-to-redis' && (
                    <motion.div
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: 80, y: 35 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308] z-20"
                    />
                  )}
                  {simStep === 'redis-to-api' && (
                    <motion.div
                      initial={{ x: 80, y: 35, opacity: 1 }}
                      animate={{ x: 0, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] z-20"
                    />
                  )}
                  {simStep === 'api-to-db' && (
                    <motion.div
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: -80, y: 35 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b] z-20"
                    />
                  )}
                  {simStep === 'db-to-api' && (
                    <motion.div
                      initial={{ x: -80, y: 35, opacity: 1 }}
                      animate={{ x: 0, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] z-20"
                    />
                  )}
                  {simStep === 'api-to-client' && (
                    <motion.div
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -80 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] z-20"
                    />
                  )}
                </AnimatePresence>

                {/* Node 1: Client */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xl shadow-inner">
                    💻
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 mt-1.5 uppercase">Client (React)</span>
                </div>

                {/* Connecting Lines (svg path overlays) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-20" fill="none" viewBox="0 0 300 300">
                  {/* Vertical client-api line */}
                  <line x1="150" y1="60" x2="150" y2="140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  {/* API -> DB (Left) */}
                  <line x1="150" y1="140" x2="70" y2="210" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  {/* API -> Redis (Right) */}
                  <line x1="150" y1="140" x2="230" y2="210" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>

                {/* Middle and Bottom Node Grid */}
                <div className="w-full flex justify-between px-2 items-center mt-6">
                  
                  {/* Node 3: DB (PostgreSQL) - Bottom Left */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-all duration-300 ${
                      simStep === 'api-to-db' || simStep === 'db-to-api'
                        ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}>
                      🗄️
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 mt-1.5 uppercase">PostgreSQL</span>
                  </div>

                  {/* Node 2: Server (Node.js API) - Middle Center */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl transition-all duration-300 ${
                      simStep !== 'idle' && simStep !== 'done'
                        ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}>
                      🟢
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 mt-1.5 uppercase">Node.js API</span>
                  </div>

                  {/* Node 4: Redis (Cache) - Bottom Right */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-all duration-300 ${
                      simStep === 'api-to-redis' || simStep === 'redis-to-api'
                        ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                        : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}>
                      ⚡
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 mt-1.5 uppercase">Redis Cache</span>
                  </div>

                </div>

              </div>

              {/* Simulation Controller */}
              <div className="mt-4 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={triggerSimulation}
                  disabled={simStep !== 'idle'}
                  className={`w-full py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 ${
                    simStep !== 'idle'
                      ? 'bg-slate-100 dark:bg-slate-950 text-slate-400 cursor-not-allowed border border-slate-200/50 dark:border-slate-800/50'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:scale-[1.02] shadow-md hover:shadow-purple-500/10 active:scale-98'
                  }`}
                >
                  {simStep === 'idle' ? '⚡ Simulate Request' : 'Simulating Cache Flow...'}
                </button>

                {/* Simulation Output Dashboard */}
                <div className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-850 p-4 rounded-2xl flex flex-col gap-2.5 min-h-[90px]">
                  
                  {/* Status Indicator */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Simulation Status:</span>
                    <span className="font-mono font-bold">
                      {simStep === 'idle' && <span className="text-slate-400">READY</span>}
                      {simStep === 'client-to-api' && <span className="text-purple-500 animate-pulse">Request Sent</span>}
                      {simStep === 'api-to-redis' && <span className="text-yellow-500">Checking Redis...</span>}
                      {simStep === 'redis-to-api' && <span className="text-green-500 font-black">Redis HIT!</span>}
                      {simStep === 'api-to-db' && <span className="text-amber-500 font-semibold">Redis MISS. Querying DB...</span>}
                      {simStep === 'db-to-api' && <span className="text-emerald-500">DB Response Returned</span>}
                      {simStep === 'api-to-client' && <span className="text-purple-400">Returning response</span>}
                      {simStep === 'done' && <span className="text-green-500">COMPLETED</span>}
                    </span>
                  </div>

                  {/* Latency Meter */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Response Latency:</span>
                    <span className="font-mono font-extrabold text-sm">
                      {latency !== null ? (
                        <span className={simMode === 'hit' ? 'text-green-500' : 'text-amber-500'}>
                          {latency} ms {simMode === 'hit' ? '(98% Faster)' : '(Uncached)'}
                        </span>
                      ) : (
                        <span className="text-slate-400">-- ms</span>
                      )}
                    </span>
                  </div>

                  {/* Visual Caching Benefit Info */}
                  {latency !== null && (
                    <div className="text-[10px] text-center font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 py-1 rounded-lg border border-purple-100/50 dark:border-purple-900/40">
                      {simMode === 'hit' 
                        ? '💡 Redis bypassed PostgreSQL to return results instantly.' 
                        : '💡 Bypassing cache forces database disk I/O (Slower latency).'}
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;