import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function ProtectedRoute() {
  const { authData } = useAuth();
  if (!authData.isAuth) {
    return <Outlet />;
  }
  return <Navigate to="/dashboard" replace />;
}

export default ProtectedRoute;
