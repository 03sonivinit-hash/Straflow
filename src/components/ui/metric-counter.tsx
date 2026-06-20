"use client";

import { cn } from "@/lib/utils";
import { useCounter } from "@/hooks/use-counter";

interface MetricCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export function MetricCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
  className,
}: MetricCounterProps) {
  const { ref, formattedValue } = useCounter({
    end,
    suffix,
    prefix,
    duration,
  });

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="font-mono text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
        {formattedValue}
      </div>
      <div className="text-sm text-muted uppercase tracking-widest font-mono">
        {label}
      </div>
    </div>
  );
}
