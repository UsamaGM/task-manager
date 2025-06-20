import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  LandingPage,
  Home,
  NewProject,
  NewTask,
} from "@/pages";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Loader";

function AuthRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthenticatedRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/new-project" element={<NewProject />} />
          <Route path="/home/new-task" element={<NewTask />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

function AppRouter() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <Loader fullscreen />;

  return isAuthenticated ? <AuthenticatedRouter /> : <AuthRouter />;
}

export default AppRouter;
