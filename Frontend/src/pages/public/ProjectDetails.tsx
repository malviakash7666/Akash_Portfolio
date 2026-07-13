import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  features?: string | string[];
  screenshots?: string | string[];
  architecture?: string;
  databaseDesign?: string;
  challenges?: string;
  learnings?: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const res = await userService.getProjectById(id);
        if (res.success) {
          setProject(res.project);
        }
      } catch (err) {
        console.error("Error loading project details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030014] text-white">
        <div className="w-10 h-10 border-4 border-[#6366f1]/35 border-t-[#6366f1] rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#030014] text-white gap-4">
        <h2 className="text-xl font-bold">Project not found</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-[#6366f1] rounded-xl text-sm font-semibold">
          Go Back
        </button>
      </div>
    );
  }

  // Parse arrays
  const tech: string[] = (() => {
    try {
      if (typeof project.techStack === 'string') return JSON.parse(project.techStack);
      return project.techStack || [];
    } catch (e) {
      return [];
    }
  })();

  const features: string[] = (() => {
    try {
      if (typeof project.features === 'string') return JSON.parse(project.features);
      return project.features || [];
    } catch (e) {
      return [];
    }
  })();

  const screenshots: string[] = (() => {
    try {
      if (typeof project.screenshots === 'string') return JSON.parse(project.screenshots);
      return project.screenshots || [];
    } catch (e) {
      return [];
    }
  })();

  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 font-sans pb-24 transition-colors duration-500">
      
      {/* Glow elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[30%] left-[10%] w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[160px]" />
        <div className="absolute top-[50%] right-[5%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* Back navigation header */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold cursor-pointer"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Go Back
          </button>
        </div>

        {/* 1. Hero Banner Section */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
          <div className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-end p-8 sm:p-12 border border-slate-900 shadow-2xl">
            {/* Project Cover Image as Background */}
            <div className="absolute inset-0 z-0">
              {project.image ? (
                <>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-102 blur-[2px] opacity-25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/85 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/30" />
              )}
              <div className="absolute inset-0 bg-radial-gradient(ellipse at bottom, transparent 30%, #030014 90%)" />
            </div>

            {/* Hero content */}
            <div className="relative z-10 max-w-3xl space-y-6 text-left">
              <span className="px-3.5 py-1.5 bg-[#6366f1]/15 border border-[#6366f1]/30 text-[#818cf8] text-xs font-bold rounded-full uppercase tracking-wider">
                {project.category}
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
                {project.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => (
                  <span key={i} className="text-xs font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-98"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-slate-800 hover:border-slate-700 text-sm font-bold rounded-2xl flex items-center gap-2 transition-all active:scale-98"
                  >
                    GitHub Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main details body (8 columns on large screens) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 2. Screenshots Carousel/Grid */}
            {screenshots.length > 0 && (
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-extrabold text-white">Screenshots</h2>
                <div className="w-12 h-1 bg-[#6366f1] rounded-full mb-6" />
                
                {/* Main Active Screenshot */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-900 bg-slate-950/40 aspect-video flex items-center justify-center">
                  <img 
                    src={screenshots[activeScreenshot]} 
                    alt={`Screenshot ${activeScreenshot + 1}`} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Thumbnails */}
                {screenshots.length > 1 && (
                  <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
                    {screenshots.map((shot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveScreenshot(idx)}
                        className={`relative rounded-xl overflow-hidden border-2 h-20 aspect-video shrink-0 transition-all ${
                          activeScreenshot === idx ? 'border-[#6366f1] scale-98' : 'border-slate-900 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={shot} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Project Overview */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-white">Project Overview</h2>
              <div className="w-12 h-1 bg-[#6366f1] rounded-full mb-6" />
              
              <div className="grid grid-cols-1 gap-6">
                {project.problem && (
                  <div className="p-6 bg-slate-950/40 border border-slate-900/60 rounded-2xl space-y-2 backdrop-blur-md">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#818cf8]">The Problem</h4>
                    <p className="text-slate-350 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{project.problem}</p>
                  </div>
                )}
                {project.implementation && (
                  <div className="p-6 bg-slate-950/40 border border-slate-900/60 rounded-2xl space-y-2 backdrop-blur-md">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#818cf8]">The Implementation</h4>
                    <p className="text-slate-350 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{project.implementation}</p>
                  </div>
                )}
                {project.impact && (
                  <div className="p-6 bg-slate-950/40 border border-slate-900/60 rounded-2xl space-y-2 backdrop-blur-md">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#818cf8]">The Impact</h4>
                    <p className="text-slate-350 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{project.impact}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Architecture Section */}
            {project.architecture && (
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-extrabold text-white">System Architecture</h2>
                <div className="w-12 h-1 bg-[#6366f1] rounded-full mb-6" />
                <div className="p-6 bg-slate-950/40 border border-slate-900/60 rounded-2xl backdrop-blur-md">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
                    {project.architecture}
                  </p>
                </div>
              </div>
            )}

            {/* 5. Database Design Section */}
            {project.databaseDesign && (
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-extrabold text-white">Database Design</h2>
                <div className="w-12 h-1 bg-[#6366f1] rounded-full mb-6" />
                <div className="p-6 bg-slate-950/40 border border-slate-900/60 rounded-2xl backdrop-blur-md">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
                    {project.databaseDesign}
                  </p>
                </div>
              </div>
            )}

            {/* 6. Challenges & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {project.challenges && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-white">Challenges</h2>
                  <div className="w-12 h-0.5 bg-[#6366f1] rounded-full mb-4" />
                  <div className="p-5 bg-slate-950/40 border border-slate-900/60 rounded-2xl backdrop-blur-md min-h-[150px]">
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                      {project.challenges}
                    </p>
                  </div>
                </div>
              )}
              {project.learnings && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-white">Key Learnings</h2>
                  <div className="w-12 h-0.5 bg-[#6366f1] rounded-full mb-4" />
                  <div className="p-5 bg-slate-950/40 border border-slate-900/60 rounded-2xl backdrop-blur-md min-h-[150px]">
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                      {project.learnings}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar panel (4 columns on large screens) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Features list */}
            {features.length > 0 && (
              <div className="p-6 bg-slate-950/45 border border-slate-900 rounded-3xl backdrop-blur-md text-left space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Key Features</h3>
                <div className="w-8 h-1 bg-[#6366f1] rounded-full" />
                <ul className="space-y-3 pt-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-slate-300 text-sm leading-relaxed font-normal">
                      <span className="text-[#818cf8] font-bold text-base leading-none">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Metadata */}
            <div className="p-6 bg-slate-950/45 border border-slate-900 rounded-3xl backdrop-blur-md text-left space-y-4">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Project Info</h3>
              <div className="w-8 h-1 bg-[#6366f1] rounded-full" />
              <div className="space-y-4 pt-2 text-sm">
                <div>
                  <span className="block text-slate-500 text-xs uppercase font-extrabold tracking-wider">Category</span>
                  <span className="text-slate-300 font-semibold">{project.category || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase font-extrabold tracking-wider">GitHub Repo</span>
                  {project.githubLink ? (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-[#818cf8] hover:underline font-semibold break-all">
                      {project.githubLink}
                    </a>
                  ) : (
                    <span className="text-slate-400">N/A</span>
                  )}
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase font-extrabold tracking-wider">Live Deploy</span>
                  {project.liveLink ? (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-[#818cf8] hover:underline font-semibold break-all">
                      {project.liveLink}
                    </a>
                  ) : (
                    <span className="text-slate-400">N/A</span>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
