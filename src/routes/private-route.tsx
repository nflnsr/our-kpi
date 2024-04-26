import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function PrivateRoute() {
  const { authData } = useAuth();
  if (authData.isAuth) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export default PrivateRoute;
