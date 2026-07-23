import React, { useState } from 'react';
import { usePortfolioQuery } from '../hooks/usePortfolio';

const Contact: React.FC = () => {
  const { data } = usePortfolioQuery();
  const profile = data?.profile;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xaqgvjlv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        alert("Message sent successfully!");
      } else {
        alert("Oops! There was a problem submitting your message. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = profile?.resumeUrl || '/Akash.Malvi.pdf';
    link.download = 'Akash_Malvi_FullStack_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parsedSocials = (() => {
    try {
      if (profile?.socialLinks) {
        return typeof profile.socialLinks === 'string' 
          ? JSON.parse(profile.socialLinks) 
          : profile.socialLinks;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      github: "https://github.com/malviakash7666",
      linkedin: "https://www.linkedin.com/in/akash-malvi-50313b281",
    };
  })();

  return (
    <section id="contact" className="relative py-28 bg-[#030014] overflow-hidden transition-colors duration-500">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Let's Connect Details */}
          <div className="space-y-8 text-left">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-950/45 border border-purple-800/30 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                Open for Opportunities
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Let's build something <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">amazing together 🚀</span>
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Looking for a Full-Stack Engineer who can build scalable web applications, optimize backend queries, and deliver robust user experiences? Reach out today—I typically respond in under 12 hours.
            </p>

            {/* Direct Quick-Action Links Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email Card */}
              <a
                href={`mailto:${profile?.email || 'malviakash7666@gmail.com'}`}
                className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-center gap-3 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  ✉️
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Email</span>
                  <span className="text-white font-bold text-xs truncate block hover:text-purple-300">
                    {profile?.email || 'malviakash7666@gmail.com'}
                  </span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={parsedSocials.linkedin || "https://www.linkedin.com/in/akash-malvi-50313b281"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-center gap-3 hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  💼
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">LinkedIn</span>
                  <span className="text-white font-bold text-xs truncate block hover:text-indigo-300">
                    Akash Malvi
                  </span>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={parsedSocials.github || "https://github.com/malviakash7666"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-center gap-3 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  🐙
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">GitHub</span>
                  <span className="text-white font-bold text-xs truncate block hover:text-purple-300">
                    @malviakash7666
                  </span>
                </div>
              </a>

              {/* Download Resume Card */}
              <button
                onClick={handleDownloadResume}
                className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-center gap-3 hover:border-emerald-500/40 transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  📄
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Resume</span>
                  <span className="text-white font-bold text-xs truncate block hover:text-emerald-300">
                    Download PDF
                  </span>
                </div>
              </button>

            </div>

          </div>

          {/* Right Column: Form */}
          <div className="bg-[#090b16]/40 border border-slate-900 p-8 sm:p-10 rounded-3xl shadow-xl backdrop-blur-md text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-left font-mono">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-5 py-3.5 text-sm rounded-xl bg-[#030014]/60 border border-slate-800 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-left font-mono">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-3.5 text-sm rounded-xl bg-[#030014]/60 border border-slate-800 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-left font-mono">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, job opportunity, or collaboration idea..."
                  className="w-full px-5 py-3.5 text-sm rounded-xl bg-[#030014]/60 border border-slate-800 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting
                    ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-98 shadow-lg shadow-purple-900/20'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <span>Send Message 🚀</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;