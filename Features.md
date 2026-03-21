# Platform Features & Integrations Registry

This document serves as the central repository for all functional protocol modules and external mission-critical integrations configured on the Hackathon OS platform.

## 1. Core Authentication & Identity Node
The platform utilizes a multi-layer authentication engine designed for maximum security and ease of access.

### 🛠️ Integration Details
- **Multi-Source OAuth**: 
  - **Google**: Integrated using `google-auth-library`. The client-side sends an `idToken` to the server, which is then verified via `OAuth2Client.verifyIdToken()` to extract verified email and identity payloads.
  - **GitHub**: Implemented via a custom OAuth flow using `axios`. The server initializes a redirect to GitHub, exchanges the `code` for an `access_token`, and fetches primary verified emails to ensure identity integrity.
- **Local Protocol**: 
  - **Security**: Passwords are multi-layered using `bcryptjs` for hashing (10 salts) and `jsonwebtoken` (JWT) for session persistence.
  - **Session Management**: Dual-cookie strategy. `nxg_auth` is a secure, `HttpOnly` cookie for server-side validation, while `nxg_user_data` (non-HttpOnly) allows seamless client-side hydration without repeated API calls.
- **Advanced Security**:
  - **2FA/MFA**: Time-based One-Time Passwords (TOTP) supported via `speakeasy`, allowing users to link authenticator apps.
  - **RBAC**: A higher-order function `restrictTo('organizer', 'admin', 'judge')` acts as a middleware gatekeeper for all protected routes.

## 2. Integrated Hackathon Engine
A full-stack ecosystem to manage competitive code deployments.

### 🛠️ Integration Details
- **Mission Controller**: 
  - **CRUD Operations**: Enforced through a unified `Hackathon` model. Organizers can toggle statuses which change site-wide visibility filters in real-time.
- **Cluster Management (Teams)**:
  - **Relationship Logic**: Teams are managed as grouped `Registration` nodes. This allows for flexible team membership and leader assignment without a complex standalone "Team" model, optimizing query performance.
- **Submission Registry**: 
  - **Multi-Format Support**: The platform accepts GitHub repositories (stored as strings), demo URLs, and blob artifacts (ZIP/PDF) managed by the Cloudinary pipeline.

## 3. Organizer Portals & Command Center
High-density dashboards for system monitoring and participant management.

### 🛠️ Integration Details
- **Node Telemetry (Stats)**: 
  - **Data Vis**: Integrated with `Recharts` on the frontend. The backend uses Mongoose `.countDocuments()` and `.aggregate()` (specifically `$group` with `$dateToString`) to generate time-series data for the "Registration Velocity" graphs.
- **Broadcast Node**: 
  - **Communication**: Organizers dispatch broadcasts via the `/api/notifications/broadcast` endpoint, which triggers both a database entry and a real-time socket signal.

## 4. Real-time Infrastructure & System Modules
Mission-critical background services and communications.

### 🛠️ Integration Details
- **Bi-Directional Signal (Socket.io)**: 
  - **Implementation**: Initialized as a singleton in `config/socket.js`. The server is wrapped with `http.createServer(app)`, allowing the socket engine to share the same port.
  - **Global Access**: Injected into the Express `req` object via middleware, enabling internal controllers (like `organizerController`) to emit real-time updates as side-effects of CRUD operations.
- **Mission Queues (BullMQ)**: 
  - **Async Processing**: Integrated with `ioredis`. High-latency tasks like bulk verification emails are offloaded to background worker threads to keep the main event loop responsive.
- **Secure Search Engine**: 
  - **Performance**: Utilizes MongoDB **Text Indexes** on project titles, descriptions, and tech stacks. The `searchRoutes` use the `$text` operator for fast, fuzzy-matching query results.

## 5. Technical Stack & Integrations

### ☁️ Cloud & External Services
- **Cloudinary Integration**:
  - **Automated Pipeline**: Integrated via `multer` and `multer-storage-cloudinary`. Files are intercepted by the middleware, uploaded directly to the Cloudinary cloud, and the resulting `secure_url` is passed to the final controller.
  - **Optimization**: Uses `resource_type: "auto"` to handle diverse payloads (images, docs, archives) through a single endpoint.
- **Nodemailer / Transactional Mail**:
  - **Relay**: Configured with a dedicated SMTP pool in `config/nodemailer.js`. 
  - **Templating**: Uses standardized HTML email templates for verification, password resets, and mission updates.

---
**Status**: 🔵 FULLY OPERATIONAL
**Version**: 2.1.0 "Pulse-Active"
**Region**: Global Distributed Node
