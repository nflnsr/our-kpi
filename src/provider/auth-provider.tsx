import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { createContext } from "react";
// import { useState } from "react";

export type AuthDataType = {
  email: string;
  role: 'admin' | 'karyawan' | "";
  isAuth: boolean;
  accessToken: string;
  expiry: number;
}

export const AuthContext = createContext<{
  authData: AuthDataType;
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataType>>;
}>({
  authData: {
    email: "",
    role: "",
    isAuth: false,
    accessToken: "",
    expiry: 0,
  },
  setAuthData: () => {}
});

function AuthProvider({ children, storageKey }: { children: React.ReactNode; storageKey: string }) {
  const [authData, setAuthData] = useLocalStorage(storageKey);
  return (
    <AuthContext.Provider
      value={{
        authData ,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
