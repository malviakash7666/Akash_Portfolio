import React from 'react';
import { usePortfolioQuery } from '../hooks/usePortfolio';

interface Skill {
  name: string;
  level?: string;
  category: string;
}

const defaultCategorizedSkills: Record<string, string[]> = {
  Frontend: [
    'React.js',
    'TypeScript',
    'JavaScript ES6+',
    'Redux Toolkit',
    'Tailwind CSS',
    'HTML5',
    'CSS3',
  ],
  Backend: [
    'Node.js',
    'Express.js',
    'REST APIs',
    'JWT Authentication',
  ],
  Database: [
    'PostgreSQL',
    'MongoDB',
    'Sequelize',
  ],
  DevOps: [
    'Docker',
    'AWS',
    'GitHub Actions',
    'CI/CD',
  ],
};

const categoryMeta: Record<string, { title: string; icon: React.ReactNode; color: string }> = {
  Frontend: {
    title: 'Frontend',
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  Backend: {
    title: 'Backend',
    color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
    icon: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  Database: {
    title: 'Database',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  DevOps: {
    title: 'DevOps & Tools',
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
    icon: (
      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
};

const Skills: React.FC = () => {
  const { data, isLoading } = usePortfolioQuery();
  const dbSkills = data?.skills || [];

  // Merge DB skills with default categories
  const categorizedSkills = (() => {
    if (dbSkills.length === 0) return defaultCategorizedSkills;

    const result: Record<string, string[]> = {
      Frontend: [...defaultCategorizedSkills.Frontend],
      Backend: [...defaultCategorizedSkills.Backend],
      Database: [...defaultCategorizedSkills.Database],
      DevOps: [...defaultCategorizedSkills.DevOps],
    };

    dbSkills.forEach((skill) => {
      let cat = skill.category;
      if (cat === 'Tools' || cat === 'Tools & Others') cat = 'DevOps';
      if (cat === 'Language') {
        cat = skill.name.includes('Script') ? 'Frontend' : 'Backend';
      }

      if (result[cat]) {
        if (!result[cat].includes(skill.name)) {
          result[cat].push(skill.name);
        }
      } else {
        result['DevOps'].push(skill.name);
      }
    });

    return result;
  })();

  const categoriesOrder = ['Frontend', 'Backend', 'Database', 'DevOps'] as const;

  return (
    <section id="skills" className="py-24 bg-[#030014] transition-colors duration-500 overflow-hidden relative">
      
      {/* Glow shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="space-y-3 mb-16 text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Skills & Tech Stack
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Loading / Skeleton State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoriesOrder.map((catKey) => {
              const meta = categoryMeta[catKey];
              return (
                <div
                  key={catKey}
                  className="bg-slate-900/60 border border-slate-850 p-6 rounded-3xl shadow-xl flex flex-col justify-between text-left backdrop-blur-md animate-pulse"
                >
                  <div>
                    {/* Category Header Skeleton */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-center" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-24 bg-slate-800 rounded" />
                        <div className="h-3 w-16 bg-slate-850 rounded" />
                      </div>
                    </div>

                    {/* Skills Pills Skeletons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {[...Array(6)].map((_, idx) => (
                        <div
                          key={idx}
                          className="h-8 w-20 bg-slate-850 rounded-xl border border-slate-800/80"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom indicator Skeleton */}
                  <div className="pt-6 mt-4 border-t border-slate-850/50 flex items-center justify-between">
                    <div className="h-3 w-12 bg-slate-850 rounded" />
                    <div className="h-3 w-16 bg-slate-850 rounded" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 4-Column Category Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoriesOrder.map((catKey) => {
              const meta = categoryMeta[catKey];
              const skillList = categorizedSkills[catKey] || [];

              return (
                <div
                  key={catKey}
                  className="bg-slate-900/60 border border-slate-850 p-6 rounded-3xl shadow-xl hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between text-left backdrop-blur-md group"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.color} border flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        {meta.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-wide">
                          {meta.title}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-400">
                          {skillList.length} Technologies
                        </span>
                      </div>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skillList.map((skillName, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#090b16] text-slate-300 border border-slate-800/80 hover:border-purple-500/50 hover:text-white hover:bg-purple-950/30 transition-all duration-200 cursor-default"
                        >
                          {skillName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subtle bottom indicator */}
                  <div className="pt-6 mt-4 border-t border-slate-850/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Category</span>
                    <span className="uppercase tracking-widest">{catKey}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;