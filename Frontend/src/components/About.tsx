import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Side: Visual Experience Card (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] opacity-10 blur-2xl" />
            
            <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-[2rem] shadow-2xl shadow-indigo-100/20 dark:shadow-none">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-none">Akash Mallvi</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-semibold uppercase tracking-wider">Full Stack Developer</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Education */}
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Academic Background</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">BCA Graduate • Class of 2026</p>
                  </div>
                </div>

                {/* Current Role */}
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Current Journey</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Full Stack Development Intern</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30">
                  <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">10+</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-widest">Builds</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30">
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400">2026</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-widest">Graduating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Narrative Content (7 columns) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
              About the Developer
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Bridging the gap between <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ideas and Code.</span>
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                Hello! I'm <span className="text-gray-900 dark:text-white font-semibold underline decoration-indigo-500/30 decoration-4">Akash Mallvi</span>, 
                a passionate developer based in Nagpur, India. My journey started with a curiosity for how things work on the internet, 
                which led me to pursue a BCA.
              </p>
              
              <p>
                I don't just write code; I build digital experiences. Currently, as a <span className="font-medium text-gray-900 dark:text-white">Full Stack Intern</span>, 
                I focus on the MERN stack—mastering the art of creating seamless transitions between the database, 
                server logic, and the user interface.
              </p>
            </div>

            {/* Tech Pill List */}
            <div className="mt-10 flex flex-wrap gap-3">
              {['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'Tailwind'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-sm font-semibold border border-gray-100 dark:border-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
              >
                View Portfolio
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;