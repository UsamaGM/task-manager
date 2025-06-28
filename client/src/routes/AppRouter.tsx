import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import {
  Login,
  Register,
  LandingPage,
  Home,
  Dashboard,
  MyTeams,
  MyProjects,
  MyTasks,
  TeamDetails,
} from "@/pages";
import Loader from "@/components/Loader";

import { dataLoader, teamDataLoader } from "./dataLoaders";

import { useAuth } from "@/contexts/AuthContext";
import TaskProvider from "@/contexts/TaskContext";
import ProjectProvider from "@/contexts/ProjectContext";
import TeamProvider from "@/contexts/TeamContext";

const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <LandingPage /> },
  { path: "/*", element: <Navigate to="/login" /> },
];

const authenticatedRoutes = [
  {
    path: "/home",
    element: (
      <TeamProvider>
        <ProjectProvider>
          <TaskProvider>
            <Home />
          </TaskProvider>
        </ProjectProvider>
      </TeamProvider>
    ),
    loader: dataLoader,
    hydrateFallbackElement: <Loader fullscreen />,
    children: [
      { path: "/home/dashboard", element: <Dashboard /> },
      {
        path: "/home/my-teams",
        element: <MyTeams />,
      },
      {
        path: "/home/my-projects",
        element: <MyProjects />,
      },
      {
        path: "/home/my-tasks",
        element: <MyTasks />,
      },
    ],
  },
  {
    path: "/team/:id",
    element: <TeamDetails />,
    loader: teamDataLoader,
    hydrateFallbackElement: <Loader fullscreen />,
  },
  { path: "/", element: <LandingPage /> },
  { path: "/*", element: <Navigate to="/home/dashboard" /> },
];

function AppRouterProvider() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <Loader fullscreen />;

  const router = createBrowserRouter(
    isAuthenticated ? authenticatedRoutes : authRoutes
  );
  return <RouterProvider router={router} />;
}

export default AppRouterProvider;
