import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { axiosPrivateInstance } from "@/lib/utils";

export function useAxiosPrivate() {
  const { authData } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authData.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
    };
  }, [authData]);

  return axiosPrivateInstance;
}
