"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PROBLEMS = [
  {
    id: "scattered-data",
    title: "Scattered Data",
    shortDesc: "Information exists in silos, preventing unified intelligence.",
    detail: "Your CRM, ERP, and marketing platforms don't talk. When data isn't centralized, you can't build predictive models or automate cross-platform workflows. The system is fragmented.",
    Visualization: ({ active }: { active: boolean }) => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/80 rounded-full"
            initial={false}
            animate={{
              x: active ? 0 : Math.sin(i * 1234.5678) * 40,
              y: active ? 0 : Math.cos(i * 4321.8765) * 40,
              opacity: active ? 1 : 0.4,
              scale: active ? 1.5 : 1
            }}
            transition={{ 
              duration: active ? 0.5 : 2, 
              repeat: active ? 0 : Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          />
        ))}
        {active && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute w-8 h-8 border border-primary rounded-full"
          />
        )}
      </div>
    )
  },
  {
    id: "manual-operations",
    title: "Manual Operations",
    shortDesc: "Human capital wasted on repetitive, programmable tasks.",
    detail: "Highly paid employees are copy-pasting data, sending routine follow-ups, and building reports by hand. This doesn't scale and introduces constant human error into the pipeline.",
    Visualization: ({ active }: { active: boolean }) => (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
        <motion.div
          className="w-12 h-3 border border-muted flex items-center p-0.5"
          animate={{ x: active ? [0, 5, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <motion.div 
            className="h-full bg-muted w-1/3" 
            animate={{ x: active ? [0, 24, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </motion.div>
        {active && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[8px] font-mono text-primary mt-2"
          >
            ERR: MANUAL_OVERRIDE
          </motion.div>
        )}
      </div>
    )
  },
  {
    id: "inconsistent-leads",
    title: "Inconsistent Leads",
    shortDesc: "Acquisition is unpredictable and impossible to forecast.",
    detail: "Without an automated extraction and qualification pipeline, lead flow is chaotic. You are relying on hope rather than a deterministic, engineered growth system.",
    Visualization: ({ active }: { active: boolean }) => (
      <div className="relative w-full h-full flex items-end justify-center gap-1 pb-4">
        {[40, 70, 20, 90, 30].map((h, i) => (
          <motion.div
            key={i}
            className={cn("w-2", active ? "bg-primary" : "bg-muted")}
            animate={{ height: active ? `${h}%` : `${Math.abs(Math.sin(i * 456)) * 50 + 10}%` }}
            transition={{ duration: active ? 0.5 : 1.5, repeat: active ? 0 : Infinity, repeatType: "mirror" }}
          />
        ))}
      </div>
    )
  },
  {
    id: "disconnected-systems",
    title: "Disconnected Systems",
    shortDesc: "Tools act as isolated bottlenecks instead of amplifiers.",
    detail: "Your tech stack is a liability. Every new tool adds complexity instead of capability because there is no central orchestration layer governing the data flow.",
    Visualization: ({ active }: { active: boolean }) => (
      <div className="relative w-full h-full flex items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-muted rounded-sm" />
        <div className="relative w-8 h-[2px]">
          <div className="absolute inset-0 bg-muted" />
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background"
          />
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 text-primary"
            animate={{ opacity: active ? [1, 0, 1] : 1, rotate: active ? [0, 45, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          >
            ⨯
          </motion.div>
        </div>
        <div className="w-6 h-6 border-2 border-muted rounded-sm" />
      </div>
    )
  }
];

export function Problems() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="sf-section bg-surface/30 border-y border-border/50">
      <div className="sf-container">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Sticky Header */}
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <div className="sf-pipeline-label">
                <span className="text-primary mr-2">[!]</span> SYSTEM FAILURE
              </div>
              <h2 className="mb-6">
                The problem is <span className="text-muted">systemic.</span>
              </h2>
              <p className="text-sm">
                Most companies try to solve operational problems by buying more software. But the issue isn&apos;t a lack of tools — it&apos;s a lack of architecture.
              </p>
            </div>
          </div>

          {/* Interactive Problem List */}
          <div className="md:w-2/3 flex flex-col gap-4">
            {PROBLEMS.map((problem) => {
              const isActive = hoveredId === problem.id;
              
              return (
                <motion.div
                  key={problem.id}
                  className="group relative flex flex-col sm:flex-row gap-6 p-6 md:p-8 bg-surface border border-border/50 rounded-[var(--sf-radius-lg)] overflow-hidden cursor-crosshair"
                  onHoverStart={() => setHoveredId(problem.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={{ borderColor: "rgba(255, 59, 29, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Visualization Block */}
                  <div className="relative w-full sm:w-32 h-24 sm:h-auto flex-shrink-0 bg-background border border-border/50 rounded-[var(--sf-radius-sm)] flex items-center justify-center">
                    <problem.Visualization active={isActive} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <h4 className="text-lg mb-2 group-hover:text-primary transition-colors">
                      {problem.title}
                    </h4>
                    <p className="text-sm text-text-secondary mb-0">
                      {problem.shortDesc}
                    </p>
                    
                    {/* Expandable Detail */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-muted font-mono leading-relaxed border-l border-primary/30 pl-3">
                            {problem.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
