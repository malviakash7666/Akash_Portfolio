import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  bio?: string;
  heroDescription?: string;
  profileImage?: string;
  resumeUrl?: string;
  socialLinks?: Record<string, string>;
}

interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  current: boolean;
}

interface Project {
  id: number;
  title: string;
  problem?: string;
  implementation?: string;
  impact?: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  category?: string;
  image?: string;
  features?: string[];
  screenshots?: string[];
  architecture?: string;
  databaseDesign?: string;
  challenges?: string;
  learnings?: string;
  showOnHome?: boolean;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate?: string;
  link?: string;
  image?: string;
}

const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Data lists
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Profile Form state
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileHero, setProfileHero] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileResume, setProfileResume] = useState("");
  const [socialGithub, setSocialGithub] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [adminTwoFactorEnabled, setAdminTwoFactorEnabled] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  // Edit / Add Modal/Form states
  const [skillForm, setSkillForm] = useState({ id: 0, name: "", level: "Intermediate", category: "Frontend" });
  const [expForm, setExpForm] = useState<{ id: number; role: string; company: string; location: string; period: string; description: string[]; current: boolean }>({
    id: 0, role: "", company: "", location: "", period: "", description: [""], current: false
  });
  const [projectForm, setProjectForm] = useState<{
    id: number;
    title: string;
    problem: string;
    implementation: string;
    impact: string;
    techStack: string;
    liveLink: string;
    githubLink: string;
    category: string;
    image: string;
    features: string;
    screenshots: string;
    architecture: string;
    databaseDesign: string;
    challenges: string;
    learnings: string;
    showOnHome: boolean;
  }>({
    id: 0,
    title: "",
    problem: "",
    implementation: "",
    impact: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    category: "Full Stack",
    image: "",
    features: "",
    screenshots: "",
    architecture: "",
    databaseDesign: "",
    challenges: "",
    learnings: "",
    showOnHome: true,
  });
  const [certForm, setCertForm] = useState({ id: 0, title: "", issuer: "", issueDate: "", link: "", image: "" });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await userService.getMe();
      if (data.success && data.user.role === "admin") {
        setUser(data.user);
        loadDashboardData();
      } else {
        navigate("/admin/login", { replace: true });
      }
    } catch (err) {
      console.log("No authenticated admin session found.");
      navigate("/admin/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [skillsData, expData, projData, certData, meData] = await Promise.all([
        userService.getSkills(),
        userService.getExperiences(),
        userService.getProjects(),
        userService.getCertificates(),
        userService.getMe()
      ]);

      if (meData.success) {
        const u = meData.user;
        setUser(u);
        setProfileName(u.name || "");
        setProfileBio(u.bio || "");
        setProfileHero(u.heroDescription || "");
        setProfileImage(u.profileImage || "");
        setProfileResume(u.resumeUrl || "");
        setSocialGithub(u.socialLinks?.github || "");
        setSocialLinkedin(u.socialLinks?.linkedin || "");
        setSocialTwitter(u.socialLinks?.twitter || "");
        setAdminTwoFactorEnabled(u.adminTwoFactorEnabled || false);
      }

      if (skillsData.success) setSkills(skillsData.skills);
      if (expData.success) setExperiences(expData.experiences);
      if (projData.success) setProjects(projData.projects);
      if (certData.success) setCertificates(certData.certificates);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "resume" | "project" | "cert" | "screenshot") => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const res = await userService.uploadFile(file);
      if (res.success) {
        if (type === "profile") setProfileImage(res.url);
        else if (type === "resume") setProfileResume(res.url);
        else if (type === "project") setProjectForm({ ...projectForm, image: res.url });
        else if (type === "cert") setCertForm({ ...certForm, image: res.url });
        else if (type === "screenshot") {
          const current = projectForm.screenshots;
          const updated = current ? `${current}, ${res.url}` : res.url;
          setProjectForm({ ...projectForm, screenshots: updated });
        }
      }
    } catch (err) {
      alert("File upload failed!");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      const res = await userService.updateProfile({
        name: profileName,
        bio: profileBio,
        heroDescription: profileHero,
        profileImage: profileImage,
        resumeUrl: profileResume,
        socialLinks: {
          github: socialGithub,
          linkedin: socialLinkedin,
          twitter: socialTwitter
        },
        adminTwoFactorEnabled: adminTwoFactorEnabled
      });
      if (res.success) {
        setProfileMsg("Profile updated successfully!");
        setUser(res.user);
      }
    } catch (err) {
      setProfileMsg("Error updating profile.");
    }
  };

  // Skill Handlers
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (skillForm.id === 0) {
        await userService.createSkill({ name: skillForm.name, level: skillForm.level, category: skillForm.category });
      } else {
        await userService.updateSkill(skillForm.id, { name: skillForm.name, level: skillForm.level, category: skillForm.category });
      }
      setSkillForm({ id: 0, name: "", level: "Intermediate", category: "Frontend" });
      const skillsData = await userService.getSkills();
      if (skillsData.success) setSkills(skillsData.skills);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await userService.deleteSkill(id);
      const skillsData = await userService.getSkills();
      if (skillsData.success) setSkills(skillsData.skills);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveSkill = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= skills.length) return;

    const list = [...skills];
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;

    // Send the list to bulk update
    try {
      await userService.updateSkillsOrder(list);
      setSkills(list);
    } catch (err) {
      console.error(err);
    }
  };

  // Experience Handlers
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const expData = {
        role: expForm.role,
        company: expForm.company,
        location: expForm.location,
        period: expForm.period,
        description: expForm.description.filter(bullet => bullet.trim() !== ""),
        current: expForm.current
      };

      if (expForm.id === 0) {
        await userService.createExperience(expData);
      } else {
        await userService.updateExperience(expForm.id, expData);
      }

      setExpForm({ id: 0, role: "", company: "", location: "", period: "", description: [""], current: false });
      const res = await userService.getExperiences();
      if (res.success) setExperiences(res.experiences);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await userService.deleteExperience(id);
      const res = await userService.getExperiences();
      if (res.success) setExperiences(res.experiences);
    } catch (err) {
      console.error(err);
    }
  };

  // Project Handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        title: projectForm.title,
        problem: projectForm.problem,
        implementation: projectForm.implementation,
        impact: projectForm.impact,
        techStack: projectForm.techStack.split(",").map(t => t.trim()).filter(t => t !== ""),
        liveLink: projectForm.liveLink,
        githubLink: projectForm.githubLink,
        category: projectForm.category,
        image: projectForm.image,
        features: projectForm.features.split("\n").map(f => f.trim()).filter(f => f !== ""),
        screenshots: projectForm.screenshots.split(",").map(s => s.trim()).filter(s => s !== ""),
        architecture: projectForm.architecture,
        databaseDesign: projectForm.databaseDesign,
        challenges: projectForm.challenges,
        learnings: projectForm.learnings,
        showOnHome: projectForm.showOnHome
      };

      if (projectForm.id === 0) {
        await userService.createProject(projectData);
      } else {
        await userService.updateProject(projectForm.id, projectData);
      }

      setProjectForm({
        id: 0,
        title: "",
        problem: "",
        implementation: "",
        impact: "",
        techStack: "",
        liveLink: "",
        githubLink: "",
        category: "Full Stack",
        image: "",
        features: "",
        screenshots: "",
        architecture: "",
        databaseDesign: "",
        challenges: "",
        learnings: "",
        showOnHome: true,
      });
      const res = await userService.getProjects();
      if (res.success) setProjects(res.projects);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await userService.deleteProject(id);
      const res = await userService.getProjects();
      if (res.success) setProjects(res.projects);
    } catch (err) {
      console.error(err);
    }
  };

  // Certificate Handlers
  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (certForm.id === 0) {
        await userService.createCertificate(certForm);
      } else {
        await userService.updateCertificate(certForm.id, certForm);
      }

      setCertForm({ id: 0, title: "", issuer: "", issueDate: "", link: "", image: "" });
      const res = await userService.getCertificates();
      if (res.success) setCertificates(res.certificates);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await userService.deleteCertificate(id);
      const res = await userService.getCertificates();
      if (res.success) setCertificates(res.certificates);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-xl font-bold animate-pulse">Loading Admin Portal...</div>
      </div>
    );
  }

  // 💻 Authenticated Dashboard UI
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1 truncate">{user.email}</p>
          </div>
          
          <nav className="p-4 space-y-1">
            {[
              { id: "profile", label: "👤 Profile" },
              { id: "skills", label: "💻 Skills" },
              { id: "experience", label: "💼 Experience" },
              { id: "projects", label: "🚀 Projects" },
              { id: "certificates", label: "🏆 Certificates" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-sm transition-colors"
          >
            ← View Portfolio
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            
            {profileMsg && (
              <div className="mb-4 p-3 bg-purple-950/40 border border-purple-500/30 text-purple-300 rounded-lg text-sm">
                {profileMsg}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-6 bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image (URL or Upload)</label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={profileImage}
                      onChange={(e) => setProfileImage(e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 text-sm"
                    />
                    <label className="cursor-pointer bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "profile")}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Hero Headline</label>
                <input
                  type="text"
                  value={profileHero}
                  onChange={(e) => setProfileHero(e.target.value)}
                  placeholder="Software Engineer building awesome projects"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bio / About Me</label>
                <textarea
                  rows={4}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Resume PDF (URL or Upload)</label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={profileResume}
                      onChange={(e) => setProfileResume(e.target.value)}
                      placeholder="Resume PDF URL"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 text-sm"
                    />
                    <label className="cursor-pointer bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-colors">
                      Upload PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "resume")}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold border-t border-slate-800 pt-6">Security Settings</h3>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="adminTwoFactorEnabled"
                  checked={adminTwoFactorEnabled}
                  onChange={(e) => setAdminTwoFactorEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="adminTwoFactorEnabled" className="text-sm font-medium text-slate-300 cursor-pointer">
                  Enable Email OTP Two-Factor Authentication (2FA) for login
                </label>
              </div>

              <h3 className="text-lg font-bold border-t border-slate-800 pt-6">Social Connections</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
                  <input
                    type="text"
                    value={socialGithub}
                    onChange={(e) => setSocialGithub(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn URL</label>
                  <input
                    type="text"
                    value={socialLinkedin}
                    onChange={(e) => setSocialLinkedin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Twitter URL</label>
                  <input
                    type="text"
                    value={socialTwitter}
                    onChange={(e) => setSocialTwitter(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Skills Management</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveSkill} className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. React"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                />
              </div>

              <div className="w-48">
                <label className="block text-sm font-medium text-slate-300 mb-2">Level</label>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="w-48">
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap">
                  {skillForm.id === 0 ? "Add Skill" : "Update"}
                </button>
                {skillForm.id !== 0 && (
                  <button
                    type="button"
                    onClick={() => setSkillForm({ id: 0, name: "", level: "Intermediate", category: "Frontend" })}
                    className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-300 text-left text-sm">
                    <th className="px-6 py-3">Order</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Level</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {skills.map((skill, index) => (
                    <tr key={skill.id} className="hover:bg-slate-800/30">
                      <td className="px-6 py-3 flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveSkill(index, "up")}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 rounded"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSkill(index, "down")}
                          disabled={index === skills.length - 1}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 rounded"
                        >
                          ▼
                        </button>
                      </td>
                      <td className="px-6 py-3 font-semibold">{skill.name}</td>
                      <td className="px-6 py-3">{skill.level}</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-slate-800 rounded text-slate-300 text-xs">
                          {skill.category}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right space-x-2">
                        <button
                          onClick={() => setSkillForm({ id: skill.id, name: skill.name, level: skill.level, category: skill.category })}
                          className="text-indigo-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Experience Management</h2>

            {/* Form */}
            <form onSubmit={handleSaveExperience} className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Role</label>
                  <input
                    type="text"
                    required
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    placeholder="e.g. Full Stack Developer"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                  <input
                    type="text"
                    required
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    placeholder="e.g. Google"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={expForm.location}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    placeholder="e.g. Remote / Bangalore"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Period</label>
                  <input
                    type="text"
                    required
                    value={expForm.period}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    placeholder="e.g. Jan 2026 - Present"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={expForm.current}
                      onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })}
                      className="w-4 h-4 rounded accent-purple-600"
                    />
                    <span className="ml-2 text-sm text-slate-300 font-medium">Currently Working Here</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description Bullets</label>
                {expForm.description.map((bullet, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const temp = [...expForm.description];
                        temp[idx] = e.target.value;
                        setExpForm({ ...expForm, description: temp });
                      }}
                      placeholder={`Bullet point ${idx + 1}`}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const temp = expForm.description.filter((_, i) => i !== idx);
                        setExpForm({ ...expForm, description: temp.length ? temp : [""] });
                      }}
                      className="text-red-400 hover:text-red-300 text-sm font-semibold px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setExpForm({ ...expForm, description: [...expForm.description, ""] })}
                  className="mt-2 text-xs font-semibold text-purple-400 hover:text-purple-300"
                >
                  + Add Bullet
                </button>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                  {expForm.id === 0 ? "Save Experience" : "Update Experience"}
                </button>
                {expForm.id !== 0 && (
                  <button
                    type="button"
                    onClick={() => setExpForm({ id: 0, role: "", company: "", location: "", period: "", description: [""], current: false })}
                    className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <p className="text-sm text-purple-400 font-medium">{exp.company} - {exp.location}</p>
                    <p className="text-xs text-slate-400">{exp.period}</p>
                    <ul className="list-disc list-inside mt-3 space-y-1 text-slate-300 text-sm">
                      {exp.description.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => setExpForm({ id: exp.id, role: exp.role, company: exp.company, location: exp.location || "", period: exp.period, description: exp.description, current: exp.current })}
                      className="text-indigo-400 hover:underline text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="text-red-400 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Projects Management</h2>

            <form onSubmit={handleSaveProject} className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="e.g. Full Stack / Mobile / AI"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  placeholder="React, Node.js, Express, PostgreSQL"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
                  <input
                    type="text"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Live Demo URL</label>
                  <input
                    type="text"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Problem Statement</label>
                  <textarea
                    rows={3}
                    value={projectForm.problem}
                    onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Implementation details</label>
                  <textarea
                    rows={3}
                    value={projectForm.implementation}
                    onChange={(e) => setProjectForm({ ...projectForm, implementation: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Project Impact</label>
                  <textarea
                    rows={3}
                    value={projectForm.impact}
                    onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Image (URL or Upload)</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="Screenshot URL"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 text-sm"
                  />
                  <label className="cursor-pointer bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-colors flex items-center justify-center">
                    Upload Screen
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "project")}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Key Features (One feature per line)</label>
                <textarea
                  rows={3}
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Screenshots (Comma-separated URLs or upload screenshots below)</label>
                <div className="flex gap-4 mb-2">
                  <textarea
                    rows={2}
                    value={projectForm.screenshots}
                    onChange={(e) => setProjectForm({ ...projectForm, screenshots: e.target.value })}
                    placeholder="https://example.com/shot1.png, https://example.com/shot2.png"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none text-sm"
                  />
                  <label className="cursor-pointer bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-colors flex items-center justify-center">
                    Upload Shot
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "screenshot")}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">System Architecture</label>
                <textarea
                  rows={2}
                  value={projectForm.architecture}
                  onChange={(e) => setProjectForm({ ...projectForm, architecture: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Database Design</label>
                <textarea
                  rows={2}
                  value={projectForm.databaseDesign}
                  onChange={(e) => setProjectForm({ ...projectForm, databaseDesign: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Challenges Faced</label>
                  <textarea
                    rows={3}
                    value={projectForm.challenges}
                    onChange={(e) => setProjectForm({ ...projectForm, challenges: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Key Learnings</label>
                  <textarea
                    rows={3}
                    value={projectForm.learnings}
                    onChange={(e) => setProjectForm({ ...projectForm, learnings: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showOnHome"
                  checked={projectForm.showOnHome}
                  onChange={(e) => setProjectForm({ ...projectForm, showOnHome: e.target.checked })}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="showOnHome" className="text-sm font-medium text-slate-300 cursor-pointer">
                  Show on Home Page
                </label>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer">
                  {projectForm.id === 0 ? "Create Project" : "Update Project"}
                </button>
                {projectForm.id !== 0 && (
                  <button
                    type="button"
                    onClick={() => setProjectForm({ id: 0, title: "", problem: "", implementation: "", impact: "", techStack: "", liveLink: "", githubLink: "", category: "Full Stack", image: "", features: "", screenshots: "", architecture: "", databaseDesign: "", challenges: "", learnings: "", showOnHome: true })}
                    className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
                  <div>
                    {proj.image && (
                      <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover border-b border-slate-800" />
                    )}
                    <div className="p-6">
                      <span className="px-2.5 py-0.5 bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs rounded-full font-medium">
                        {proj.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2">{proj.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0 flex gap-4 border-t border-slate-800/50 mt-4">
                    <button
                      onClick={() => {
                        const techStr = Array.isArray(proj.techStack) ? proj.techStack.join(", ") : "";
                        const featStr = Array.isArray(proj.features) ? proj.features.join("\n") : "";
                        const screenStr = Array.isArray(proj.screenshots) ? proj.screenshots.join(", ") : "";
                        setProjectForm({
                          id: proj.id,
                          title: proj.title,
                          problem: proj.problem || "",
                          implementation: proj.implementation || "",
                          impact: proj.impact || "",
                          techStack: techStr,
                          liveLink: proj.liveLink || "",
                          githubLink: proj.githubLink || "",
                          category: proj.category || "",
                          image: proj.image || "",
                          features: featStr,
                          screenshots: screenStr,
                          architecture: proj.architecture || "",
                          databaseDesign: proj.databaseDesign || "",
                          challenges: proj.challenges || "",
                          learnings: proj.learnings || "",
                          showOnHome: proj.showOnHome !== false
                        });
                      }}
                      className="text-indigo-400 hover:underline text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-red-400 hover:underline text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Certificates Management</h2>

            {/* Form */}
            <form onSubmit={handleSaveCertificate} className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Certificate Title</label>
                  <input
                    type="text"
                    required
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Issuer</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Issue Date</label>
                  <input
                    type="text"
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                    placeholder="e.g. Dec 2025"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Verification Link</label>
                  <input
                    type="text"
                    value={certForm.link}
                    onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Certificate Image / Badge (URL or Upload)</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={certForm.image}
                    onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                    placeholder="Image URL"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 text-sm"
                  />
                  <label className="cursor-pointer bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-colors">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "cert")}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                  {certForm.id === 0 ? "Save Certificate" : "Update Certificate"}
                </button>
                {certForm.id !== 0 && (
                  <button
                    type="button"
                    onClick={() => setCertForm({ id: 0, title: "", issuer: "", issueDate: "", link: "", image: "" })}
                    className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6 flex justify-between items-start">
                  <div>
                    {cert.image && (
                      <img src={cert.image} alt={cert.title} className="w-12 h-12 rounded object-cover mb-4" />
                    )}
                    <h3 className="text-lg font-bold">{cert.title}</h3>
                    <p className="text-sm text-purple-400 font-medium">{cert.issuer}</p>
                    <p className="text-xs text-slate-400">{cert.issueDate}</p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline mt-2 inline-block">
                        Verify Certification ↗
                      </a>
                    )}
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => setCertForm({ id: cert.id, title: cert.title, issuer: cert.issuer, issueDate: cert.issueDate || "", link: cert.link || "", image: cert.image || "" })}
                      className="text-indigo-400 hover:underline text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCertificate(cert.id)}
                      className="text-red-400 hover:underline text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPage;
