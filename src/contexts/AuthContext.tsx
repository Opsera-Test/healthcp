import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type UserRole = "patient" | "doctor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for mock authentication
const DEMO_USERS: Record<string, User & { password: string }> = {
  "patient@demo.com": {
    id: "patient-001",
    name: "Alex Johnson",
    email: "patient@demo.com",
    role: "patient",
    password: "demo123",
  },
  "doctor@demo.com": {
    id: "doctor-001",
    name: "Dr. Sarah Chen",
    email: "doctor@demo.com",
    role: "doctor",
    password: "demo123",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("healthapp_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      localStorage.setItem("healthapp_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("healthapp_user");
  }, []);

  const switchRole = useCallback(() => {
    if (user) {
      const newRole: UserRole = user.role === "patient" ? "doctor" : "patient";
      const newUser = { ...user, role: newRole };
      setUser(newUser);
      localStorage.setItem("healthapp_user", JSON.stringify(newUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
