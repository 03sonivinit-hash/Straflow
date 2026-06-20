"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Layers, Cpu, Shield, BarChart3 } from "lucide-react";

const differentiators = [
  {
    icon: Layers,
    title: "Systems Thinking",
    description: "We don't build point solutions. Every component is designed as part of a larger operational system.",
  },
  {
    icon: Cpu,
    title: "Full-Stack AI Infrastructure",
    description: "From data ingestion to automated output, we own the entire pipeline. No gaps, no handoffs.",
  },
  {
    icon: Shield,
    title: "Production-Grade Engineering",
    description: "Enterprise security, 99.9% uptime SLAs, and infrastructure built for scale from day one.",
  },
  {
    icon: BarChart3,
    title: "Measurable Outcomes",
    description: "Every system ships with dashboards, metrics, and KPIs. If we can't measure it, we don't ship it.",
  },
];

export function WhyStrataFlow() {
  const ref = useScrollReveal<HTMLDivElement>({ variant: "fade-up", stagger: 0.12 });

  return (
    <section className="sf-section" id="why">
      <div className="sf-container">
        <SectionHeader
          title="Why StrataFlow?"
          subtitle="We're not an agency. We're systems architects. Here's what makes us different."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {differentiators.map((d) => (
            <div
              key={d.title}
              data-reveal
              className="flex gap-5 p-6 rounded-[var(--sf-radius-lg)] border border-border hover:border-primary/20 hover:bg-surface/50 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-[var(--sf-radius-md)] bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <d.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-2 text-lg">{d.title}</h4>
                <p className="text-sm">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
