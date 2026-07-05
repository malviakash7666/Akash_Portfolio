import React from 'react';
import projectsData from '../utils/projects.json';

interface Project {
  title: string;
  problem: string;
  implementation: string;
  impact: string;
  techStack: string[];
  liveLink: string;
  githubLink: string;
  category: string;
}

const Projects: React.FC = () => {
  const { projects } = projectsData;

  return (
    <section id="projects" className="py-28 bg-white dark:bg-[#030014] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">Proven Solutions</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Production-Ready <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-black">Projects.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Real-world systems engineered for low latency, request integrity, and high throughput.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project: Project, index: number) => {
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-slate-900/60 rounded-[2.5rem] overflow-hidden border border-slate-150 dark:border-slate-800 hover:border-purple-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header (Category & Title) */}
                  <div className="p-6 pb-2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-purple-50 dark:bg-purple-950/50 border border-purple-100/50 dark:border-purple-900/40 text-purple-600 dark:text-purple-450 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 pt-3 space-y-4">
                    
                    {/* The Problem Statement */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wide">
                        <span>⚠️</span> The Problem
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-5 font-medium">
                        {project.problem}
                      </p>
                    </div>

                    {/* Technical Solution */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">
                        <span>🛠️</span> Solution / Implementation
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                        {project.implementation}
                      </p>
                    </div>

                    {/* Engineering Impact */}
                    <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wide">
                        <span>📈</span> Engineering Impact
                      </div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold pl-5 leading-relaxed">
                        {project.impact}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tech Stack</div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-extrabold bg-slate-100 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/80 px-2.5 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer Links */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto bg-slate-50/50 dark:bg-slate-950/20">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 dark:bg-purple-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-700 dark:hover:bg-purple-550 transition-colors shadow-md"
                  >
                    Live Demo ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;