import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";

export interface PortfolioData {
  success: boolean;
  profile: {
    name: string;
    bio: string;
    heroDescription: string;
    profileImage: string;
    resumeUrl: string;
    email?: string;
    socialLinks: string | Record<string, string>;
  } | null;
  skills: Array<{ id: number; name: string; level?: string; category: string }>;
  projects: Array<{
    id: number;
    title: string;
    problem?: string;
    implementation?: string;
    impact?: string;
    techStack: string | string[];
    liveLink?: string;
    githubLink?: string;
    category?: string;
    image?: string | null;
    features?: string | string[];
    screenshots?: string | string[];
    architecture?: string;
    databaseDesign?: string;
    challenges?: string;
    learnings?: string;
    showOnHome?: boolean;
  }>;
  experience: Array<{
    role: string;
    company: string;
    location?: string;
    period: string;
    description: string | string[];
    current?: boolean;
  }>;
  experiences?: Array<{
    role: string;
    company: string;
    location?: string;
    period: string;
    description: string | string[];
    current?: boolean;
  }>;
  education?: any[];
}

export const usePortfolioQuery = () => {
  return useQuery<PortfolioData>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      // 1. Wake up Render database via health check
      try {
        await userService.getHealth();
      } catch (err) {
        console.warn("Backend health check failed, trying to retrieve portfolio directly...", err);
      }

      // 2. Fetch unified portfolio data
      const data = await userService.getPortfolio();
      return data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });
};
