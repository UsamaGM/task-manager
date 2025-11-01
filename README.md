# Full-Stack Task Manager (MERB Stack)

This is a comprehensive, full-stack task management application built with a modern "MERB" stack: **MongoDB, Express, React, and Bun**.

This platform is a collaborative tool where users can manage projects, create and assign tasks, and build teams to work together efficiently. The entire project is written in **TypeScript** and leverages the **Bun** runtime for both the backend server and the frontend development environment, showcasing high performance and modern JavaScript/TypeScript tooling.

## Core Features

### 1. User & Authentication
* **Secure Registration:** New user sign-up with password hashing using `bcrypt`.
* **JWT Authentication:** Stateless authentication using **JSON Web Tokens (JWT)**. The token is stored in a cookie and automatically attached to all API requests via an Axios interceptor.
* **Profile Management:** Users can view their profile and upload a custom profile picture using `multer` for file handling on the backend.
* **Auth State Persistence:** `useAuthStore` (Zustand) initializes on app load, checking for a valid token and user data to maintain the session.

### 2. Team Management
* **Full CRUD for Teams:** Authenticated users can create, edit, and delete teams they own.
* **Admin & Member Roles:** The user who creates a team is designated as the `admin`.
* **Team Membership:**
    * Admins can search for users by username or email and add them to the team.
    * Admins can remove members from the team.
    * Non-admin members have the option to "Leave Team".
* **Detailed View:** A dedicated team details page shows all team members and all projects assigned to that team.

### 3. Project Management
* **Full CRUD for Projects:** Users can create, edit, and delete their own projects.
* **Project Status:** Projects can be set to "Active," "On-Hold," or "Completed".
* **Team Assignment:** The project creator (or team admin) can assign a project to a specific team, linking it to all team members.
* **Detailed View:** A project details page shows the project description, dates, assigned team, and a complete list of all associated tasks.

### 4. Task Management
* **Full CRUD for Tasks:** Users can create, edit, and delete tasks within their projects.
* **Task Properties:** Tasks include a name, description, due date, and a priority level ("low," "medium," "high").
* **Task Status:** Tasks follow a Kanban-style flow: "To Do," "In-Progress," or "Done".
* **User Assignment:** Team admins can assign specific tasks to any member of the team associated with the project.
* **Kanban View:** The "My Tasks" page organizes all user-relevant tasks into three columns based on their status.

### 5. Dashboard
* **At-a-Glance Stats:** The main dashboard provides a high-level overview of the user's workload, including counts for Teams, Projects, Total Tasks, Assigned Tasks, and Finished Tasks.
* **Quick Actions:** Provides shortcuts to create new teams, projects, or tasks.
* **Task & Project Lists:** Shows filterable lists of "This Week's Tasks" and "To Do" tasks, as well as horizontal carousels for all current projects and teams.

---

## Technical Showcase & Architecture

This project demonstrates a modern, efficient, and scalable full-stack architecture.

### 🚀 The "MERB" Stack (MongoDB, Express, React, Bun)
The entire project is built using the **Bun.js** runtime, replacing Node.js.
* **Backend:** Bun serves the Express API, running TypeScript directly with no separate build step (`bun run --watch index.ts`).
* **Frontend:** Bun acts as the package manager, bundler, and dev server (`bun --hot src/index.tsx`), replacing tools like Vite or Webpack and offering significantly faster performance.

### Backend (Server)
* **Framework:** **Express.js** with a modular, RESTful API structure (`routes`, `controllers`, `models`).
* **Database:** **MongoDB** with **Mongoose** for strongly-typed schema modeling, including relational data using `ref` to link users, teams, projects, and tasks.
* **Authentication:** Secure, stateless JWT authentication middleware (`auth.middleware.ts`) protects all sensitive routes.
* **Data Aggregation:** The backend features a highly efficient `/api/user/data` endpoint. This single request fetches all teams, projects, and tasks related to the logged-in user, which is then used to hydrate the entire frontend state at once.
* **File Uploads:** Uses `multer` to handle `multipart/form-data` for profile picture uploads.

