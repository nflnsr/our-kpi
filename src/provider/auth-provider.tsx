// import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { createContext } from "react";
import { useState } from "react";

type AuthDataType = {
  email: string;
  isAuth: boolean;
  accessToken: string;
}

export const AuthContext = createContext<{
  authData: AuthDataType;
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataType>>;
}>({
  authData: {
    email: "",
    isAuth: false,
    accessToken: "",
  },
  setAuthData: () => {}
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [isAuth, setIsAuth] = useLocalStorage(storageKey);
  const [authData, setAuthData] = useState<AuthDataType>({
    email: "",
    isAuth: false,
    accessToken: "",
  });
console.log(authData, "authDataaa")
  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
