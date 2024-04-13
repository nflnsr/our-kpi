import { Navigate, Outlet } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "@/provider/auth-provider";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

function PrivateRoute() {
  // const { data, isSuccess } = useQuery({
  //   queryKey: ["dashboard"],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get("/auth/me");
  //     return data;
  //   },
  //   retry: false,
  // });
  // const { isAuth, setIsAuth } = useContext(AuthContext);
  // console.log(isSuccess, "isSuccessssss")
  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsAuth(true);
  //     authService.storeToken(data?.access_token);
  //   }
  // }, [data?.access_token, isSuccess, setIsAuth]);
  const { authData } = useAuth();
  if (authData.isAuth) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export default PrivateRoute;
