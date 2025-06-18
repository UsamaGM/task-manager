import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Dashboard, LandingPage, Home } from "@/pages";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
