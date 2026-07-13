import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  current: boolean;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await userService.getExperiences();
        if (res.success) {
          setExperiences(res.experiences);
        }
      } catch (err) {
        console.error("Error loading experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#030014] transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <div className="space-y-3 mb-16 text-left">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Experience
          </h2>
          {/* Purple underline */}
          <div className="w-12 h-1 bg-[#6366f1] rounded-full" />
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-8 md:pl-0">
          {/* Mobile vertical line helper */}
          <div className="absolute left-[7px] top-6 bottom-6 w-[1px] bg-slate-200 dark:bg-slate-800 md:hidden" />

          {experiences.map((exp: ExperienceItem, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative mb-2 last:mb-0">
              
              {/* Date column (left) */}
              <div className="md:col-span-3 md:text-right pt-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {exp.period}
              </div>

              {/* Timeline indicator column */}
              <div className="hidden md:flex md:col-span-1 justify-center relative">
                {/* Dot */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#6366f1] border-2 border-white dark:border-[#030014] mt-6.5 z-10" />
                {/* Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute top-8 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800" />
                )}
              </div>

              {/* Card Column (right) */}
              <div className="md:col-span-8 pb-10">
                <div className="bg-white dark:bg-slate-900/60 border border-slate-150 dark:border-slate-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative">
                  {/* Mobile Dot */}
                  <div className="md:hidden absolute -left-[32px] top-[26px] w-3.5 h-3.5 rounded-full bg-[#6366f1] border-2 border-white dark:border-[#030014] z-10" />
                  
                  {/* Card Header (Role + Badge) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <span className="bg-[#f5f3ff] dark:bg-purple-950/40 border border-[#ddd6fe] dark:border-purple-900/40 text-[#6366f1] dark:text-[#818cf8] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {exp.current ? "Present" : "Internship"}
                    </span>
                  </div>

                  {/* Company Name */}
                  <div className="mb-4">
                    <a 
                      href="https://shikshasaarathi.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6366f1] dark:text-[#818cf8] font-bold text-sm hover:underline"
                    >
                      {exp.company}
                    </a>
                  </div>

                  {/* Bullet description points */}
                  <ul className="space-y-2.5 text-left text-slate-650 dark:text-slate-400 text-xs sm:text-sm font-medium">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#6366f1] dark:text-[#818cf8] mt-1.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;