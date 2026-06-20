"use client";

import { Database, Server, Cpu, Layers, Link as LinkIcon, Lock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const STAGES = [
  {
    id: "01",
    label: "INPUT LAYER",
    title: "Data Ingestion",
    desc: "Continuous integration from CRMs, ERPs, Webhooks, and legacy databases.",
    icon: Database,
    color: "var(--color-text-secondary)",
  },
  {
    id: "02",
    label: "PROCESSING LAYER",
    title: "Normalization",
    desc: "Raw data is cleansed, structured, and securely encrypted in transit.",
    icon: Layers,
    color: "var(--color-muted)",
  },
  {
    id: "03",
    label: "AI CORE",
    title: "Intelligence",
    desc: "LLMs, Vision, and RAG architectures process the data to generate intent and output.",
    icon: Cpu,
    color: "var(--color-primary)",
    highlight: true,
  },
  {
    id: "04",
    label: "AUTOMATION LAYER",
    title: "Orchestration",
    desc: "Determines the necessary actions, triggers APIs, and routes payloads.",
    icon: LinkIcon,
    color: "var(--color-muted)",
  },
  {
    id: "05",
    label: "OUTPUT LAYER",
    title: "Execution",
    desc: "Actions are natively executed in your ecosystem—emails sent, records updated.",
    icon: Server,
    color: "var(--color-text-secondary)",
  },
];

export function Architecture() {
  const ref = useScrollReveal<HTMLDivElement>({ variant: "fade-up" });

  return (
    <section id="architecture" ref={ref} className="sf-section bg-background">
      <div className="sf-container">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="sf-pipeline-label justify-center">
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="mb-6">The Intelligence <span className="text-muted">Pipeline.</span></h2>
          <p className="max-w-2xl mx-auto text-sm text-text-secondary">
            A modular, vertically integrated architecture designed for zero-latency execution and enterprise-grade security.
          </p>
        </div>

        {/* Vertical Stack Architecture Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 relative">
            
            {/* Background connecting line */}
            <div className="absolute left-[39px] md:left-[49px] top-8 bottom-8 w-px bg-border/50 z-0 hidden sm:block" />

            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div 
                  key={stage.id} 
                  className={`relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-[var(--sf-radius-md)] border transition-all duration-300 ${
                    stage.highlight 
                    ? "bg-primary/5 border-primary shadow-[var(--sf-shadow-glow)]" 
                    : "bg-surface/30 border-border/50 hover:border-primary/30"
                  }`}
                >
                  {/* Icon Node */}
                  <div 
                    className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-[var(--sf-radius-md)] border flex items-center justify-center bg-background ${
                      stage.highlight ? "border-primary" : "border-border/50"
                    }`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stage.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: stage.color }}>
                        {stage.label}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{stage.title}</h3>
                      <p className="text-sm text-text-secondary max-w-md">{stage.desc}</p>
                    </div>

                    {/* Step ID */}
                    <div className="hidden md:block text-3xl font-mono font-bold text-border">
                      {stage.id}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security Bar */}
          <div className="mt-8 p-4 border border-border/50 rounded-[var(--sf-radius-md)] bg-surface/50 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-text-secondary">
            <Lock className="w-4 h-4 text-primary" />
            <span>End-to-End Encryption (AES-256)</span>
            <span className="hidden sm:inline text-border">|</span>
            <span>SOC2 Type II Compliant Layer</span>
          </div>

        </div>

      </div>
    </section>
  );
}
