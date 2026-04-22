import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { setupServerFnAuth } from "@/integrations/server-fn-auth";

export type AppRole = "admin" | "moderator" | "member";

type Ctx = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = async (uid: string) => {
    try {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      setRoles(((data ?? []) as { role: AppRole }[]).map((r) => r.role));
    } catch (e) {
      console.error("Error loading roles:", e);
    }
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setupServerFnAuth(sess?.access_token);
      if (sess?.user) {
        loadRoles(sess.user.id);
      } else {
        setRoles([]);
      }
    });
    supabase.auth.getSession().then(async ({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setupServerFnAuth(sess?.access_token);
      if (sess?.user) {
        await loadRoles(sess.user.id);
      } else {
        setRoles([]);
      }
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };
  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = typeof window !== "undefined" ? window.location.origin : undefined;
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: redirectUrl, data: { display_name: displayName } },
    });
    return { error: error?.message ?? null };
  };
  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{
      user, session, roles, loading,
      isAdmin: roles.includes("admin"),
      isModerator: roles.includes("moderator") || roles.includes("admin"),
      signIn, signUp, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
