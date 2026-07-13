import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Skills from '../../components/Skills';
import Projects from '../../components/Projects';
import Experience from '../../components/Experience';
import Certifications from '../../components/Certifications';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className="bg-white dark:bg-[#030014] text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;