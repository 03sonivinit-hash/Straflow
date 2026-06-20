"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  stage?: string;
  stageIndex?: string;
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: "left" | "center";
}

export function SectionHeader({
  stage,
  stageIndex,
  title,
  subtitle,
  className,
  alignment = "left",
}: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>({ variant: "fade-up", stagger: 0.15 });

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        alignment === "center" && "text-center",
        className
      )}
    >
      {stage && (
        <div data-reveal className="sf-pipeline-label">
          {stageIndex && <span className="text-primary mr-1">[{stageIndex}]</span>}
          {stage}
        </div>
      )}
      <h2 data-reveal className="mb-4">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className="max-w-2xl text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
