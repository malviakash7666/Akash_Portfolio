import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userService } from '../../services/user.service';

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
  showOnHome: boolean;
}

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await userService.getProjects();
        if (res.success) {
          setProjects(res.projects);
          setFilteredProjects(res.projects);
          
          // Extract unique categories
          const cats = new Set<string>();
          cats.add('All');
          res.projects.forEach((proj: Project) => {
            if (proj.category) cats.add(proj.category);
          });
          setCategories(Array.from(cats));
        }
      } catch (err) {
        console.error("Error loading all projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = projects;

    if (selectedCategory !== 'All') {
      result = result.filter(proj => proj.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(proj => {
        const titleMatch = proj.title.toLowerCase().includes(query);
        const problemMatch = proj.problem?.toLowerCase().includes(query);
        
        const tech: string[] = (() => {
          try {
            if (typeof proj.techStack === 'string') return JSON.parse(proj.techStack);
            return proj.techStack || [];
          } catch (e) {
            return [];
          }
        })();
        const techMatch = tech.some(t => t.toLowerCase().includes(query));
        
        return titleMatch || problemMatch || techMatch;
      });
    }

    setFilteredProjects(result);
  }, [searchQuery, selectedCategory, projects]);

  const getProjectPlaceholder = (title: string) => {
    const gradients = [
      "from-indigo-500 to-purple-500",
      "from-blue-500 to-indigo-600",
      "from-purple-600 to-pink-500",
      "from-emerald-400 to-teal-600"
    ];
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
    <div className="min-h-screen bg-[#030014] text-slate-100 font-sans pb-24 transition-colors duration-500">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[40%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] -left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="space-y-4 text-left">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
            </button>
            <h1 className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400">
              All Projects
            </h1>
            <div className="w-16 h-1.5 bg-[#6366f1] rounded-full" />
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, technologies..."
                className="w-full px-5 py-3.5 pl-12 text-sm bg-white/5 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/30 outline-none transition-all backdrop-blur-md"
              />
              <svg 
                className="absolute left-4 top-4.5 w-4 h-4 text-slate-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 text-slate-400 border border-slate-900 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-[#6366f1]/35 border-t-[#6366f1] rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-slate-900 backdrop-blur-md">
            <p className="text-slate-400 text-lg font-medium">No projects found matching your filters.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project: Project, index: number) => {
              const tech: string[] = (() => {
                try {
                  if (typeof project.techStack === 'string') return JSON.parse(project.techStack);
                  return project.techStack || [];
                } catch (e) {
                  return [];
                }
              })();

              return (
                <motion.div
                  key={project.id || index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="group bg-[#090b16]/65 border border-slate-900 hover:border-[#6366f1]/35 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image */}
                    <div className="relative overflow-hidden border-b border-slate-950">
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

                    {/* Content */}
                    <div className="p-6 space-y-4 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#6366f1] bg-[#6366f1]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-[#6366f1] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed truncate-3-lines">
                        {project.problem || "Developed a dynamic web portal optimized for usability, scalability, and robust user state interactions."}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {tech.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold bg-white/5 text-slate-400 px-2.5 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="p-6 pt-0 flex items-center gap-4 bg-transparent mt-auto" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-400 hover:text-[#6366f1] transition-colors flex items-center gap-1 uppercase tracking-wider"
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
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