### Frontend (Client)
* **Framework:** **React 19** with functional components and hooks.
* **Global State Management (Zustand):**
    * **Modular Stores:** State is split into logical, hook-based stores (`auth.store.ts`, `project.store.ts`, `task.store.ts`, `team.store.ts`).
    * **Optimistic UI:** CRUD operations (e.g., `task.store.ts`) use an optimistic UI pattern. The local Zustand state is updated *immediately* for a snappy user experience, and then reverted only if the subsequent API call fails.
* **Routing (React Router v7):**
    * **Data Loaders:** The app uses React Router `loader` functions (`dataLoaders.ts`) to fetch all essential data *before* the main routes render.
    * **Zustand Hydration:** This loader pattern is combined with Zustand. The `dataLoader` fetches the aggregated `/user/data` and immediately hydrates all Zustand stores (`useTeamStore.setState`, `useProjectStore.setState`, etc.) before the app becomes visible.
    * **Protected Routes:** `AppRouter.tsx` programmatically serves authenticated routes or auth routes based on the `authStore`'s `isAuthenticated` flag.
* **Form Handling & Validation (React Hook Form + Zod):**
    * Uses **React Hook Form** for efficient, performance-oriented form state management.
    * Uses **Zod** (`validation/schemas.ts`) to define validation schemas for all forms (login, register, project, task), providing robust, type-safe validation.
* **Asynchronous API Calls:**
    * A centralized **Axios** instance (`config/api.ts`) is used for all API communication.
    * An interceptor automatically attaches the JWT `Bearer` token (read from cookies) to all outgoing requests.
* **Advanced Abstractions:**
    * **Custom Modal Hooks:** A generic `useModals` hook provides a clean API to manage modal state (open, close, data). This is extended by specific hooks like `useTaskModals`, `useProjectModals`, and `useTeamModals` to handle all modal logic (Create, Edit, Delete, Assign) for each entity, keeping page components clean and focused.
    * **Custom Form Hooks:** Logic for login/register forms is encapsulated in custom hooks (`useLoginForm.ts`, `useRegisterForm.ts`) to separate form logic from the component.
* **UI & Animations:**
    * **TailwindCSS:** A utility-first CSS framework (with `bun-plugin-tailwind`) is used for all styling.
    * **Anime.js:** Used for subtle, engaging micro-interactions and page-load animations, such as staggered entry for lists and interactive button effects.

---

## Project Structure

The repository is organized into two main packages: `client` and `server`.
```
/
| ├── client/ # React 19 + Bun Frontend
│ ├── src/ 
│ │ ├── components/ # Reusable UI components (Card, Buttons, Inputs, Modals)
│ │ ├── config/ # Axios (api.ts) and Cookie helpers
│ │ ├── helpers/ # Date formatters, error handlers
│ │ ├── hooks/ # Custom hooks (useModal, useTaskModals, etc.)
│ │ ├── pages/ # All application pages (Auth, Home, Dashboard, Details)
│ │ ├── routes/ # React Router config (AppRouter.tsx, dataLoaders.ts)
│ │ ├── stores/ # Zustand global state stores (auth, project, task, team)
│ │ ├── validation/ # Zod validation schemas (schemas.ts)
│ │ ├── App.tsx # Main component with Auth init
│ │ ├── frontend.tsx # Client-side entry point
│ │ └── index.html
│ ├── build.ts # Custom Bun build script
│ └── package.json
│ └── server/ # Express + Bun Backend
├── src/
│ ├── config/ # MongoDB connection (db.ts)
│ ├── controllers/ # API business logic (auth, project, task, team, user)
│ ├── middlewares/ # JWT authentication (auth.middleware.ts)
│ ├── models/ # Mongoose schemas (project, task, team, user)
│ ├── routes/ # Express route definitions
│ └── index.ts # Server entry point (Express app setup)
├── package.json
└── tsconfig.json
```
---
## API Documentation

### Base URL
The base URL for all API endpoints is `/api`.

### Authentication
Most endpoints require authentication using a JSON Web Token (JWT). The token should be included in the `Authorization` header of the request in the following format: `Bearer <token>`

