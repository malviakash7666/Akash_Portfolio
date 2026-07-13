import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

interface Skill {
  name: string;
  level: string;
  category: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await userService.getSkills();
        if (res.success) {
          setSkills(res.skills);
        }
      } catch (err) {
        console.error("Error loading skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category, mapping DevOps/Tools to 'Tools & Others'
  const skillsByGroup = skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    let cat = skill.category;
    if (cat === 'DevOps' || cat === 'Tools' || cat === 'Tools & Others') {
      cat = 'Tools & Others';
    } else if (cat === 'Language') {
      if (skill.name === 'TypeScript' || skill.name === 'JavaScript') cat = 'Frontend';
      else cat = 'Backend';
    }
    if (!acc[cat]) acc[acc[cat] ? cat : cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoriesOrder = ['Frontend', 'Backend', 'Database', 'Tools & Others'] as const;

  const categoryMeta = {
    Frontend: {
      title: 'Frontend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    Backend: {
      title: 'Backend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    Database: {
      title: 'Database',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    'Tools & Others': {
      title: 'Tools & Others',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#fafafa] dark:bg-[#030014] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="space-y-3 mb-16 text-left">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Skills
          </h2>
          {/* Purple underline */}
          <div className="w-12 h-1 bg-[#6366f1] rounded-full" />
        </div>

        {/* 4-Column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesOrder.map((catKey) => {
            const meta = categoryMeta[catKey];
            const groupSkills = skillsByGroup[catKey] || [];

            return (
              <div 
                key={catKey}
                className="bg-white dark:bg-slate-900/60 border border-slate-150 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Category Header Card */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-950/20">
                  <div className="w-10 h-10 rounded-xl bg-[#eef2ff] dark:bg-purple-950/40 text-[#6366f1] dark:text-[#818cf8] flex items-center justify-center">
                    {meta.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    {meta.title}
                  </h3>
                </div>

                {/* Bulleted List of Skills */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-3 text-left">
                    {groupSkills.map((skill, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-2 text-slate-650 dark:text-slate-400 text-sm font-medium"
                      >
                        <span className="text-[#6366f1] dark:text-[#818cf8] text-base">•</span>
                        <span>{skill.name}</span>
                      </li>
                    ))}
                    {groupSkills.length === 0 && (
                      <li className="text-slate-400 text-xs italic">No skills listed</li>
                    )}
                  </ul>
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