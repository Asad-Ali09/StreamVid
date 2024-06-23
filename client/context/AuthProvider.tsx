"use client";
import { isUserLoggedIn } from "@/features/auth";
import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type AuthUserT = User & { isLoggedIn: boolean };
const defaultUser: AuthUserT = {
  name: "",
  email: "",
  profilePicture: "",
  isLoggedIn: false,
};

interface AuthContextType {
  user: AuthUserT;
  //   setUser: React.Dispatch<React.SetStateAction<User>>;
  setUser: (user: AuthUserT) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUserT>(defaultUser);

  useEffect(() => {
    const getLoginStatus = async () => {
      const isLoggedIn = await isUserLoggedIn();
      const name = localStorage.getItem("name") || "";

      const email = localStorage.getItem("email") || "";
      const profilePicture = localStorage.getItem("profilePicture") || "";

      setUser({ name, email, profilePicture, isLoggedIn });
    };

    getLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
