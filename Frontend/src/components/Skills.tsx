import React from 'react';
import skillsData from "../utils/skills.json";

interface Skill {
  name: string;
  level: string;
  category: string;
}

const tierMeta = {
  Frontend: {
    title: 'Frontend Client',
    description: 'Interface & User Experience',
    icon: '💻',
    bgClass: 'bg-blue-500/5 border-blue-500/20 text-blue-500',
    dotClass: 'bg-blue-500',
  },
  Backend: {
    title: 'API & Backend Server',
    description: 'Business Logic & Routing',
    icon: '⚙️',
    bgClass: 'bg-green-500/5 border-green-500/20 text-green-500',
    dotClass: 'bg-green-500',
  },
  DevOps: {
    title: 'Caching & Infrastructure',
    description: 'Performance & Containers',
    icon: '⚡',
    bgClass: 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500',
    dotClass: 'bg-yellow-500',
  },
  Database: {
    title: 'Storage & Database',
    description: 'Persistent Data Modeling',
    icon: '🗄️',
    bgClass: 'bg-purple-500/5 border-purple-500/20 text-purple-500',
    dotClass: 'bg-purple-500',
  }
};

const Skills: React.FC = () => {
  const { technicalSkills } = skillsData;

  // Group skills by category
  const skillsByGroup = technicalSkills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    // Standardize category matching for our 4 tiers
    let cat = skill.category;
    if (cat === 'Language') {
      // Map general languages to Frontend or Backend to maintain 4 tiers
      if (skill.name === 'TypeScript' || skill.name === 'JavaScript') cat = 'Frontend';
      else cat = 'Backend';
    }
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});



  const categoriesOrder = ['Frontend', 'Backend', 'DevOps', 'Database'] as const;

  return (
    <section id="skills" className="py-28 bg-slate-50 dark:bg-[#030014] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            System Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-black">Skill Map.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            This structured map illustrates how I utilize my stack across different architectural tiers of a web application to ensure speed, scalability, and security.
          </p>
        </div>

        {/* The Skill Map Grid representing System Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting system flow lines (hidden on mobile) */}
          <div className="hidden lg:block absolute top-[40px] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-green-500/20 via-yellow-500/20 to-purple-500/20 z-0 pointer-events-none" />

          {categoriesOrder.map((catKey) => {
            const meta = tierMeta[catKey];
            const groupSkills = skillsByGroup[catKey] || [];

            return (
              <div 
                key={catKey}
                className="relative bg-white dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 p-6 rounded-[2rem] shadow-xl glow-purple hover:border-purple-500/25 transition-all duration-300 z-10 flex flex-col justify-between"
              >
                <div>
                  {/* Tier Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border ${meta.bgClass}`}>
                      {meta.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                        {meta.title}
                      </h3>
                      <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">
                        {meta.description}
                      </span>
                    </div>
                  </div>

                  {/* Skills in Tier */}
                  <div className="space-y-4">
                    {groupSkills.map((skill, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850 rounded-2xl group transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[9px] uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400">
                            {skill.level}
                          </span>
                        </div>
                        {/* Custom visual progress bar */}
                        <div className="w-full bg-slate-100 dark:bg-slate-850 h-1 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: skill.level === 'Advanced' || skill.level === 'Expert' ? '90%' : skill.level === 'Intermediate' ? '65%' : '45%' 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier visual connection dot at the bottom */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Architectural Node</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${meta.dotClass} animate-pulse`} />
                </div>
              </div>
            );
          })}

        </div>



      </div>
    </section>
  );
};

export default Skills;