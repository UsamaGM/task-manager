import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  LandingPage,
  Home,
  Dashboard,
  NewProject,
  NewTask,
  Settings,
} from "@/pages";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/new-project" element={<NewProject />} />
          <Route path="/home/new-task" element={<NewTask />} />
          <Route path="/home/settings" element={<Settings />}>
            <Route path="/home/settings/*" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
