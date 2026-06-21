"use client";

import { type ReactNode, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  id?: string;
  magnetic?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  id,
  magnetic = true,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const magneticRef = useMagnetic<HTMLDivElement>({ strength: 0.25, range: 120 });

  const variants = {
    primary:
      "bg-primary text-[#111111] dark:text-white hover:bg-primary-hover shadow-[var(--sf-shadow-sm)] hover:shadow-[var(--sf-shadow-glow)]",
    secondary:
      "bg-surface text-foreground border border-border hover:border-primary/50 hover:bg-primary/5",
    ghost:
      "bg-transparent text-foreground hover:bg-surface hover:text-primary",
    outline:
      "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-none transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
    "hover:scale-[1.02] active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <div ref={magnetic ? magneticRef : undefined} className="inline-flex">
      {href ? (
        <Link href={href} className={baseStyles} id={id}>
          {children}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={baseStyles}
          id={id}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </div>
  );

  return content;
}
