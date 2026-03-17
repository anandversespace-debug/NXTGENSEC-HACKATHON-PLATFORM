# NxtGenSec Innovation Ecosystem | Platform Documentation

## Overview
The **NxtGenSec Innovation Ecosystem** is a decentralized developer hub built with **Next.js 16**, **Express**, and **Supabase**. It serves as a comprehensive registry for digital innovations, community hackathons, and platform audits.

---

## Tech Stack
### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS, Lucide icons
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Authentication**: Supabase SSR Auth

### Backend
- **Server**: Express Node.js
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Cloudinary
- **Security**: Helmet, Rate Limiting, CORS

---

## Navigation Topology (Routes)

### 1. Global Presence
- **`/` (Index)**: The landing interface. Showcases the core mission and ecosystem highlights.
- **`/login`**: Identity verification gateway.
- **`/signup`**: Self-registration for new innovation nodes.

### 2. Community Layer
- **`/projects`**: The decentralized repository for platform innovations. Users can explore and filter submitted solutions.
- **`/projects/[id]`**: Detailed node analysis. Technical specifications and audit status.
- **`/projects/new`**: Initialization of a new innovation node.
- **`/hackathons`**: Registry of active sprint challenges and developmental events.
- **`/hackathons/[id]`**: Event-specific details and registration requirements.
- **`/blog`**: Platform updates, ecosystem news, and technical audits.
- **`/blog/[id]`**: Detailed technical documentation for specific entries.

### 3. User Workspace
- **`/dashboard`**: Personal operations center. View active projects, participation metrics, and recent activity.
- **`/profile`**: Primary identity management interface.
- **`/profile/[username]`**: Public identity profile within the ecosystem.
- **`/settings`**: Personal preference configuration for the ecosystem environment.

### 4. Administrative Control (Protected)
- **`/admin`**: Global dashboard for ecosystem metrics and pending reviews.
- **`/admin/users`**: User lifecycle management and identity verification.
- **`/admin/projects`**: Global project management and audit review.
- **`/admin/hackathons`**: Orchestration of community events.
- **`/admin/judging`**: Evaluation interface for challenge submissions.
- **`/admin/inbox`**: System-wide communication and user reporting.
- **`/admin/settings`**: Core system configuration and platform parameters.

---

## Deployment & Production
The platform is optimized for **Vercel** with dedicated `vercel.json` configurations in the root directory for monorepo deployments, or subdirectory-specific files for standalone hosting.

---

## Core Operational Logic
The platform uses **Supabase** for real-time authentication and data synchronization. The frontend communicates with the **BACKEND** API via the `NEXT_PUBLIC_API_URL` environment variable.