#### Auth Routes

| Method | Endpoint | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| POST | `/auth/login` | Logs in a user. | `{ "email", "password" }` | `{ "message", "user", "token" }` |
| POST | `/auth/register`| Registers a new user.| `{ "username", "email", "password" }` | `{ "message", "newUser" }` |
| GET | `/auth/verify` | Verifies a user's token. | | `200 OK` |

#### User Routes

| Method | Endpoint | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| GET | `/user/data` | Fetches all data for the logged-in user. | | `{ "teams", "projects", "tasks" }` |
| GET | `/user/:id` | Fetches a public user profile by ID. | | `{...user, teams}` |
| GET | `/user/search/:query` | Searches for users by email or username. | | `[{...user}]` |

#### Project Routes

| Method | Endpoint | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| GET | `/project/:id`| Fetches a project by ID. | | `{...project}` |
| POST | `/project` | Creates a new project. | `{ "name", "description", "startDate", "endDate" }` | `{...newProject}` |
| PUT | `/project` | Updates a project. | `{ "id", "data" }` | `{...updatedProject}` |
| DELETE | `/project/:id`| Deletes a project and its tasks. | | `{ "deletedProject", "deletedTasks" }` |

#### Task Routes

| Method | Endpoint | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| GET | `/task/:id` | Fetches a task by ID. | | `{...task}` |
| POST | `/task` | Creates a new task. | `{ "taskData" }` | `{...newTask}` |
| PUT | `/task` | Updates a task. | `{ "id", "updateData" }` | `{...updatedTask}` |
| PUT | `/task/assign` | Assigns a task to a member.| `{ "taskId", "userId" }` | `{...updatedTask}` |
| DELETE | `/task/:taskId` | Deletes a task. | | `{ "message" }` |

#### Team Routes

| Method | Endpoint | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| GET | `/team/:id` | Fetches a team by ID. | | `{...team}` |
| GET | `/team/search/:query` | Searches for teams by name. | | `[{...team}]` |
| POST | `/team` | Creates a new team. | `{ "name", "description" }` | `{...newTeam}` |
| PUT | `/team` | Updates a team's details. | `{ "teamId", "updatedData" }`| `{...updatedTeam}` |
| PUT | `/team/assign` | Assigns a project to a team. | `{ "projectId", "teamId" }` | `{...updatedTeam}` |
| PUT | `/team/add-member` | Adds members to a team (admin only). | `{ "teamId", "members": [...] }` | `{...updatedTeam}` |
| PUT | `/team/remove-member` | Removes members from a team (admin only). | `{ "teamId", "members": [...] }` | `{...updatedTeam}` |
| PUT | `/team/leave/:id` | Allows a user to leave a team. | | `200 OK` |
| DELETE | `/team/:id` | Deletes a team (admin only). | | `200 OK` |

---

## Getting Started

### Prerequisites

* [**Bun**](https://bun.sh/)
* [**MongoDB**](https://www.mongodb.com/) (a local instance or a cloud URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/task-manager.git](https://github.com/your-username/task-manager.git)
    cd task-manager
    ```

2.  **Install server dependencies:**
    ```bash
    cd server
    bun install
    ```

3.  **Install client dependencies:**
    ```bash
    cd ../client
    bun install
    ```

### Environment Setup

1.  **Server (`/server`):**
    Create a `.env` file in the `server` directory and add the following:
    ```
    PORT=5000
    MONGODB_URI=<your_mongodb_connection_uri>
    JWT_SECRET=<your_super_secret_jwt_key>
    ```

2.  **Client (`/client`):**
    The client is configured in `src/config/api.ts` to connect to `http://localhost:5000`. No `.env` file is required.

### Running the Application

1.  **Start the server (dev mode):**
    ```bash
    cd server
    bun dev
    ```

2.  **Start the client (dev mode):**
    ```bash
    cd ../client
    bun dev
    ```

* The backend API will be running on `http://localhost:5000`.
* The frontend application will be available at `http://localhost:4000`.

## Show your support

Give a ⭐️ if you like this project!
