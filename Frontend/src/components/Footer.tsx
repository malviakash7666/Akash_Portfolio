import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

const Footer: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getPublicProfile();
        if (res.success) {
          setProfile(res.profile);
        }
      } catch (err) {
        console.error("Error loading profile in Footer:", err);
      }
    };
    fetchProfile();
  }, []);

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
      leetcode: "https://leetcode.com/u/akashmalvi7666/",
    };
  })();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#0b0f19] dark:bg-[#030014] text-slate-400 py-16 border-t border-slate-800 transition-colors duration-500 text-left">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Left Column: Logo & Tagline (5 columns) */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleScrollToTop(e); window.history.pushState(null, '', '/'); }}
              className="flex items-center text-lg font-bold tracking-tight text-white group"
            >
              <span className="text-[#6366f1] font-extrabold font-mono">&lt;/&gt;</span>
              <span className="ml-2 hover:text-[#6366f1] dark:hover:text-[#818cf8] transition-colors">
                {profile?.name || "Akash Malvi"}
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building modern, scalable and user-friendly web applications.
            </p>
          </div>

          {/* Center Column: Quick Links (4 columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-slate-500 tracking-widest">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href === '/') {
                      handleScrollToTop(e);
                      window.history.pushState(null, '', '/');
                    } else {
                      const sectionId = item.href.substring(1);
                      const element = document.getElementById(sectionId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', item.href);
                      }
                    }
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Connect (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-slate-500 tracking-widest">Connect</h4>
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href={parsedSocials.github || "https://github.com/malviakash7666"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={parsedSocials.linkedin || "https://www.linkedin.com/in/akash-malvi-50313b281"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Mail */}
              <a
                href={`mailto:${profile?.email || "akashmalvi7666@gmail.com"}`}
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h-3a2 2 0 01-2-2V7a2 2 0 012-2h3M9 19a2 2 0 002 2h3a2 2 0 002-2m-8-2h8" />
                </svg>
              </a>

              {/* LeetCode */}
              <a
                href={parsedSocials.leetcode || "https://leetcode.com/u/akashmalvi7666/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.77 9.77a1.375 1.375 0 0 0-.025 1.92l.025.025a1.375 1.375 0 0 0 1.917.025l9.77-9.77A1.375 1.375 0 0 0 13.483 0zm-5.69 7.03a1.375 1.375 0 0 0-.973.405L.409 13.85c-.545.543-.545 1.423 0 1.965l3.778 3.778c.542.545 1.422.545 1.965 0l6.413-6.413a1.378 1.378 0 0 0-.97-2.353H7.793zm10.748 1.258a1.375 1.375 0 0 0-.97.402l-6.417 6.417a1.375 1.375 0 0 0 0 1.944l3.777 3.777c.537.538 1.408.538 1.945 0l6.418-6.417c.537-.537.537-1.408 0-1.945l-3.777-3.777a1.375 1.375 0 0 0-.976-.401z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-semibold gap-4">
          <p>© {new Date().getFullYear()} {profile?.name || "Akash Malvi"}. All rights reserved.</p>
          <p>Designed & Built with ❤️ by {profile?.name || "Akash Malvi"}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
