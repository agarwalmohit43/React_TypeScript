import { createContext } from "react";

interface User {
  name: string;
}

export const UserContext = createContext<User | null>(null);
