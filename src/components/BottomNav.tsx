import { Link, useLocation } from "@tanstack/react-router";
import { Home, Newspaper, Calendar, GraduationCap, Heart } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/news", key: "nav.news", icon: Newspaper },
  { to: "/events", key: "nav.events", icon: Calendar },
  { to: "/academy", key: "nav.academy", icon: GraduationCap },
  { to: "/donate", key: "nav.donate", icon: Heart },
] as const;

export function BottomNav() {
  const { t } = useLang();
  const loc = useLocation();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="mx-2 mb-2 rounded-3xl border border-border bg-background/85 backdrop-blur-2xl shadow-pop">
        <ul className="grid grid-cols-5">
          {items.map(({ to, key, icon: Icon }) => {
            const active = loc.pathname === to || (to !== "/" && loc.pathname.startsWith(to));
            return (
              <li key={to} className="flex">
                <Link
                  to={to}
                  className={cn(
                    "tap-scale relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {active && (
                    <span className="absolute -top-1 h-1 w-8 rounded-full bg-primary shadow-[0_0_12px_oklch(0.68_0.27_5/0.8)]" />
                  )}
                  <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_8px_oklch(0.68_0.27_5/0.6)]")} />
                  <span className="leading-none">{t(key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
