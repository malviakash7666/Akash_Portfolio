
import experienceData from "../utils/experience.json";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  current: boolean;
}

const Experience: React.FC = () => {
  const { experiences } = experienceData;

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">My Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="text-indigo-600 dark:text-indigo-400">Experience</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">My professional journey and academic background.</p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-200 dark:before:via-purple-800 before:to-transparent">

          {experiences.map((exp: ExperienceItem, index: number) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">

              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 group-hover:bg-purple-600 dark:group-hover:bg-purple-600 group-hover:text-white text-gray-400 dark:text-gray-500 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 z-10">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57c0 .542-.312 1.034-.792 1.28l-5.416 2.78a.75.75 0 01-.684 0l-5.416-2.78A1.427 1.427 0 014 11.57V8a2 2 0 012-2h2zm2 0h4v-1a1 1 0 00-1-1H9a1 1 0 00-1 1v1z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:border-purple-500/30 hover:shadow-lg dark:hover:shadow-purple-500/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-gray-900 dark:text-white">{exp.role}</div>
                  {exp.current && (
                    <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-green-200 dark:border-green-800">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-2">{exp.company}</div>
                <time className="font-mono text-xs text-gray-400 dark:text-gray-500 block mb-4">
                  {exp.period} · {exp.location}
                </time>

                <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2 list-none">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-400 dark:bg-indigo-500 rounded-full shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;