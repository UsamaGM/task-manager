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
  ProjectDetails,
  UserDetails,
} from "@/pages";
import Loader from "@/components/Loader";

import {
  dataLoader,
  projectDataLoader,
  teamDataLoader,
  userDataLoader,
} from "./dataLoaders";

import useAuthStore from "@/stores/auth.store";

const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/hello", element: <LandingPage /> },
  { path: "/*", element: <Navigate to="/login" /> },
];

const authenticatedRoutes = [
  {
    path: "/",
    element: <Home />,
    loader: dataLoader,
    hydrateFallbackElement: <Loader fullscreen />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/my-teams",
        element: <MyTeams />,
      },
      {
        path: "/my-projects",
        element: <MyProjects />,
      },
      {
        path: "/my-tasks",
        element: <MyTasks />,
      },
    ],
  },
  {
    path: "/user/:id",
    element: <UserDetails />,
    loader: userDataLoader,
    hydrateFallbackElement: <Loader fullscreen />,
  },
  {
    path: "/team/:id",
    element: <TeamDetails />,
    loader: teamDataLoader,
    hydrateFallbackElement: <Loader fullscreen />,
  },
  {
    path: "/project/:id",
    element: <ProjectDetails />,
    loader: projectDataLoader,
    hydrateFallbackElement: <Loader fullscreen />,
  },
  { path: "/hello", element: <LandingPage /> },
  { path: "/*", element: <Navigate to="/dashboard" /> },
];

function AppRouterProvider() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const routes = isAuthenticated ? authenticatedRoutes : authRoutes;

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default AppRouterProvider;
