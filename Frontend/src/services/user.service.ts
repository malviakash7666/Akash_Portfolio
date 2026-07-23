import API from "../utils/api";

let publicProfilePromise: Promise<any> | null = null;
let skillsPromise: Promise<any> | null = null;
let experiencesPromise: Promise<any> | null = null;

const clearCache = () => {
  publicProfilePromise = null;
  skillsPromise = null;
  experiencesPromise = null;
};

export const userService = {
  // Authentication & Profile
  login: async (email: string, password: string) => {
    const response = await API.post("/users/login", { email, password });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await API.post("/users/verify-otp", { email, otp });
    return response.data;
  },

  getMe: async () => {
    const response = await API.get("/users/me");
    return response.data;
  },

  getPublicProfile: async () => {
    if (!publicProfilePromise) {
      publicProfilePromise = API.get("/users/profile")
        .then((res) => res.data)
        .catch((err) => {
          publicProfilePromise = null;
          throw err;
        });
    }
    return publicProfilePromise;
  },

  getHealth: async () => {
    const response = await API.get("/health");
    return response.data;
  },

  getPortfolio: async () => {
    const response = await API.get("/portfolio");
    return response.data;
  },

  updateProfile: async (profileData: {
    name?: string;
    bio?: string;
    heroDescription?: string;
    profileImage?: string;
    resumeUrl?: string;
    socialLinks?: Record<string, string>;
    adminTwoFactorEnabled?: boolean;
  }) => {
    clearCache();
    const response = await API.put("/users/profile", profileData);
    return response.data;
  },

  // Skills
  getSkills: async () => {
    if (!skillsPromise) {
      skillsPromise = API.get("/skills")
        .then((res) => res.data)
        .catch((err) => {
          skillsPromise = null;
          throw err;
        });
    }
    return skillsPromise;
  },

  createSkill: async (skillData: { name: string; level: string; category: string }) => {
    clearCache();
    const response = await API.post("/skills", skillData);
    return response.data;
  },

  updateSkill: async (id: number, skillData: { name?: string; level?: string; category?: string }) => {
    clearCache();
    const response = await API.put(`/skills/${id}`, skillData);
    return response.data;
  },

  deleteSkill: async (id: number) => {
    clearCache();
    const response = await API.delete(`/skills/${id}`);
    return response.data;
  },

  updateSkillsOrder: async (orderList: Array<{ id: number; category: string; level: string; name: string }>) => {
    clearCache();
    const response = await API.put("/skills/order", { orderList });
    return response.data;
  },

  // Projects
  getProjects: async (params?: { homepage?: boolean }) => {
    const response = await API.get("/projects", { params });
    return response.data;
  },

  getProjectById: async (id: number | string) => {
    const response = await API.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData: {
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
  }) => {
    clearCache();
    const response = await API.post("/projects", projectData);
    return response.data;
  },

  updateProject: async (
    id: number,
    projectData: {
      title?: string;
      problem?: string;
      implementation?: string;
      impact?: string;
      techStack?: string[];
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
  ) => {
    clearCache();
    const response = await API.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id: number) => {
    clearCache();
    const response = await API.delete(`/projects/${id}`);
    return response.data;
  },

  // Experiences
  getExperiences: async () => {
    if (!experiencesPromise) {
      experiencesPromise = API.get("/experiences")
        .then((res) => res.data)
        .catch((err) => {
          experiencesPromise = null;
          throw err;
        });
    }
    return experiencesPromise;
  },

  createExperience: async (expData: {
    role: string;
    company: string;
    location?: string;
    period: string;
    description: string[];
    current?: boolean;
  }) => {
    clearCache();
    const response = await API.post("/experiences", expData);
    return response.data;
  },

  updateExperience: async (
    id: number,
    expData: {
      role?: string;
      company?: string;
      location?: string;
      period?: string;
      description?: string[];
      current?: boolean;
    }
  ) => {
    clearCache();
    const response = await API.put(`/experiences/${id}`, expData);
    return response.data;
  },

  deleteExperience: async (id: number) => {
    clearCache();
    const response = await API.delete(`/experiences/${id}`);
    return response.data;
  },

  // Certificates
  getCertificates: async () => {
    const response = await API.get("/certificates");
    return response.data;
  },

  createCertificate: async (certData: {
    title: string;
    issuer: string;
    issueDate?: string;
    link?: string;
    image?: string;
  }) => {
    clearCache();
    const response = await API.post("/certificates", certData);
    return response.data;
  },

  updateCertificate: async (
    id: number,
    certData: {
      title?: string;
      issuer?: string;
      issueDate?: string;
      link?: string;
      image?: string;
    }
  ) => {
    clearCache();
    const response = await API.put(`/certificates/${id}`, certData);
    return response.data;
  },

  deleteCertificate: async (id: number) => {
    clearCache();
    const response = await API.delete(`/certificates/${id}`);
    return response.data;
  },

  // File Upload
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
