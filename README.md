
# Task Manager

A full-stack task management application built with the MERB stack (MongoDB, Express, React, Bun.js) and powered by Bun.js.

## Why Choose Bun over Node.js?
*   Built in support for TypeScript
*   Faster in every manner (package installation)
*   Built in transpiler (No need for babbel configs)
*   Built in React framework (No need for Vite)
*   Built in support for TailwindCSS (No need for third party TailwindCSS compiler)
*   Built in hot reloading, no need for nodemon (Also supports TypeScript)
*   It is a lot more than Node.js can ever be, it is a testing framework, a React framework, a complete server, a transpiler, a package manager, and anything else you need for your frotend and backend project
*   It is compatible with Node.js (You can easily shift from Node to Bun)

## Features

*   **User Authentication:** Secure user registration and login.
*   **Project Management:** Create, edit, and delete projects.
*   **Task Management:** Create, edit, and delete tasks within projects.
*   **Team Collaboration:** Create and manage teams, assign users to projects, and assign tasks to team members.
*   **Dashboard:** Get an overview of your projects, tasks, and teams.

## Tech Stack

**Client:**

*   React
*   Anime.js
*   React Router v7
*   TypeScript
*   Tailwind CSS
*   Bun.js

**Server:**

*   Express
*   TypeScript
*   JWT based Authorization
*   MongoDB
*   Bun.js

## File Structure

```
.
├── client/         # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── config/     # API and cookie configuration
│   │   ├── contexts/   # React contexts for state management
│   │   ├── helpers/    # Helper functions and types
│   │   ├── pages/      # Application pages
│   │   └── routes/     # React Router configuration
│   └── package.json
└── server/         # Backend Express application
    ├── src/
    │   ├── config/     # Database configuration
    │   ├── controllers/ # Request handlers
    │   ├── middlewares/ # Express middlewares
    │   ├── models/     # Mongoose models
    │   └── routes/     # API routes
    └── package.json
```

## Getting Started

### Prerequisites

*   [Bun](https://bun.sh/)
*   [MongoDB](https://www.mongodb.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/task-manager.git
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

4.  **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```
    PORT=5000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

    Create a `.env` file in the `client` directory and add the following:

    ```
    VITE_API_URL=http://localhost:5000
    ```

### Running the application

1.  **Start the server:**

    ```bash
    cd server
    bun dev
    ```

2.  **Start the client:**

    ```bash
    cd ../client
    bun dev
    ```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Show your support

Give a ⭐️ if you like this project!
