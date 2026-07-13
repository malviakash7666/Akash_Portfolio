import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

const Contact: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await userService.getPublicProfile();
        if (res.success) {
          setProfile(res.profile);
        }
      } catch (err) {
        console.error("Error loading profile in Contact:", err);
      }
    };
    fetchProfileData();
  }, []);

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

  const emailVal = "akashmalvi7666@gmail.com";
  const phoneVal = "+91 87669 31232";
  const locationVal = "Nagpur, Maharashtra";

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
              <div className="inline-flex items-center px-4.5 py-1.5 rounded-full bg-purple-950/45 border border-purple-800/30 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                Let's Partner
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Connect.</span>
              </h2>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Looking for a Full-Stack Engineer (React + Node.js) who can optimize backend queries, design scalable sockets, and build robust interfaces? Reach out today—I typically respond in under 12 hours.
            </p>

            {/* Direct Email Card */}
            <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-[#6366f1]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-950/50 text-[#818cf8] flex items-center justify-center text-xl shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 11H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Direct Email</span>
                <a href={`mailto:${profile?.email || 'malviakash7666@gmail.com'}`} className="text-white hover:text-[#818cf8] transition-colors font-bold text-sm sm:text-base break-all">
                  {profile?.email || 'malviakash7666@gmail.com'}
                </a>
              </div>
            </div>

            {/* Current Location Card */}
            <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-[#6366f1]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-950/50 text-[#818cf8] flex items-center justify-center text-xl shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Location</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  Nagpur, India (Open to Remote / Relocation)
                </span>
              </div>
            </div>

            {/* Profile buttons */}
            <div className="flex gap-4 pt-4">
              <a
                href={parsedSocials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 border border-slate-900 hover:border-slate-800 bg-[#090b16]/65 hover:bg-slate-900 text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub Profile
              </a>
              <a
                href={parsedSocials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 border border-slate-900 hover:border-slate-800 bg-[#090b16]/65 hover:bg-slate-900 text-white rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#090b16]/40 border border-slate-900 p-8 sm:p-10 rounded-3xl shadow-xl backdrop-blur-md text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-5 py-3.5 text-sm rounded-xl bg-[#030014]/60 border border-slate-800 text-white placeholder-slate-600 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-3.5 text-sm rounded-xl bg-[#030014]/60 border border-slate-800 text-white placeholder-slate-600 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, job opportunity, or collaboration idea..."
                  className="w-full px-5 py-3.5 text-sm rounded-xl bg-[#030014]/60 border border-slate-800 text-white placeholder-slate-600 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting
                    ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                    : 'bg-[#9333ea] hover:bg-[#a855f7] active:scale-98 shadow-lg shadow-purple-900/10'
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