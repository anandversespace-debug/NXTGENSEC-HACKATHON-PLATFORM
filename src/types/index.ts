export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  demo_url?: string;
  created_by: string;
  stars: number;
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
  social_links?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}
