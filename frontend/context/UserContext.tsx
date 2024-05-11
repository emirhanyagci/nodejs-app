import { createContext, ReactNode, useContext, useState } from "react";
interface User {
  email: string;
  name: string;
  isAuth: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = createContext<{ user: User; setUser: any } | null>(null);
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({ name: "", email: "", isAuth: false });
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
