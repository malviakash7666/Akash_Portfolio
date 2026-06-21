import React, { useState } from 'react';
import skillsData from "../utils/skills.json";

interface Skill {
  name: string;
  level: string;
  category: string;
}

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Language'];

const categoryColors: Record<string, string> = {
  Frontend: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  Backend: 'text-green-500 bg-green-500/10 border-green-500/20',
  Database: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  Tools: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  Language: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
};

const Skills: React.FC = () => {
  const { technicalSkills } = skillsData;
  const [filter, setFilter] = useState('All');

  const filteredSkills = filter === 'All' 
    ? technicalSkills 
    : technicalSkills.filter((skill: Skill) => skill.category === filter);
    const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = '/Akash_Malvi.pdf';   // place the PDF in your /public folder
  link.download = 'Akash_Malvi_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Technical <span className="text-indigo-600">Toolbox.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              A collection of technologies I use to bring digital products to life, 
              refined through my BCA studies and MERN stack internship.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill: Skill, index: number) => (
            <div
              key={index}
              className="group relative p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100 dark:hover:shadow-none hover:-translate-y-2"
            >
              {/* Floating Icon/Dot Effect */}
              <div className="absolute top-4 right-4">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  categoryColors[skill.category]?.split(' ')[0] || 'bg-indigo-500'
                }`} />
              </div>

              <div className="flex flex-col items-center text-center">
                {/* Placeholder for Icons - If you have SVGs in your JSON, place them here */}
                <div className="w-12 h-12 mb-4 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                   <span className="text-xl font-black text-gray-300 dark:text-gray-700 group-hover:text-indigo-500">
                    {skill.name.charAt(0)}
                   </span>
                </div>

                <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-2">
                  {skill.name}
                </h3>
                
                <span className={`text-[10px] uppercase tracking-tighter font-bold px-2 py-1 rounded-lg border ${
                  categoryColors[skill.category] || categoryColors['Language']
                }`}>
                  {skill.category}
                </span>
              </div>

              {/* Skill Level Indicator (Subtle) */}
              <div className="mt-6 space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Proficiency</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: skill.level === 'Advanced' ? '90%' : skill.level === 'Intermediate' ? '65%' : '40%' 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

     {/* Learning Footnote */}
<div className="mt-16 p-8 rounded-[2.5rem] bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-200 dark:shadow-none">
  <div>
    <h4 className="text-xl font-bold mb-1 text-center md:text-left">Always evolving...</h4>
    <p
     
      className="opacity-80 text-sm text-center md:text-left font-medium cursor-pointer hover:opacity-100 transition-opacity"
    >
      Currently diving deeper into Cloud Deployment and System Architecture.
    </p>
  </div>
  <button   onClick={handleDownloadCV} className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:scale-105 transition-transform">
    Request Full CV
  </button>
</div>
      </div>
    </section>
  );
};

export default Skills;