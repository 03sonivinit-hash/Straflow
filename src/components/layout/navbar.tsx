"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/#systems", label: "Systems" },
  { href: "/services", label: "Services" },
  { href: "/architecture", label: "Architecture" },
  { href: "/#industries", label: "Industries" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[200] transition-all duration-300 border-b",
          isScrolled
            ? "sf-glass border-border/40 py-3 shadow-sm"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="sf-container">
          <div className="flex items-center justify-between">
            
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/' && !link.href.startsWith('/#'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-[13px] font-semibold transition-colors hover:text-primary relative py-1",
                      isActive ? "text-foreground" : "text-text-secondary"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 relative z-10">
              <ThemeToggle />
              
              <div className="hidden md:block">
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  size="sm"
                >
                  Deploy System
                </MagneticButton>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-3 -mr-1 text-foreground focus:outline-none"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[199] sf-glass pt-24 px-6 md:hidden flex flex-col h-[100dvh]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block py-4 text-2xl font-bold text-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pb-12 flex flex-col gap-8">
            <MagneticButton
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Deploy System
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  );
}
