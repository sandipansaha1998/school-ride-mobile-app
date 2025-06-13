import { AuthContextType } from "@/types/user";
import { createContext } from "react";

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);
