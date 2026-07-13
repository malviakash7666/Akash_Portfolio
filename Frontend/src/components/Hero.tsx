import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

const Hero: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [projectsCount, setProjectsCount] = useState<number>(3);
  const [experienceYears, setExperienceYears] = useState<number>(2);
  const [skillsList, setSkillsList] = useState<string[]>(["React", "Node.js", "PostgreSQL"]);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const [profileRes, projectsRes, experiencesRes, skillsRes] = await Promise.all([
          userService.getPublicProfile(),
          userService.getProjects(),
          userService.getExperiences(),
          userService.getSkills(),
        ]);

        if (profileRes && profileRes.success) {
          setProfile(profileRes.profile);
        }
        
        if (projectsRes && projectsRes.success) {
          setProjectsCount(projectsRes.projects?.length || 3);
        }

        if (experiencesRes && experiencesRes.success) {
          const experiences = experiencesRes.experiences || [];
          if (experiences.length > 0) {
            let oldestYear = new Date().getFullYear();
            experiences.forEach((exp: any) => {
              const years = exp.period.match(/\b(20\d{2})\b/g);
              if (years) {
                years.forEach((yrStr: string) => {
                  const yr = parseInt(yrStr, 10);
                  if (yr < oldestYear) {
                    oldestYear = yr;
                  }
                });
              }
            });
            const currentYear = new Date().getFullYear();
            const calculatedYears = currentYear - oldestYear;
            setExperienceYears(calculatedYears > 0 ? calculatedYears : 2);
          }
        }

        if (skillsRes && skillsRes.success) {
          const skills = skillsRes.skills || [];
          const topSkills = skills.slice(0, 3).map((s: any) => s.name);
          if (topSkills.length > 0) {
            setSkillsList(topSkills);
          }
        }
      } catch (err) {
        console.error("Error loading dynamic data in Hero:", err);
      }
    };
    loadHeroData();
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = profile?.resumeUrl || '/Akash.Malvi.pdf';
    link.download = 'Akash_Malvi_FullStack_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parsedSocials = (() => {
    try {
      if (profile?.socialLinks) {
        return typeof profile.socialLinks === 'string' 
          ? JSON.parse(profile.socialLinks) 
          : profile.socialLinks;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      github: "https://github.com/malviakash7666",
      linkedin: "https://www.linkedin.com/in/akash-malvi-50313b281",
      leetcode: "https://leetcode.com/u/akashmalvi7666/",
    };
  })();

  const defaultHeadline = "Hi, I'm Akash Malvi";
  const defaultTagline = "I build scalable web applications that solve real-world problems.";
  const defaultSubtext = "I'm a Full Stack Developer with expertise in React.js, Node.js, TypeScript and PostgreSQL. I love building clean, performant and user-friendly applications.";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white dark:bg-[#030014] overflow-hidden pt-28 pb-16 transition-colors duration-500">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Copywriting Area (7 columns) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Status / Role Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f3ff] dark:bg-purple-950/40 border border-[#ddd6fe] dark:border-purple-900/40 text-[#6366f1] dark:text-[#818cf8] text-xs font-bold font-sans tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
              </span>
              Full Stack Developer
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl font-black text-[#0f172a] dark:text-white leading-[1.1] tracking-tight">
              Hi, I'm <span className="text-[#6366f1]">{profile?.name || "Akash Malvi"}</span>
            </h1>

            {/* Tagline */}
            <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 leading-snug">
              {defaultTagline}
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-normal">
              {profile?.bio || defaultSubtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/10 active:scale-95 duration-200 text-sm"
              >
                View My Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 bg-white dark:bg-transparent text-slate-800 dark:text-slate-200 font-bold rounded-xl border border-slate-350 dark:border-slate-800 hover:border-slate-800 dark:hover:border-white hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95 duration-200 text-sm"
              >
                Contact Me
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h-3a2 2 0 01-2-2V7a2 2 0 012-2h3M9 19a2 2 0 002 2h3a2 2 0 002-2m-8-2h8" />
                </svg>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-3">
              {/* GitHub */}
              <a
                href={parsedSocials.github || "https://github.com/malviakash7666"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-[#6366f1] dark:hover:border-[#818cf8] hover:bg-indigo-50/20 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={parsedSocials.linkedin || "https://www.linkedin.com/in/akash-malvi-50313b281"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-[#6366f1] dark:hover:border-[#818cf8] hover:bg-indigo-50/20 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Mail */}
              <a
                href={`mailto:${profile?.email || "akashmalvi7666@gmail.com"}`}
                className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-[#6366f1] dark:hover:border-[#818cf8] hover:bg-indigo-50/20 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h-3a2 2 0 01-2-2V7a2 2 0 012-2h3M9 19a2 2 0 002 2h3a2 2 0 002-2m-8-2h8" />
                </svg>
              </a>

              {/* LeetCode */}
              <a
                href={parsedSocials.leetcode || "https://leetcode.com/u/akashmalvi7666/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-[#6366f1] dark:hover:border-[#818cf8] hover:bg-indigo-50/20 transition-all cursor-pointer"
              >
                {/* LeetCode icon */}
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.77 9.77a1.375 1.375 0 0 0-.025 1.92l.025.025a1.375 1.375 0 0 0 1.917.025l9.77-9.77A1.375 1.375 0 0 0 13.483 0zm-5.69 7.03a1.375 1.375 0 0 0-.973.405L.409 13.85c-.545.543-.545 1.423 0 1.965l3.778 3.778c.542.545 1.422.545 1.965 0l6.413-6.413a1.378 1.378 0 0 0-.97-2.353H7.793zm10.748 1.258a1.375 1.375 0 0 0-.97.402l-6.417 6.417a1.375 1.375 0 0 0 0 1.944l3.777 3.777c.537.538 1.408.538 1.945 0l6.418-6.417c.537-.537.537-1.408 0-1.945l-3.777-3.777a1.375 1.375 0 0 0-.976-.401z"/>
                </svg>
              </a>
            </div>

            {/* Dynamic statistics underneath socials */}
            <div className="flex items-center gap-10 border-t border-slate-100 dark:border-slate-850 pt-6 max-w-xl">
              <div>
                <p className="text-2xl font-black text-[#0f172a] dark:text-white">{experienceYears}+</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Years experience</p>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <div>
                <p className="text-2xl font-black text-[#0f172a] dark:text-white">{projectsCount}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Projects shipped</p>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <div>
                <p className="text-2xl font-black text-[#0f172a] dark:text-white">2.4M</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Reqs served / mo</p>
              </div>
            </div>

          </div>

          {/* Code Window Graphic (5 columns) */}
          <div className="lg:col-span-5 relative w-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-[2.5rem] opacity-30 blur-2xl pointer-events-none" />
            
            <div className="relative bg-[#0d1117] border border-slate-800 p-6 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-slate-300">
              
              {/* macOS Window Controls */}
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#21262d]">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] text-slate-400">developer.ts</div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Code Snippet */}
              <div className="flex gap-4 leading-relaxed overflow-x-auto select-none">
                
                {/* Line Numbers */}
                <div className="text-slate-600 text-right pr-2 select-none border-r border-[#21262d]">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                  <div>10</div>
                </div>

                {/* Code highlight */}
                <div className="text-left">
                  <div>
                    <span className="text-[#ff7b72]">const</span>{' '}
                    <span className="text-[#79c0ff]">developer</span>{' '}
                    <span className="text-[#ff7b72]">=</span>{' '}
                    <span className="text-white">{'{'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">  name:</span>{' '}
                    <span className="text-[#a5d6ff]">"{profile?.name || "Akash Malvi"}"</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">  role:</span>{' '}
                    <span className="text-[#a5d6ff]">"Full-Stack Developer"</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">  stack:</span>{' '}
                    <span className="text-white">[</span>
                    {skillsList.map((skill, i) => (
                      <span key={i}>
                        <span className="text-[#a5d6ff]">"{skill}"</span>
                        {i < skillsList.length - 1 && <span className="text-white">, </span>}
                      </span>
                    ))}
                    <span className="text-white">]</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">  focus:</span>{' '}
                    <span className="text-[#a5d6ff]">"Scalable Systems & APIs"</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">  shipsProduction:</span>{' '}
                    <span className="text-[#ff7b72]">true</span>
                  </div>
                  <div>
                    <span className="text-white">{'};'}</span>
                  </div>
                  <div className="h-4" />
                  <div>
                    <span className="text-[#8b949e]">// currently building</span>
                  </div>
                  <div>
                    <span className="text-[#d2a8ff]">deploy</span>
                    <span className="text-white">(</span>
                    <span className="text-[#79c0ff]">developer</span>
                    <span className="text-white">.</span>
                    <span className="text-[#79c0ff]">nextProject</span>
                    <span className="text-white">)</span>
                    <span className="text-[#ff7b72] animate-pulse">|</span>
                  </div>
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