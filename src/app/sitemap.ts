import { MetadataRoute } from 'next';

const BASE_URL = 'http://localhost:3000'; // Replace with production URL when deploying

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const routes = [
    '',
    '/community',
    '/leaderboard',
    '/hackathons',
    '/about',
    '/policies',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Potential Dynamic Content Fetch (Projects & Users)
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    // Fetch Projects
    const projectsRes = await fetch(`${apiBase}/projects`);
    const projects = projectsRes.ok ? await projectsRes.json() : [];
    
    const projectRoutes = projects.map((p: any) => ({
      url: `${BASE_URL}/projects/${p._id}`,
      lastModified: new Date(p.updatedAt || p.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Fetch Users
    const usersRes = await fetch(`${apiBase}/users`);
    const users = usersRes.ok ? await usersRes.json() : [];
    
    const userRoutes = users.map((u: any) => ({
      url: `${BASE_URL}/profile/${u.username}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...routes, ...projectRoutes, ...userRoutes];
  } catch (err) {
    console.warn('[SEO_SITEMAP] Critical Fetch Error:', err);
    return routes;
  }
}
