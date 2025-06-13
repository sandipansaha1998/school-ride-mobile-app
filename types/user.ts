import { Entity } from "./misc";

export interface User extends Entity {
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  // setUser: (user: User | null) => void;
  // isLoggedIn: boolean;
  // setIsLoggedIn: (isLoggedIn: boolean) => void;
  // logout: () => void;
}
