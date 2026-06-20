"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CASE_STUDIES = [
  {
    client: "ENTERPRISE REAL ESTATE",
    problem: "Processing 2,000+ property inquiries daily across 15 offices was entirely manual, losing high-value leads to slow response times.",
    solution: "Built an end-to-end extraction and routing pipeline. Scrapers capture leads → AI qualifies via intent → routed to CRM → automated SMS sequence initiated.",
    metrics: [
      { value: "340%", label: "More Leads" },
      { value: "85%", label: "Time Saved" }
    ]
  },
  {
    client: "GLOBAL E-COMMERCE",
    problem: "Support team of 12 couldn't handle 50k monthly tickets. Average response time degraded to 4 hours.",
    solution: "Deployed a custom RAG-based AI Agent hooked into Zendesk and internal inventory APIs. Agent handles tier-1 and escalates complex issues.",
    metrics: [
      { value: "70%", label: "Auto-Resolved" },
      { value: "3min", label: "Avg Response" }
    ]
  }
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="sf-section bg-surface/5 border-y border-border/30">
      <div className="sf-container">
        <div className="text-center mb-16 md:mb-24">
          <div className="sf-pipeline-label justify-center">
            SYSTEM PERFORMANCE
          </div>
          <h2 className="mb-6">Measured in <span className="text-muted">results.</span></h2>
          <p className="max-w-2xl mx-auto text-sm text-text-secondary">
            Every system we deploy is measured by strict operational metrics. View the architectural solutions deployed for these enterprises.
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {CASE_STUDIES.map((study, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row gap-8 bg-surface/30 border border-border/50 rounded-[var(--sf-radius-lg)] p-8 md:p-10 hover:border-primary/30 hover:bg-surface/50 transition-colors"
            >
              {/* Client & Context */}
              <div className="lg:w-1/3 flex flex-col">
                <span className="font-mono text-xs text-muted mb-4 block">CASE STUDY 0{i + 1}</span>
                <h3 className="text-2xl tracking-tight mb-6">{study.client}</h3>
                <div className="mt-auto">
                  <span className="text-primary font-mono text-[10px] uppercase block mb-2">The Bottleneck</span>
                  <p className="text-sm text-text-secondary">{study.problem}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-border/50" />
              <div className="lg:hidden h-px bg-border/50 w-full" />

              {/* Solution & Metrics */}
              <div className="lg:w-2/3 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <span className="text-foreground font-mono text-[10px] uppercase block mb-2">Deployed Architecture</span>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {study.solution}
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                    REQUEST ARCHITECTURE BLUEPRINT <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="flex flex-col gap-6 md:min-w-[140px] md:border-l border-border/50 md:pl-8 justify-center">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="text-4xl font-mono font-bold text-foreground mb-1 tracking-tighter">{m.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
