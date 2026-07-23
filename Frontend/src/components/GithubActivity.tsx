import React from 'react';

interface RepoItem {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  url: string;
}

const featuredRepos: RepoItem[] = [
  {
    name: 'HelpFlow',
    description: 'Clean workflow automation, helpdesk ticketing, and support request tracking dashboard.',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: 8,
    url: 'https://github.com/malviakash7666/HelpFlow',
  },
  {
    name: 'Amrutam-CareSync-Telemedicine',
    description: 'Telemedicine portal connecting patients with doctors, featuring appointment scheduling and portal dashboard.',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: 12,
    url: 'https://github.com/malviakash7666/Amrutam-CareSync---Telemedicine-Portal',
  },
  {
    name: 'E-Cart',
    description: 'Robust e-commerce cart, checkout flow, product catalog, and payment integration application.',
    language: 'JavaScript',
    languageColor: 'bg-amber-400',
    stars: 10,
    url: 'https://github.com/malviakash7666/E-Cart',
  },
  {
    name: 'Akash_Portfolio',
    description: 'Modern developer portfolio website with React, Node.js, and PostgreSQL backend.',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: 8,
    url: 'https://github.com/malviakash7666/Akash_Portfolio',
  },
];

const GithubActivity: React.FC = () => {
  return (
    <section id="github" className="py-24 bg-[#030014] transition-colors duration-500 overflow-hidden relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              GitHub Activity
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>

          <a
            href="https://github.com/malviakash7666"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer backdrop-blur-md flex items-center gap-2 text-xs"
          >
            <svg className="w-4 h-4 fill-current text-purple-400" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>Visit @malviakash7666</span>
          </a>
        </div>

        {/* GitHub Stats & Repos Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: GitHub Profile Stats Summary (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-850 p-7 rounded-3xl backdrop-blur-md text-left flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 text-2xl font-bold">
                  🐙
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Akash Malvi</h3>
                  <p className="text-xs font-mono text-purple-400">@malviakash7666</p>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Active open-source contributor building full-stack applications with clean code principles, modular APIs, and responsive design.
              </p>

              {/* Stats pill list */}
              <div className="space-y-3">
                <div className="p-3 bg-[#090b16] border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Total Repositories</span>
                  <span className="text-sm font-bold text-white font-mono">15+</span>
                </div>
                <div className="p-3 bg-[#090b16] border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Primary Languages</span>
                  <span className="text-xs font-bold text-purple-400 font-mono">TS, JS, React</span>
                </div>
                <div className="p-3 bg-[#090b16] border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Contributions</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">Consistent / Active</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/malviakash7666?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <span>View Repositories</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Right: Featured Repositories Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/60 border border-slate-850 p-6 rounded-3xl backdrop-blur-md text-left flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {repo.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-900/40">
                      Public
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-850/60 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.languageColor}`} />
                    <span>{repo.language}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default GithubActivity;
