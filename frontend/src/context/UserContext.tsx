/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from "react";
interface User {
  email: string;
  name: string;
  token: string;
  isAuth: boolean;
}
const UserContext = createContext<{ user: User; setUser: any } | null>(null);
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
    isAuth: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
