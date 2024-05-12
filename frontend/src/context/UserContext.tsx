/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from "react";
interface User {
  userId: string;
  token: string;
  isAuth: boolean;
}
const UserContext = createContext<{
  user: User;
  setUserHandler: any;
  logoutHandler: any;
} | null>(null);
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    userId: "",
    token: "",
    isAuth: false,
  });
  function setUserHandler({
    userId,
    token,
    isAuth,
  }: {
    userId: string;
    token: string;
    isAuth: boolean;
  }) {
    logoutHandler();
    localStorage.setItem("jwt", token);
    setUser({ ...user, userId, token, isAuth });
  }
  function logoutHandler() {
    setUser({
      userId: "",
      token: "",
      isAuth: false,
    });
    localStorage.removeItem("jwt");
  }
  return (
    <UserContext.Provider value={{ user, setUserHandler, logoutHandler }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
