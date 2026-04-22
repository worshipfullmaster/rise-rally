import logo from "@/assets/genz-mada-logo.jpg";
import { cn } from "@/lib/utils";

export function Logo({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden rounded-2xl ring-2 ring-primary/40 shadow-[0_0_30px_-8px_oklch(0.68_0.27_5/0.6)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={logo}
        alt="GEN Z Madagascar"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        loading="eager"
      />
    </span>
  );
}
