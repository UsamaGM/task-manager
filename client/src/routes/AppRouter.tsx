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
  NewProject,
  NewTask,
} from "@/pages";
import Loader from "@/components/Loader";

import {
  myProjectsDataLoader,
  myTasksDataLoader,
  myTeamsDataLoader,
  newTaskDataLoader,
} from "./dataLoaders";

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
    element: <Home />,
    children: [
      { path: "/home/dashboard", element: <Dashboard /> },
      {
        path: "/home/my-teams",
        element: (
          <TeamProvider>
            <MyTeams />
          </TeamProvider>
        ),
        loader: myTeamsDataLoader,
        hydrateFallbackElement: <Loader />,
      },
      {
        path: "/home/my-projects",
        element: (
          <ProjectProvider>
            <MyProjects />
          </ProjectProvider>
        ),
        loader: myProjectsDataLoader,
        hydrateFallbackElement: <Loader />,
      },
      {
        path: "/home/my-tasks",
        element: (
          <TaskProvider>
            <MyTasks />
          </TaskProvider>
        ),
        loader: myTasksDataLoader,
        hydrateFallbackElement: <Loader />,
      },
      { path: "/home/new-project", element: <NewProject /> },
      {
        path: "/home/new-task",
        element: <NewTask />,
        loader: newTaskDataLoader,
        hydrateFallbackElement: <Loader />,
      },
    ],
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
