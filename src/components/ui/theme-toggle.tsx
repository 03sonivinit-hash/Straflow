"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  // preventing hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-border/40"
        aria-hidden="true"
        disabled
      />
    ); // Placeholder to avoid layout shift and hydration mismatch
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-surface hover:bg-surface-hover border border-border/40 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun className="w-[1.125rem] h-[1.125rem] absolute transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="w-[1.125rem] h-[1.125rem] absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
