"use client";

import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTABlock({
  title = "Ready to build your system?",
  subtitle = "Book a strategy call and discover how StrataFlow can transform your operations with intelligent automation.",
  primaryLabel = "Book Strategy Call",
  primaryHref = "/contact",
  secondaryLabel = "Explore Architecture",
  secondaryHref = "/#architecture",
  className,
}: CTABlockProps) {
  const ref = useScrollReveal<HTMLDivElement>({ variant: "fade-up" });

  return (
    <section
      ref={ref}
      className={cn(
        "sf-section relative overflow-hidden bg-background text-foreground",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-hover dark:from-[#050505] dark:via-[#0a0a0a] dark:to-[#2a1a14]" />

      {/* Pipeline flow lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#FF4D2E] to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: "-10%",
              right: "-10%",
              animation: `data-flow ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF4D2E]/10 blur-[120px]" />

      <div className="sf-container relative z-10 text-center">
        <div data-reveal className="max-w-4xl mx-auto">
          <h2 className="text-foreground text-5xl md:text-6xl tracking-tight mb-8">{title}</h2>
          <p className="text-text-secondary text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={primaryHref}
              variant="primary"
              size="lg"
              id="cta-book-call"
              className="bg-primary text-[#111111] dark:text-white hover:bg-primary-hover"
            >
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            {secondaryLabel && (
              <MagneticButton
                href={secondaryHref}
                variant="ghost"
                size="lg"
                className="text-background/70 hover:text-background hover:bg-background/10"
              >
                {secondaryLabel}
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
