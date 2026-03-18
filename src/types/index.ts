export interface Project {
  id: string;
  _id?: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  demo_url?: string;
  image?: string;
  created_by: string | { name: string; username: string };
  stars: number;
  starred_by?: string[];
  status?: 'pending' | 'auditing' | 'verified';
  hackathon_id?: string;
  score?: number;
  createdAt?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  prize_pool: string;
  registration_link: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'judge' | 'developer' | 'viewer';
  avatar_url?: string;
  bio?: string;
  location?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  skills?: string[];
  onboarded?: boolean;
  social_links?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}
