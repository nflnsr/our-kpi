import { Routes, Route, Navigate, useNavigate, NavigateFunction } from "react-router-dom";

import ProtectedRoute from "@/routes/protected-route";
import PrivateRoute from "@/routes/private-route";

import LandingPage from "@/pages/landing-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import Dashboard from "@/pages/dashboard";
import Notfound from "@/pages/not-found";

function Index() {
  const navigate = useNavigate();
  const globalRoute = {
    navigate: navigate as NavigateFunction,
  };  
  globalRoute.navigate = navigate;
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default Index;
