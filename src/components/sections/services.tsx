"use client";

import { ArrowRight, Bot, Workflow, Target, Mic, FileSearch, Cloud } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "ai-agents",
    title: "AI Agents",
    icon: Bot,
    shortDesc: "Autonomous agents that handle complex business tasks 24/7.",
    capabilities: ["Custom LLM orchestration", "RAG Knowledge bases", "Multi-tool usage"],
    outcomes: ["70% ticket resolution", "24/7 availability"],
    slug: "ai-agents"
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    icon: Workflow,
    shortDesc: "End-to-end process automation eliminating manual operations.",
    capabilities: ["Event-driven triggers", "Cross-system sync", "Error handling"],
    outcomes: ["10x faster processing", "Zero human error"],
    slug: "workflow-automation"
  },
  {
    id: "lead-gen",
    title: "Lead Generation",
    icon: Target,
    shortDesc: "Automated pipelines that identify and qualify leads at scale.",
    capabilities: ["Multi-channel scraping", "AI qualification", "CRM routing"],
    outcomes: ["340% more leads", "28% conversion rate"],
    slug: "lead-generation"
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    icon: Cloud,
    shortDesc: "Production-grade infrastructure designed for AI workloads.",
    capabilities: ["Auto-scaling K8s", "CI/CD pipelines", "Security hardening"],
    outcomes: ["99.99% uptime", "40% cost savings"],
    slug: "cloud-infrastructure"
  }
];

export function Services() {
  return (
    <section id="services" className="sf-section bg-surface/5 border-y border-border/30">
      <div className="sf-container">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="sf-pipeline-label">
              <span className="text-primary mr-2">{"//"}</span> CORE SYSTEMS
            </div>
            <h2 className="mb-4">Modular <span className="text-muted">intelligence.</span></h2>
            <p className="text-sm text-text-secondary">
              We deploy specific capabilities that plug into your existing architecture or function as standalone systems.
            </p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-2 text-[11px] font-mono font-bold text-foreground hover:text-primary transition-colors py-2 md:py-0 md:pb-2 border-b border-transparent md:border-border hover:border-primary min-h-[44px] md:min-h-0"
          >
            VIEW ALL MODULES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;

            return (
              <Link
                href={`/services/${service.slug}`}
                key={service.id}
                className="group relative flex flex-col h-full bg-surface/30 border border-border/50 rounded-[var(--sf-radius-lg)] p-6 md:p-8 overflow-hidden hover:bg-surface/50 hover:border-border transition-all duration-300"
              >
                {/* Premium Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-[var(--sf-radius-md)] border border-border/50 bg-background flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors">
                      <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest border border-border/30 px-2 py-1 rounded bg-background/50">
                      SYS.{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl tracking-tight mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-text-secondary mb-8 flex-1">
                    {service.shortDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                    {service.outcomes.map((outcome, idx) => {
                      const [metric, ...labelParts] = outcome.split(" ");
                      return (
                        <div key={idx}>
                          <div className="text-2xl font-bold text-foreground font-mono mb-1">{metric}</div>
                          <div className="text-[10px] text-muted uppercase tracking-wider leading-tight">
                            {labelParts.join(" ")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
