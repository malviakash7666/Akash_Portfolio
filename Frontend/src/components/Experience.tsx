import React from 'react';
import { usePortfolioQuery } from '../hooks/usePortfolio';

interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string | string[];
  current?: boolean;
}

const defaultExperiences: ExperienceItem[] = [
  {
    role: "Software Developer Intern",
    company: "Shiksha Saarathi",
    location: "Remote / India",
    period: "Dec 2024 - Present",
    current: true,
    description: [
      "Built responsive React.js interfaces",
      "Worked with TypeScript and backend APIs",
      "Integrated database-driven features",
      "Improved application performance"
    ]
  }
];

const Experience: React.FC = () => {
  const { data, isLoading } = usePortfolioQuery();
  const experiences = data?.experience || data?.experiences || [];

  const displayList = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section id="experience" className="py-24 bg-[#030014] transition-colors duration-500 overflow-hidden relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="space-y-3 mb-16 text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-8 md:pl-0">
          {/* Mobile vertical line */}
          <div className="absolute left-[7px] top-6 bottom-6 w-[1px] bg-slate-800 md:hidden" />

          {isLoading ? (
            /* Experience Timeline Skeletons */
            [...Array(2)].map((_, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative mb-6 last:mb-0 animate-pulse">
                {/* Date column (left) */}
                <div className="md:col-span-3 md:text-right pt-6">
                  <div className="h-4 w-24 bg-slate-800 rounded md:ml-auto" />
                </div>

                {/* Timeline indicator column */}
                <div className="hidden md:flex md:col-span-1 justify-center relative">
                  <div className="w-4 h-4 rounded-full bg-slate-800 border-4 border-[#030014] mt-6 z-10" />
                  {idx < 1 && (
                    <div className="absolute top-8 bottom-0 w-[1px] bg-slate-800" />
                  )}
                </div>

                {/* Card Column (right) */}
                <div className="md:col-span-8 pb-4">
                  <div className="bg-slate-900/60 border border-slate-850 p-6 sm:p-7 rounded-2xl shadow-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-48 bg-slate-800 rounded" />
                      <div className="h-6 w-20 bg-slate-850 rounded-full" />
                    </div>
                    <div className="h-4 w-32 bg-slate-800 rounded" />
                    <div className="space-y-2.5">
                      <div className="h-3 w-full bg-slate-850 rounded" />
                      <div className="h-3 w-5/6 bg-slate-850 rounded" />
                      <div className="h-3 w-2/3 bg-slate-850 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Actual Experience Timeline */
            displayList.map((exp: ExperienceItem, index: number) => {
              const descPoints = Array.isArray(exp.description)
                ? exp.description
                : typeof exp.description === 'string'
                ? (exp.description as string).split('\n').filter(Boolean)
                : [];

              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative mb-6 last:mb-0">
                  
                  {/* Date column (left) */}
                  <div className="md:col-span-3 md:text-right pt-6 text-xs sm:text-sm font-bold text-purple-400">
                    {exp.period}
                  </div>

                  {/* Timeline indicator column */}
                  <div className="hidden md:flex md:col-span-1 justify-center relative">
                    {/* Dot */}
                    <div className="w-4 h-4 rounded-full bg-purple-500 border-4 border-[#030014] shadow-lg shadow-purple-500/50 mt-6 z-10" />
                    {/* Line */}
                    {index < displayList.length - 1 && (
                      <div className="absolute top-8 bottom-0 w-[1px] bg-slate-800" />
                    )}
                  </div>

                  {/* Card Column (right) */}
                  <div className="md:col-span-8 pb-4">
                    <div className="bg-slate-900/60 border border-slate-850 p-6 sm:p-7 rounded-2xl shadow-xl hover:border-purple-500/40 transition-all duration-300 relative text-left backdrop-blur-md">
                      {/* Mobile Dot */}
                      <div className="md:hidden absolute -left-[32px] top-[26px] w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-[#030014] z-10" />
                      
                      {/* Card Header (Role + Badge) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          {exp.current ? "Present" : "Internship"}
                        </span>
                      </div>

                      {/* Company Name */}
                      <div className="mb-4">
                        <span className="text-indigo-400 font-bold text-sm sm:text-base">
                          {exp.company}
                        </span>
                      </div>

                      {/* Bullet description points */}
                      <ul className="space-y-3 text-slate-300 text-xs sm:text-sm font-normal">
                        {descPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-purple-400 mt-1 font-bold">▹</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};

export default Experience;