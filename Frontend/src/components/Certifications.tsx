import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  link: string;
  image: string | null;
}

const Certifications: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await userService.getCertificates();
        if (res.success) {
          setCertificates(res.certificates);
        }
      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const iconColors = [
    { bg: "bg-[#fef2f2] dark:bg-red-950/20", text: "text-[#ef4444]", border: "border-red-100 dark:border-red-900/20" },
    { bg: "bg-[#fffbeb] dark:bg-amber-950/20", text: "text-[#f59e0b]", border: "border-amber-100 dark:border-amber-900/20" },
    { bg: "bg-[#eff6ff] dark:bg-blue-950/20", text: "text-[#3b82f6]", border: "border-blue-100 dark:border-blue-900/20" },
    { bg: "bg-[#f0fdf4] dark:bg-emerald-950/20", text: "text-[#10b981]", border: "border-emerald-100 dark:border-emerald-900/20" }
  ];

  return (
    <section id="certifications" className="py-24 bg-white dark:bg-[#030014] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="space-y-3 mb-16 text-left">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Certifications
          </h2>
          {/* Purple underline */}
          <div className="w-12 h-1 bg-[#6366f1] rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert: Certificate, index: number) => {
            const colorScheme = iconColors[index % iconColors.length];
            return (
              <a
                key={cert.id || index}
                href={cert.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4.5 bg-white dark:bg-slate-900/60 border border-slate-150 dark:border-slate-850 hover:border-[#6366f1]/35 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 text-left"
              >
                {/* Left side: Icon block */}
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} group-hover:scale-105 transition-transform`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>

                {/* Right side: Certificate Details */}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-[#6366f1] transition-colors leading-tight truncate">
                    {cert.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-0.5 truncate">
                    {cert.issuer}
                  </p>
                  <p className="text-slate-400 dark:text-slate-550 text-[10px] font-mono mt-0.5">
                    {cert.issueDate || "2024"}
                  </p>
                </div>
              </a>
            );
          })}
          {certificates.length === 0 && !loading && (
            <div className="col-span-full text-slate-400 text-sm italic py-4">
              No certifications listed.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
