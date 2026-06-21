import React, { useEffect, useRef, useState } from 'react';

const roles = ['Full-Stack Developer', 'MERN Specialist', 'UI/UX Enthusiast', 'Problem Solver'];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    const typeSpeed = deleting ? 50 : 100;

    if (!deleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + (deleting ? -1 : 1)));
      }, typeSpeed);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 overflow-hidden pt-20">
      
      {/* Background Layer: Grid & Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      {/* Floating Interactive Elements (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-[20%] left-[10%] animate-float">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-3 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Status</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Available for Hire</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[30%] right-[10%] animate-float-delayed">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-3 rounded-2xl shadow-xl text-center min-w-[120px]">
            <span className="text-2xl mb-1 block">⚛️</span>
            <p className="text-xs font-bold dark:text-gray-300">React Specialist</p>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className={`relative z-10 container mx-auto px-6 text-center transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Portfolio 2024 - 2026
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
          Hello, I'm <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Akash Mallvi
          </span>
        </h1>

        {/* Typewriter Text */}
        <div className="text-xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 mb-8 min-h-[40px]">
          Creative <span className="text-gray-900 dark:text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-8 italic">
            {displayed}
          </span>
          <span className="inline-block w-[3px] h-8 bg-indigo-500 ml-1 animate-cursor align-middle" />
        </div>

        <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed">
          Full-stack engineer specializing in the <span className="text-gray-900 dark:text-white font-semibold">MERN Stack</span>. 
          I build high-performance web applications with a focus on clean code and user experience.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gray-200 dark:shadow-none">
            View Projects
          </a>
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            Get in touch
          </a>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-gray-100 dark:border-gray-900 pt-10">
          {[
            { value: '10+', label: 'Projects' },
            { value: '2+', label: 'Years' },
            { value: 'MERN', label: 'Tech Stack' },
            { value: '20+', label: 'Skills' },
          ].map((item, idx) => (
            <div key={idx} className="p-4">
              <p className="text-2xl font-black text-gray-900 dark:text-white">{item.value}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blob { animation: blob 10s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite 3s; }
        .animate-cursor { animation: cursor 0.8s infinite; }
      `}</style>
    </section>
  );
};

export default Hero;