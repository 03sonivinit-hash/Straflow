"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { MetricCounter } from "@/components/ui/metric-counter";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { motion } from "framer-motion";

const STAGES = [
  { label: "INPUT", color: "var(--sf-stage-input)", desc: "Data Ingestion" },
  { label: "PROCESSING", color: "var(--sf-stage-processing)", desc: "ETL & Validation" },
  { label: "AI CORE", color: "var(--sf-stage-ai-core)", desc: "Intelligence Layer" },
  { label: "AUTOMATION", color: "var(--sf-stage-automation)", desc: "Workflow Engine" },
  { label: "OUTPUT", color: "var(--sf-stage-output)", desc: "Actions & Reports" },
];

export function Solution() {
  const ref = useScrollReveal<HTMLDivElement>({ variant: "fade-up" });

  return (
    <section className="sf-section" id="solution">
      <div className="sf-container">
        <SectionHeader
          stageIndex="02"
          stage="PROCESSING"
          title="The solution is architecture."
          subtitle="We don't build features. We build systems. Every layer is designed to process, learn, and automate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Pipeline Diagram */}
          <div ref={ref} className="relative">
            <div className="space-y-4">
              {STAGES.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Node */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: stage.color,
                      backgroundColor: stage.label === "AI CORE" ? "var(--sf-primary-light)" : "transparent",
                      boxShadow: stage.label === "AI CORE" ? "0 0 20px var(--sf-primary-glow)" : "none",
                    }}
                  >
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{ color: stage.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="font-mono text-xs tracking-[0.15em] font-bold"
                        style={{ color: stage.color }}
                      >
                        {stage.label}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <p className="text-sm text-muted">{stage.desc}</p>
                  </div>

                  {/* Arrow connector (except last) */}
                  {i < STAGES.length - 1 && (
                    <div className="absolute left-6 mt-12 w-px h-4 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Vertical connecting line */}
            <div className="absolute left-6 top-12 bottom-12 w-px bg-gradient-to-b from-muted/30 via-primary/30 to-foreground/30" />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-8">
            <MetricCounter end={97} suffix="%" label="Uptime" />
            <MetricCounter end={10} suffix="x" label="Faster Processing" />
            <MetricCounter end={60} suffix="%" label="Cost Reduction" />
            <MetricCounter end={500} suffix="K+" label="Tasks Automated" />
          </div>
        </div>
      </div>
    </section>
  );
}
