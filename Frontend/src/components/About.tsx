import { usePortfolioQuery } from '../hooks/usePortfolio';

const About: React.FC = () => {
  const { data } = usePortfolioQuery();
  const profile = data?.profile;
  const experiences = data?.experience || data?.experiences || [];

  // Compute location dynamically (parse from profile or default)
  const locationText = "Nagpur, Maharashtra";
  
  // Compute education dynamically (BCA - 2024 or database values)
  const educationText = "BCA - 2024";

  // Experience text
  const experienceText = experiences.length > 0 
    ? `${experiences[0].role} & Projects`
    : "Intern & Projects";

  // Availability text
  const availabilityText = "Open to Work";

  const defaultBioParagraphs = [
    "I'm a passionate Full Stack Developer with a strong foundation in building end-to-end web applications. I enjoy turning ideas into real products with clean code and great user experiences.",
    "I have hands-on experience with modern technologies like React.js, Node.js, Express.js, TypeScript and PostgreSQL. I'm always eager to learn, improve and take on new challenges."
  ];

  return (
    <section id="about" className="relative py-24 bg-white dark:bg-[#030014] overflow-hidden transition-colors duration-500">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Title & Narrative (6 columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                About Me
              </h2>
              {/* Purple underline */}
              <div className="w-12 h-1 bg-[#6366f1] rounded-full" />
            </div>
            
            <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base font-normal">
              {profile?.bio ? (
                <>
                  <p>{profile.bio}</p>
                  <p>{defaultBioParagraphs[1]}</p>
                </>
              ) : (
                <>
                  <p>{defaultBioParagraphs[0]}</p>
                  <p>{defaultBioParagraphs[1]}</p>
                </>
              )}
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Profile Cards (6 columns) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            
            {/* Card 1: Location */}
            <div className="p-5 bg-[#fafafa] dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#eef2ff] dark:bg-purple-950/40 text-[#6366f1] dark:text-[#818cf8] flex items-center justify-center text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Location</h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-bold mt-0.5">{locationText}</p>
              </div>
            </div>

            {/* Card 2: Education */}
            <div className="p-5 bg-[#fafafa] dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#eef2ff] dark:bg-purple-950/40 text-[#6366f1] dark:text-[#818cf8] flex items-center justify-center text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Education</h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-bold mt-0.5">{educationText}</p>
              </div>
            </div>

            {/* Card 3: Experience */}
            <div className="p-5 bg-[#fafafa] dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#eef2ff] dark:bg-purple-950/40 text-[#6366f1] dark:text-[#818cf8] flex items-center justify-center text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Experience</h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-bold mt-0.5 truncate max-w-[160px]">{experienceText}</p>
              </div>
            </div>

            {/* Card 4: Availability */}
            <div className="p-5 bg-[#fafafa] dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#eef2ff] dark:bg-purple-950/40 text-[#6366f1] dark:text-[#818cf8] flex items-center justify-center text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Availability</h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-bold mt-0.5">{availabilityText}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;