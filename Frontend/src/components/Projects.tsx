import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';

interface Project {
  id: number;
  title: string;
  problem: string;
  implementation: string;
  impact: string;
  techStack: string | string[];
  liveLink: string;
  githubLink: string;
  category: string;
  image: string | null;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await userService.getProjects({ homepage: true });
        if (res.success) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getProjectPlaceholder = (title: string) => {
    const gradients = [
      "from-indigo-500 to-purple-500",
      "from-blue-500 to-indigo-600",
      "from-purple-600 to-pink-500",
      "from-emerald-400 to-teal-600"
    ];
    // Hash title to pick a consistent gradient
    const index = Math.abs(title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % gradients.length;
    
    return (
      <div className={`w-full h-48 bg-gradient-to-tr ${gradients[index]} flex flex-col items-center justify-center text-white p-6 relative overflow-hidden select-none`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-6 -mt-6" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <span className="text-3xl font-black tracking-widest uppercase mb-1">
          {title.split(" ").slice(0, 2).map(w => w[0]).join("")}
        </span>
        <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest">Workspace Demo</span>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 bg-[#fafafa] dark:bg-[#030014] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Projects
            </h2>
            {/* Purple underline */}
            <div className="w-12 h-1 bg-[#6366f1] rounded-full" />
          </div>

          <Link 
            to="/projects"
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold rounded-xl text-xs hover:border-[#6366f1] hover:text-[#6366f1] transition-all cursor-pointer bg-white dark:bg-slate-900"
          >
            View All Projects
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project, index: number) => {
            // Parse techStack if it's stored as a JSON string
            const tech: string[] = (() => {
              try {
                if (typeof project.techStack === 'string') {
                  return JSON.parse(project.techStack);
                }
                return project.techStack || [];
              } catch (e) {
                console.error(e);
              }
              return [];
            })();

            return (
              <div
                key={project.id || index}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group bg-white dark:bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-850 hover:border-[#6366f1]/35 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      getProjectPlaceholder(project.title)
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 text-left">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#6366f1] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {project.problem || "Developed a dynamic web portal optimized for usability, scalability, and robust user state interactions."}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Links */}
                <div className="p-6 pt-0 flex items-center gap-4 bg-transparent mt-auto" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-500 hover:text-[#6366f1] transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    Code
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    Live Demo ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator slider buttons in the bottom right */}
        <div className="flex justify-end gap-2.5 mt-8">
          <button className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:border-[#6366f1] hover:text-[#6366f1] bg-white dark:bg-slate-900 transition-colors select-none cursor-pointer">
            ‹
          </button>
          <button className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:border-[#6366f1] hover:text-[#6366f1] bg-white dark:bg-slate-900 transition-colors select-none cursor-pointer">
            ›
          </button>
        </div>

      </div>
    </section>
  );
};

export default Projects;