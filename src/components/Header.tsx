import { Link, useLocation } from "@tanstack/react-router";
import { ShieldAlert, Globe, EyeOff, Eye, MoreHorizontal } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { type Lang } from "@/i18n/translations";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { PANIC_REDIRECT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const LANGS = [
  { code: "mg", label: "Malagasy", native: "Malagasy" },
  { code: "fr", label: "French", native: "Français" },
  { code: "en", label: "English", native: "English" },
] as const;

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
  } catch { /* noop */ }
  window.location.replace(PANIC_REDIRECT_URL);
}

export function Header() {
  const { t, lang, setLang, discreet, toggleDiscreet } = useLang();
  const { user, isAdmin, signOut } = useAuth();
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 md:px-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-base tracking-tight">
          <Logo size={36} />
          <span className="hidden text-[15px] sm:inline">
            <span className="text-foreground">GEN Z</span>{" "}
            <span className="text-gradient-primary">HUB</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((n) => {
            const active = loc.pathname === n.to || (n.to !== "/" && loc.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          {/* Quick exit — always visible */}
          <Button
            size="sm"
            variant="ghost"
            className="h-9 rounded-full px-2.5 text-warning hover:bg-warning/10 hover:text-warning"
            onClick={panic}
            title={t("panic.tooltip")}
            aria-label={t("panic.button")}
          >
            <ShieldAlert className="h-4 w-4" />
            <span className="ml-1 hidden text-xs font-semibold sm:inline">{t("panic.button")}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full" aria-label="Language">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              {LANGS.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLang(l.code as Lang)}>
                  <span className={cn("font-medium", lang === l.code && "text-primary")}>{l.native}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full" aria-label="More">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl">
              <DropdownMenuItem onClick={toggleDiscreet}>
                {discreet ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                {discreet ? "Standard mode" : "Discreet mode"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/media">{t("nav.media")}</Link>
              </DropdownMenuItem>
              {user ? (
                <>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">{t("nav.admin")}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={signOut}>{t("nav.signout")}</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/auth">{t("nav.signin")}</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
