import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShieldAlert, Globe, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { LANGS, type Lang } from "@/i18n/translations";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PANIC_REDIRECT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/news", key: "nav.news" },
  { to: "/events", key: "nav.events" },
  { to: "/academy", key: "nav.academy" },
  { to: "/media", key: "nav.media" },
  { to: "/donate", key: "nav.donate" },
] as const;

function panic() {
  try {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      const eq = c.indexOf("=");
      const name = (eq > -1 ? c.substr(0, eq) : c).trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  } catch {}
  window.location.replace(PANIC_REDIRECT_URL);
}

export function Header() {
  const { t, lang, setLang, discreet, toggleDiscreet } = useLang();
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-base tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow">GZ</span>
          <span className="hidden sm:inline">GEN Z Hub</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((n) => {
            const active = loc.pathname === n.to || (n.to !== "/" && loc.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="hidden text-warning hover:bg-warning/10 hover:text-warning sm:inline-flex"
            onClick={panic}
            title={t("panic.tooltip")}
          >
            <ShieldAlert className="mr-1.5 h-4 w-4" /> {t("panic.button")}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Language">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGS.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLang(l.code as Lang)}>
                  <span className={cn("font-medium", lang === l.code && "text-primary")}>{l.native}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="icon" variant="ghost" onClick={toggleDiscreet} title="Discreet mode">
            {discreet ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="hidden md:inline">
                  <Button size="sm" variant="outline">{t("nav.admin")}</Button>
                </Link>
              )}
              <Button size="sm" variant="ghost" onClick={signOut} className="hidden md:inline-flex">
                {t("nav.signout")}
              </Button>
            </>
          ) : (
            <Link to="/auth" className="hidden md:inline">
              <Button size="sm" variant="default">{t("nav.signin")}</Button>
            </Link>
          )}

          <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
              >
                {t(n.key)}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-secondary">
                    {t("nav.admin")}
                  </Link>
                )}
                <button onClick={() => { signOut(); setOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm hover:bg-secondary">
                  {t("nav.signout")}
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-primary hover:bg-secondary">
                {t("nav.signin")}
              </Link>
            )}
            <button onClick={panic} className="mt-2 rounded-md px-3 py-2 text-left text-sm text-warning hover:bg-warning/10">
              <ShieldAlert className="mr-1.5 inline h-4 w-4" /> {t("panic.button")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
