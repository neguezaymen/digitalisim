"use client";
import { createContext, ReactNode, useContext } from "react";

interface UserContext {
  email: string;
  name: string;
  id: string;
}

const UserContext = createContext<UserContext | null>(null);

export const UserContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserContext;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
