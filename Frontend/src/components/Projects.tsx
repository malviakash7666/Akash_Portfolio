import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioQuery } from '../hooks/usePortfolio';

interface CaseStudyProject {
  id?: number;
  title: string;
  problem: string;
  techStack: string[];
  features: string[];
  liveLink: string;
  githubLink: string;
  category?: string;
  image?: string | null;
}

const defaultProjects: CaseStudyProject[] = [
  {
    id: 101,
    title: 'HireGen AI',
    problem: 'AI Resume Analyzer platform that solves slow candidate screening by scoring resumes and offering tailored career recommendations.',
    techStack: ['React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    features: ['Resume analysis', 'AI recommendations', 'Candidate scoring'],
    liveLink: 'https://akashhotteok-00bf0e.netlify.app/projects',
    githubLink: 'https://github.com/malviakash7666/HireGen-AI',
    category: 'Full Stack / AI',
  },
  {
    id: 102,
    title: 'Shiksha Saarathi Platform',
    problem: 'Scalable web application built to streamline educational institution management, student metrics, and administrative workflows.',
    techStack: ['React.js', 'Node.js', 'PostgreSQL', 'Express.js', 'JWT'],
    features: ['Scalable web application', 'Authentication', 'Database integration'],
    liveLink: 'https://shikshasaarathi.in',
    githubLink: 'https://github.com/malviakash7666/Shiksha-Saarathi',
    category: 'Full Stack',
  },
  {
    id: 103,
    title: 'Smart Inventory POS System',
    problem: 'Comprehensive inventory management & Point-of-Sale dashboard to track real-time stock levels and process retail operations efficiently.',
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Express.js'],
    features: ['Inventory management', 'Dashboard', 'CRUD operations'],
    liveLink: 'https://akashhotteok-00bf0e.netlify.app/projects',
    githubLink: 'https://github.com/malviakash7666/Smart-Inventory-POS',
    category: 'Full Stack',
  },
];

const Projects: React.FC = () => {
  const { data, isLoading } = usePortfolioQuery();
  const rawProjects = data?.projects || [];

  const displayProjects = (() => {
    if (rawProjects.length === 0) return defaultProjects;

    const formatted = rawProjects
      .filter((proj: any) => proj.showOnHome === true || proj.showOnHome === "true" || proj.showOnHome === 1)
      .map((proj: any) => {
        const tech = (() => {
          try {
            return typeof proj.techStack === 'string' ? JSON.parse(proj.techStack) : proj.techStack || [];
          } catch (e) {
            return Array.isArray(proj.techStack) ? proj.techStack : [];
          }
        })();

        const feat = (() => {
          try {
            return typeof proj.features === 'string' ? JSON.parse(proj.features) : proj.features || [];
          } catch (e) {
            return Array.isArray(proj.features) ? proj.features : [];
          }
        })();

        return {
          id: proj.id,
          title: proj.title,
          problem: proj.problem || 'Scalable full-stack application addressing real-world operational challenges.',
          techStack: tech.length > 0 ? tech : ['React.js', 'Node.js', 'PostgreSQL'],
          features: feat.length > 0 ? feat : ['Scalable web application', 'Authentication', 'Database integration'],
          liveLink: proj.liveLink || 'https://akashhotteok-00bf0e.netlify.app/projects',
          githubLink: proj.githubLink || 'https://github.com/malviakash7666',
          category: proj.category || 'Full Stack',
          image: proj.image,
        };
      });

    return formatted.length > 0 ? formatted : defaultProjects;
  })();

  return (
    <section id="projects" className="py-24 bg-[#030014] transition-colors duration-500 overflow-hidden relative">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Featured Case Studies & Projects
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>

          <Link 
            to="/projects"
            className="px-5 py-2.5 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-xl text-xs hover:border-purple-500/50 transition-all cursor-pointer bg-slate-900/60 backdrop-blur-md flex items-center gap-2"
          >
            <span>View All Projects</span>
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Projects Cards or Skeletons Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-850 rounded-3xl p-7 shadow-xl flex flex-col justify-between text-left backdrop-blur-md animate-pulse"
              >
                <div>
                  {/* Category Pill Skeleton */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 w-24 bg-slate-800 rounded-full" />
                    <div className="h-4 w-6 bg-slate-800 rounded" />
                  </div>

                  {/* Project Name Skeleton */}
                  <div className="h-7 w-3/4 bg-slate-800 rounded-lg mb-3" />

                  {/* Problem Description Skeleton */}
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-slate-850 rounded" />
                    <div className="h-4 w-5/6 bg-slate-850 rounded" />
                    <div className="h-4 w-2/3 bg-slate-850 rounded" />
                  </div>

                  {/* Tech Stack Badges Skeleton */}
                  <div className="mb-6">
                    <div className="h-3 w-16 bg-slate-800 rounded mb-2" />
                    <div className="flex flex-wrap gap-1.5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-6 w-16 bg-slate-850 rounded-lg" />
                      ))}
                    </div>
                  </div>

                  {/* Key Features Skeleton */}
                  <div className="mb-8 border-t border-slate-850/60 pt-5 space-y-3">
                    <div className="h-3 w-20 bg-slate-800 rounded" />
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-850" />
                        <div className="h-3 w-1/2 bg-slate-850 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons Skeleton */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-850/60">
                  <div className="flex-1 h-10 bg-slate-800 rounded-xl" />
                  <div className="flex-1 h-10 bg-slate-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayProjects.map((project: CaseStudyProject, index: number) => {
              return (
                <div
                  key={project.id || index}
                  className="bg-slate-900/60 border border-slate-850 rounded-3xl p-7 shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between text-left backdrop-blur-md group hover:-translate-y-1"
                >
                  <div>
                    {/* Category Pill & ID */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                        {project.category || 'Full Stack'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-3">
                      {project.title}
                    </h3>

                    {/* Problem Statement / Description */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {project.problem}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mb-6">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((techItem, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[#090b16] text-slate-300 border border-slate-800"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features checklist */}
                    <div className="mb-8 border-t border-slate-850/60 pt-5">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">
                        Key Features
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300 font-medium">
                        {project.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-850/60">
                    {/* Live Demo Button */}
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    {/* GitHub Repository Button */}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
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

export default Projects;