import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/auth/AuthProvider";
import { useLang } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/auth/")({
  head: () => ({ meta: [{ title: "Sign in — GEN Z Movement Hub" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp, user } = useAuth();
  const { t } = useLang();
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [seedHint, setSeedHint] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => { if (user) nav({ to: "/" }); }, [user, nav]);

  // First-deploy bootstrap: idempotent — only seeds if no admin exists yet.
  useEffect(() => {
    fetch("/api/public/seed-admin")
      .then((r) => r.json())
      .then((j) => {
        if (j?.seeded && j?.password) {
          setSeedHint({ email: j.email, password: j.password });
        }
      })
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = mode === "signin"
      ? await signIn(email, password)
      : await signUp(email, password, name);
    setBusy(false);
    if (error) toast.error(error);
    else toast.success(mode === "signin" ? "Welcome back" : "Account created — check your email if confirmation is required.");
  };

  return (
    <AppLayout>
      <section className="mx-auto max-w-md px-4 py-16 md:px-6">
        <Card className="p-8">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="mt-3 text-3xl">{mode === "signin" ? t("auth.signin") : t("auth.signup")}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Display name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
              </div>
            )}
            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" disabled={busy} className="w-full">
              {mode === "signin" ? t("auth.signin") : t("auth.signup")}
            </Button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-sm text-muted-foreground hover:text-primary"
          >
            {mode === "signin" ? t("auth.no_account") : t("auth.have_account")}
          </button>

          {seedHint && (
            <div className="mt-6 rounded-2xl border border-sun/40 bg-sun/10 p-4 text-xs">
              <p className="font-bold uppercase tracking-wider text-sun">Default admin created</p>
              <p className="mt-1 text-muted-foreground">
                Email: <span className="font-mono text-foreground">{seedHint.email}</span>
              </p>
              <p className="text-muted-foreground">
                Password: <span className="font-mono text-foreground">{seedHint.password}</span>
              </p>
              <p className="mt-2 text-muted-foreground">
                Sign in and change these credentials immediately from the Admin page.
              </p>
            </div>
          )}
        </Card>
      </section>
    </AppLayout>
  );
}
