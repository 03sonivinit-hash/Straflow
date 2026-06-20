"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Activity, Server, Users } from "lucide-react";

const SECURITY_FEATURES = [
  { id: "enc", name: "AES-256 ENCRYPTION", icon: Lock, status: "ACTIVE", latency: "1.2ms" },
  { id: "mon", name: "24/7 MONITORING", icon: Activity, status: "ACTIVE", latency: "Live" },
  { id: "infra", name: "ISOLATED CLOUD", icon: Server, status: "SECURE", latency: "99.99%" },
  { id: "api", name: "ZERO-TRUST APIs", icon: ShieldCheck, status: "VERIFIED", latency: "0.8ms" },
  { id: "rbac", name: "ROLE-BASED ACCESS", icon: Users, status: "ENFORCED", latency: "Strict" }
];

export function Security() {
  return (
    <section className="sf-section bg-background overflow-hidden border-t border-border/50">
      <div className="sf-container">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/3">
            <div className="sf-pipeline-label">
              <Lock className="w-3 h-3 text-primary mr-1" /> INFRASTRUCTURE
            </div>
            <h2 className="mb-6">Enterprise <span className="text-muted">grade.</span></h2>
            <p className="text-sm text-text-secondary mb-8">
              We build systems that handle sensitive operational data. Every layer of the StrataFlow stack is engineered with military-grade encryption, zero-trust architecture, and continuous monitoring.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-muted">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEMS OPERATIONAL AND SECURE
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            {/* Premium Infrastructure Visualization Console */}
            <div className="bg-[#0A0A0A] border border-border/40 rounded-[var(--sf-radius-lg)] p-1 overflow-hidden shadow-[var(--sf-shadow-xl)]">
              {/* Console Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-surface/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border/50" />
                </div>
                <div className="ml-auto flex items-center gap-4 text-[10px] font-mono text-muted">
                  <span>PROTO: STRATA-V2</span>
                  <span>NODE: US-EAST-1</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-6 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="relative z-10 flex flex-col gap-3">
                  {SECURITY_FEATURES.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div 
                        key={feature.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-surface/30 border border-border/30 rounded-[var(--sf-radius-sm)] hover:bg-surface/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 min-w-[200px]">
                          <div className="w-8 h-8 rounded border border-border/50 bg-background flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs font-mono text-foreground font-semibold tracking-wider">
                            {feature.name}
                          </span>
                        </div>

                        <div className="flex-1 hidden sm:block">
                          <div className="w-full h-px bg-gradient-to-r from-border/50 to-transparent" />
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[150px]">
                          <span className="text-[10px] font-mono text-muted">
                            {feature.latency}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {feature.status}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
