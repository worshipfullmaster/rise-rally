import { createContext, useContext, type ReactNode } from "react";

// Static-site stub: no backend, no auth, no roles.
// Kept as a no-op so existing components that call useAuth() keep working.
type Ctx = {
  user: null;
  session: null;
  roles: never[];
  loading: false;
  isAdmin: false;
  isModerator: false;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const STUB: Ctx = {
  user: null,
  session: null,
  roles: [],
  loading: false,
  isAdmin: false,
  isModerator: false,
  signIn: async () => ({ error: "Authentication is disabled on this static site." }),
  signUp: async () => ({ error: "Authentication is disabled on this static site." }),
  signOut: async () => { /* noop */ },
};

const AuthContext = createContext<Ctx>(STUB);

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={STUB}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
