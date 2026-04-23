import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, RefreshCw, ShieldCheck, CheckCircle2, XCircle, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/auth/AuthProvider";
import { useLang } from "@/i18n/LanguageProvider";
import { saveGithubConfig, runGithubSync, getGithubStatus } from "@/server/github-sync.functions";
import { updateAdminCredentials } from "@/server/admin-account.functions";
import { format } from "date-fns";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — GEN Z Movement Hub" }] }),
  component: AdminPage,
});

type SyncLog = { id: string; status: string; items_updated: number; items_failed: number; message: string | null; started_at: string };
type Cfg = { repo_url: string; branch: string; folders: string[]; enabled: boolean; last_synced_at: string | null } | null;

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const { t } = useLang();
  const nav = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [pat, setPat] = useState("");
  const [folders, setFolders] = useState("content/news,content/resources,content/events,content/tutorials,content/pages");
  const [enabled, setEnabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [cfg, setCfg] = useState<Cfg>(null);
  const [logs, setLogs] = useState<SyncLog[]>([]);

  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [user, loading, nav]);

  const refresh = async () => {
    try {
      const res = await getGithubStatus();
      setCfg(res.cfg as Cfg);
      setLogs(Array.isArray(res.logs) ? res.logs : []);
      if (res.cfg) {
        setRepoUrl(res.cfg.repo_url); setBranch(res.cfg.branch);
        setFolders((res.cfg.folders as string[]).join(","));
        setEnabled(res.cfg.enabled);
      }
    } catch (e) { 
      console.error('Error loading GitHub config:', e);
      toast.error((e as Error).message); 
    }
  };
  useEffect(() => { 
    if (isAdmin && !loading) refresh(); 
  }, [isAdmin, loading]);

  const save = async () => {
    setBusy(true);
    try {
      await saveGithubConfig({
        data: {
          repo_url: repoUrl,
          branch,
          pat,
          folders: folders.split(",").map((f) => f.trim()).filter(Boolean),
          enabled,
        },
      });
      toast.success("GitHub config saved");
      setPat("");
      refresh();
    } catch (e) { toast.error((e as Error).message); }
    finally { setBusy(false); }
  };

  const sync = async () => {
    setSyncing(true);
    try {
      const r = await runGithubSync();
      toast.success(`Sync done: ${r.updated} updated, ${r.failed} failed`);
      refresh();
    } catch (e) { toast.error((e as Error).message); }
    finally { setSyncing(false); }
  };

  if (loading) return <AppLayout><p className="p-12 text-muted-foreground">{t("common.loading")}</p></AppLayout>;
  if (!isAdmin) return (
    <AppLayout>
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-warning" />
        <h1 className="mt-3 text-2xl">Admin only</h1>
        <p className="mt-2 text-muted-foreground">Your account does not have admin privileges.</p>
      </div>
    </AppLayout>
  );

  return (
    <AppLayout>
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <h1 className="text-4xl">{t("admin.title")}</h1>

        <AdminCredentialsCard currentEmail={user?.email ?? ""} />

        <Card className="mt-6 p-8">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-primary" />
            <h2 className="text-xl">{t("admin.github")}</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Repository URL</Label>
              <Input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/org/repo" />
            </div>
            <div>
              <Label>Branch</Label>
              <Input value={branch} onChange={(e) => setBranch(e.target.value)} />
            </div>
            <div>
              <Label>Personal Access Token (write-only)</Label>
              <Input type="password" value={pat} onChange={(e) => setPat(e.target.value)} placeholder={cfg ? "•••••••• (saved)" : "ghp_..."} />
            </div>
            <div className="sm:col-span-2">
              <Label>Folders (comma separated)</Label>
              <Input value={folders} onChange={(e) => setFolders(e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={enabled} onCheckedChange={setEnabled} />
              <Label>Enabled</Label>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={save} disabled={busy || !repoUrl || (!pat && !cfg)}>Save configuration</Button>
            <Button onClick={sync} disabled={syncing || !cfg || !cfg.enabled} variant="outline">
              {syncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              {t("admin.sync_now")}
            </Button>
            {cfg && !cfg.enabled && (
              <span className="self-center text-xs text-destructive">GitHub sync is disabled in config.</span>
            )}
            {cfg?.last_synced_at && <span className="self-center text-xs text-muted-foreground">Last sync: {format(new Date(cfg.last_synced_at), "PPp")}</span>}
          </div>
        </Card>

        <Card className="mt-6 p-8">
          <h2 className="text-xl">{t("admin.sync_logs")}</h2>
          <div className="mt-4 divide-y divide-border">
            {(logs || []).map((l) => (
              <div key={l.id} className="flex items-center gap-3 py-3 text-sm">
                {l.status === "success" ? <CheckCircle2 className="h-4 w-4 text-success" />
                  : l.status === "partial" ? <CheckCircle2 className="h-4 w-4 text-warning" />
                  : l.status === "running" ? <Loader2 className="h-4 w-4 animate-spin text-info" />
                  : <XCircle className="h-4 w-4 text-destructive" />}
                <span className="w-44 text-xs text-muted-foreground">{format(new Date(l.started_at), "PPp")}</span>
                <span className="font-mono text-xs uppercase">{l.status}</span>
                <span className="text-muted-foreground">{l.message}</span>
                <span className="ml-auto text-xs text-muted-foreground">+{l.items_updated} / ✗{l.items_failed}</span>
              </div>
            ))}
            {(logs || []).length === 0 && <p className="py-4 text-sm text-muted-foreground">No sync runs yet.</p>}
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}

function AdminCredentialsCard({ currentEmail }: { currentEmail: string }) {
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const emailChanged = newEmail && newEmail !== currentEmail;
    const wantsPwd = newPassword.length > 0;
    if (!emailChanged && !wantsPwd) { toast.error("Nothing to update"); return; }
    if (wantsPwd && newPassword !== confirm) { toast.error("Passwords do not match"); return; }
    if (wantsPwd && newPassword.length < 10) { toast.error("Password must be at least 10 characters"); return; }
    setBusy(true);
    try {
      await updateAdminCredentials({
        data: {
          ...(emailChanged ? { newEmail } : {}),
          ...(wantsPwd ? { newPassword } : {}),
        },
      });
      toast.success("Admin credentials updated. Sign in again with the new credentials.");
      setNewPassword(""); setConfirm("");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="mt-8 p-8">
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-primary" />
        <h2 className="text-xl">Admin credentials</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Change the email and password used to sign in as administrator.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>Email</Label>
          <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </div>
        <div>
          <Label>New password</Label>
          <Input type="password" value={newPassword} minLength={10}
            onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave empty to keep current" />
        </div>
        <div>
          <Label>Confirm new password</Label>
          <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={submit} disabled={busy}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save credentials
        </Button>
      </div>
    </Card>
  );
}
