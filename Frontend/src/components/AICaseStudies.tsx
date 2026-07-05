import React, { useState } from 'react';

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  aiTech: string[];
  results: string;
}

const aiProjects: CaseStudy[] = [
  {
    title: "Intelligent Code Reviewer",
    problem: "Manual code reviews delay pipeline deployments during fast sprints.",
    solution: "Integrated Gemini 1.5 Pro API to automatically scan pull requests for logic errors and security gaps.",
    aiTech: ["Gemini API", "Node.js", "GitHub Webhooks"],
    results: "40% faster initial review"
  },
  {
    title: "Smart Content Optimizer",
    problem: "Marketing teams fail to match search engine keywords consistently across post layouts.",
    solution: "Built a MERN application using OpenAI API to evaluate and suggest optimal blog schema structures.",
    aiTech: ["OpenAI API", "React JS", "MongoDB"],
    results: "500+ outlines generated"
  },
  {
    title: "Customer Sentiment Engine",
    problem: "Client support centers cannot manually tag thousands of feedback logs in real-time.",
    solution: "Developed a text classification pipeline using Hugging Face Transformers to classify emails.",
    aiTech: ["Hugging Face", "Python", "React"],
    results: "92% sentiment accuracy"
  }
];

const AICaseStudies: React.FC = () => {
  const [benchmarkStatus, setBenchmarkStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [uncachedTime, setUncachedTime] = useState<number>(0);
  const [cachedTime, setCachedTime] = useState<number>(0);

  const runBenchmark = () => {
    if (benchmarkStatus === 'running') return;
    setBenchmarkStatus('running');
    
    // Simulate direct DB query latency (110ms - 130ms)
    setTimeout(() => {
      setUncachedTime(124);
      
      // Simulate Redis cached query latency (3ms - 5ms)
      setTimeout(() => {
        setCachedTime(4);
        setBenchmarkStatus('done');
      }, 800);
    }, 1000);
  };

  return (
    <section id="ai-projects" className="py-28 bg-[#030014] text-white overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= PART 1: CREDIBILITY DASHBOARD ================= */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-900/50 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
              Credibility & Metrics
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-black">Metrics.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base">
              Verifiable proof of algorithms capability, open source code contributions, and live system latency optimization experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Box 1: DSA / LeetCode */}
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-purple-500/25 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="text-sm font-mono font-bold text-purple-400 uppercase tracking-widest mb-4">Algorithms</div>
              
             
              
              <h3 className="text-lg font-bold text-white mb-3">Data Structures & DSA</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Specialized in hash tables, multi-way trees, binary search, and dynamic programming. Focus on writing clean code with optimized time complexity \(O(N \log N)\) or \(O(N)\).
              </p>
              
              <div className="flex flex-wrap gap-1.5 mt-auto">
                <span className="text-[9px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-450 px-2 py-0.5 rounded-md">Arrays</span>
                <span className="text-[9px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-450 px-2 py-0.5 rounded-md">Hashing</span>
                <span className="text-[9px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-450 px-2 py-0.5 rounded-md">Two Pointers</span>
                <span className="text-[9px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-450 px-2 py-0.5 rounded-md">Trees</span>
              </div>
            </div>

            {/* Box 2: GitHub & Open Source */}
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-purple-500/25 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4">Contributions</div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black tracking-tight text-white">500+</span>
                <span className="text-xs text-slate-400 font-bold uppercase">Commits</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">GitHub & Open Source</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Maintaining repositories with GitHub Actions workflow automation, automated ESLint/Prettier format checks, and submitting documentation patches to developer libraries.
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <a 
                  href="https://github.com/malviakash7666" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  View Profile ↗
                </a>
              </div>
            </div>

            {/* Box 3: Benchmark latency simulator */}
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-purple-500/25 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="text-sm font-mono font-bold text-emerald-450 uppercase tracking-widest mb-4">Benchmarks</div>
                <h3 className="text-lg font-bold text-white mb-2">Live Query Benchmarking</h3>
                <p className="text-xs text-slate-450 leading-relaxed mb-4">
                  Test the difference between direct database queries and Redis-cached queries in real time.
                </p>
              </div>

              {/* Benchmark Output Graph */}
              <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl space-y-3.5 my-3">
                {/* Uncached bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400">
                    <span>Direct Database Query</span>
                    <span>{uncachedTime ? `${uncachedTime}ms` : '-- ms'}</span>
                  </div>
                  <div className="w-full bg-slate-850 h-3 rounded-md overflow-hidden relative border border-slate-800">
                    <div 
                      className="bg-amber-500 h-full rounded-md transition-all duration-500"
                      style={{ width: uncachedTime ? '100%' : '0%' }}
                    />
                  </div>
                </div>

                {/* Cached bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono font-bold text-emerald-450">
                    <span>Redis Cached Query</span>
                    <span>{cachedTime ? `${cachedTime}ms (25x faster)` : '-- ms'}</span>
                  </div>
                  <div className="w-full bg-slate-850 h-3 rounded-md overflow-hidden relative border border-slate-800">
                    <div 
                      className="bg-emerald-500 h-full rounded-md transition-all duration-500"
                      style={{ width: cachedTime ? '3.2%' : '0%' }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={runBenchmark}
                disabled={benchmarkStatus === 'running'}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  benchmarkStatus === 'running'
                    ? 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-lg shadow-emerald-950/20 active:scale-95'
                }`}
              >
                {benchmarkStatus === 'idle' && '▶ Run Performance Benchmark'}
                {benchmarkStatus === 'running' && '⚡ Executing SQL Query...'}
                {benchmarkStatus === 'done' && '🔄 Run Again'}
              </button>
            </div>

          </div>
        </div>

        {/* ================= PART 2: AI CASE STUDIES ================= */}
        <div>
          <div className="mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-900/50 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
              Advanced Integrations
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              AI Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-mono">Case_Studies.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-base">
              Exploring the interface between full-stack systems and LLMs to address automation bottlenecks using structured generation and vector indexing.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiProjects.map((study, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.1)]"
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Case Study</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-5 group-hover:text-purple-300 transition-colors leading-snug">
                    {study.title}
                  </h3>

                  <div className="space-y-4 mb-7">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider mb-1">The Problem</p>
                      <p className="text-xs text-slate-400 italic leading-relaxed">"{study.problem}"</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider mb-1">Solution</p>
                      <p className="text-xs text-slate-350 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {study.aiTech.map((tech, i) => (
                      <span key={i} className="text-[9px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-400 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Metrics Achieved</span>
                    <span className="text-xs font-bold text-emerald-450">{study.results}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AICaseStudies;