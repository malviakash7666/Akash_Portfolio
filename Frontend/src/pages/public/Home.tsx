import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Skills from '../../components/Skills';
import Projects from '../../components/Projects';
import Experience from '../../components/Experience';
import GithubActivity from '../../components/GithubActivity';
import CurrentlyLearning from '../../components/CurrentlyLearning';
import Certifications from '../../components/Certifications';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import { usePortfolioQuery } from '../../hooks/usePortfolio';

const Home: React.FC = () => {
  const { isError, refetch, isLoading } = usePortfolioQuery();

  // Smooth scroll to targeted section on load once query completes
  useEffect(() => {
    if (isLoading || isError) return;
    const path = window.location.pathname;
    if (path && path !== '/') {
      const sectionId = path.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, isError]);

  if (isError) {
    return (
      <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-950/50 border border-rose-800/40 text-rose-400 flex items-center justify-center text-3xl shadow-lg shadow-rose-900/10">
            ⚠️
          </div>
          
          <h2 className="text-2xl font-black text-white tracking-wide">
            Connection Failed
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed">
            Oops! We couldn't connect to the server to load the portfolio details. This might be due to a temporary network issue or server wake-up timeout.
          </p>

          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all text-sm cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#030014] text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GithubActivity />
      <CurrentlyLearning />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;