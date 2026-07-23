import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioQuery } from '../hooks/usePortfolio';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>(window.location.pathname);
  const { data } = usePortfolioQuery();
  const profile = data?.profile;

  // Handle Dark Mode Toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Scroll Spy & Header Blur Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple Scroll Spy
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(`/${currentSection}`);
      } else if (window.scrollY < 200) {
        setActiveSection('/');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profile?.resumeUrl || '/Akash.Malvi.pdf';
    link.download = 'Akash_Malvi_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setActiveSection('/');
    } else {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setActiveSection(href);
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg shadow-sm border-b border-slate-100 dark:border-gray-900/50' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <a 
            href="/" 
            onClick={(e) => handleNavLinkClick(e, '/')}
            className="group flex items-center text-xl font-bold tracking-tight"
          >
            <span className="text-[#6366f1] font-extrabold font-mono">&lt;/&gt;</span>
            <span className="text-[#0f172a] dark:text-white ml-2 hover:text-[#6366f1] dark:hover:text-[#818cf8] transition-colors">
              {profile?.name || "Akash Malvi"}
            </span>
          </a>

          {/* Desktop Links & CV Download */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    activeSection === link.href
                      ? 'text-[#6366f1] dark:text-[#818cf8] font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* CV Download Button */}
            <button
              onClick={handleDownloadCV}
              className="px-4.5 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-500/10 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-yellow-400 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer bg-white dark:bg-slate-900"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-yellow-450 cursor-pointer bg-white dark:bg-slate-900"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            
            <button 
              className="p-2 text-slate-600 dark:text-slate-350"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transform transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-current transform transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-b border-slate-100 dark:border-gray-900 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavLinkClick(e, link.href);
                  }}
                  className="text-base font-semibold text-slate-600 dark:text-slate-305 hover:text-[#6366f1] dark:hover:text-[#818cf8]"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={handleDownloadCV}
                className="w-full py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all mt-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;