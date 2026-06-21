

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  aiTech: string[];
  results: string;
}

const aiProjects: CaseStudy[] = [
  {
    title: "Intelligent Code Reviewer",
    problem: "Manual code reviews are time-consuming for senior developers during sprints.",
    solution: "Integrated Gemini 1.5 Pro API to automatically scan Pull Requests for bugs and security vulnerabilities.",
    aiTech: ["Gemini API", "Node.js", "GitHub Webhooks"],
    results: "Reduced initial review time by 40%."
  },
  {
    title: "Smart Content Generator",
    problem: "Content creators struggle to maintain SEO consistency across large platforms.",
    solution: "Built a MERN application that uses OpenAI's GPT-4 to generate meta-descriptions and blog outlines based on keywords.",
    aiTech: ["OpenAI API", "React JS", "MongoDB"],
    results: "Generated 500+ SEO-optimized descriptions in seconds."
  },
  {
    title: "Customer Sentiment Tracker",
    problem: "Businesses cannot manually read thousands of feedback emails to gauge customer mood.",
    solution: "Developed a dashboard using Hugging Face Transformers to classify incoming feedback as Positive, Neutral, or Negative.",
    aiTech: ["Hugging Face", "Python/Flask", "React"],
    results: "92% accuracy in automated sentiment classification."
  }
];

const AICaseStudies: React.FC = () => {
  return (
    <section id="ai-projects" className="py-20 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <span className="inline-block text-xs font-bold text-indigo-400 tracking-widest uppercase mb-3">AI Integration</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AI Projects &{' '}
            <span className="text-indigo-400 font-mono">Case_Studies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Exploring the intersection of Full Stack Development and Artificial Intelligence.
            These projects focus on solving real-world business problems using LLMs and NLP.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {aiProjects.map((study, index) => (
            <div
              key={index}
              className="group relative p-7 rounded-3xl bg-gray-900 border border-gray-800 hover:border-indigo-500/60 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">AI Integration</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-5 group-hover:text-indigo-300 transition-colors leading-snug">
                  {study.title}
                </h3>

                <div className="space-y-4 mb-7">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1.5">The Problem</p>
                    <p className="text-sm text-gray-400 italic leading-relaxed">"{study.problem}"</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1.5">The AI Solution</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {study.aiTech.map((tech, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Outcome</span>
                  <span className="text-sm font-bold text-emerald-400">{study.results}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICaseStudies;