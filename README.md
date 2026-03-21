# NxtGenSec | Frontend Engine Documentation

[![Framework: Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-black.svg)](https://nextjs.org)
[![UI: Tailwind CSS v4](https://img.shields.io/badge/UI-Tailwind%20CSS%20v4-blue.svg)](https://tailwindcss.com)
[![State: Zustand](https://img.shields.io/badge/State-Zustand-orange.svg)](https://zustand-demo.pmnd.rs)

The **NxtGenSec Frontend** is a high-fidelity, React-powered interface designed for millisecond-latency interaction and real-time achievement broadcasting. It leverages Next.js 16's App Router for optimized server-side rendering and edge delivery.

---

## 🏛️ UI/UX Architecture

Our design system follows a **"Cyber-Premium"** aesthetic, utilizing high-contrast HSL color palettes, Glassmorphism, and Framer Motion micro-animations.

### Key Components
- **`SignalListener`**: Root-level real-time engine that processes incoming Socket.io achievement and status nodes without UI blocking.
- **`Telemetry Hub`**: Interactive React-based charts using **Recharts** for visualized platform growth.
- **`Search Intelligence`**: Client-side and server-side search providers integrated with the backend global crawler.

---

## 📂 Internal Directory Map

- **`app/`**: Route definitions following the Next.js 16 App Router standard.
  - **`admin/`**: Elevated clearance dashboards for L3 system management.
  - **`organizer/`**: Role-specific terminal for event orchestration.
  - **`dashboard/`**: Developer workspaces and submission registries.
  - **`docs/`**: Dynamic knowledge base for platform intelligence.
- **`components/`**: Modularized UI elements (Dashboards, Tables, Loaders).
- **`store/`**: Global state management via Zustand (Auth sessions, UI states).
- **`lib/`**: Axios interceptors, Signal handlers, and identity validation scripts.

---

## 📡 Real-Time Protocol

We utilize **Socket.io-client** to synchronize state between the client and the persistent backend node. 
- ** achievement_trigger**: Broadcasts high-fidelity signals when projects are verified.
- ** system_pulse**: Synchronizes platform-wide telemetry without page reloads.

---

## ⚙️ Development Ignition

### 1. Configure Local Node
Ensure `frontend/.env.local` contains the correct backend terminal path:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Launch Sequence
```bash
npm install
npm run dev
```

---

© 2026 NxtGenSec Frontend Group. Built for the future of global innovation.
