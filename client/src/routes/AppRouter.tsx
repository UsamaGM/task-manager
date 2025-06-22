import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  LandingPage,
  Home,
  NewProject,
  NewTask,
  MyTasks,
} from "@/pages";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";
import {
  myProjectsDataLoader,
  myTasksDataLoader,
  newTaskDataLoader,
} from "./loaders";
import { TaskProvider } from "@/contexts/TaskContext";
import MyProjects from "@/pages/Home/MyProjects";
import ProjectProvider from "@/contexts/ProjectContext";

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
