import React from 'react';

interface LearningItem {
  title: string;
  tagline: string;
  icon: string;
  badge: string;
  color: string;
}

const exploringTopics: LearningItem[] = [
  {
    title: 'Docker & CI/CD',
    tagline: 'Containerizing full-stack microservices & automating build/test deployment pipelines with GitHub Actions.',
    icon: '🐳',
    badge: 'DevOps & Automation',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
  },
  {
    title: 'AWS Cloud Deployment',
    tagline: 'Hosting scalable architectures on AWS EC2, S3, CloudFront, RDS, and configuring production SSL/DNS.',
    icon: '☁️',
    badge: 'Cloud Infrastructure',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
  },
  {
    title: 'LangChain',
    tagline: 'Building intelligent AI agents, prompt pipelines, document embeddings, and context-aware RAG workflows.',
    icon: '🦜',
    badge: 'AI Systems',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
  },
  {
    title: 'LLM Applications',
    tagline: 'Integrating Large Language Models into web applications for automated analysis, scoring, and smart search.',
    icon: '🤖',
    badge: 'Generative AI',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
  },
];

const CurrentlyLearning: React.FC = () => {
  return (
    <section id="learning" className="py-24 bg-[#030014] transition-colors duration-500 overflow-hidden relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="space-y-3 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] font-extrabold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Continuous Growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Currently Exploring
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploringTopics.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-850 p-6 rounded-3xl backdrop-blur-md text-left flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} border flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-3">
                  {item.title}
                </h3>

                {/* Tagline */}
                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {item.tagline}
                </p>
              </div>

              {/* Status pill */}
              <div className="pt-4 border-t border-slate-850/60 flex items-center justify-between text-[11px] font-mono text-purple-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  Active Study
                </span>
                <span className="text-slate-400">2026 Focus</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CurrentlyLearning;
