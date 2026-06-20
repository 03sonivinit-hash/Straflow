"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const PipelineScene = dynamic(
  () => import("@/components/three/pipeline-scene").then((mod) => mod.PipelineScene),
  { ssr: false }
);

const PIPELINE_STAGES = [
  { id: "INPUT", label: "DATA INGESTION" },
  { id: "PROCESSING", label: "ETL & VALIDATION" },
  { id: "AI CORE", label: "INTELLIGENCE LAYER" },
  { id: "AUTOMATION", label: "WORKFLOW ENGINE" },
  { id: "OUTPUT", label: "BUSINESS RESULTS" }
];

export function Hero() {
  const [currentStage, setCurrentStage] = useState(-1);
  const [systemOnline, setSystemOnline] = useState(false);

  useEffect(() => {
    // System boot sequence: animate through stages quickly
    const sequenceTime = 200; // ms per stage
    
    const stageTimers = PIPELINE_STAGES.map((_, i) =>
      setTimeout(() => setCurrentStage(i), 500 + i * sequenceTime)
    );

    // Final state: system online, reveal headline
    const onlineTimer = setTimeout(() => {
      setSystemOnline(true);
    }, 500 + PIPELINE_STAGES.length * sequenceTime + 400);

    return () => {
      stageTimers.forEach(clearTimeout);
      clearTimeout(onlineTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Immersive 3D Network Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <PipelineScene />
      </Suspense>

      {/* Grid overlay for structural feel */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 sf-container w-full pt-32 pb-20 flex flex-col items-start justify-center min-h-screen">
        
        {/* System Boot Sequence (Top Left) */}
        <div className="absolute top-32 left-6 md:left-10 font-mono text-[10px] md:text-xs tracking-widest text-muted space-y-2">
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${systemOnline ? 'bg-primary shadow-[0_0_8px_var(--sf-primary)]' : 'bg-muted'}`} />
            <span className={systemOnline ? 'text-primary font-bold' : ''}>
              {systemOnline ? 'SYSTEM.ONLINE' : 'SYSTEM.BOOTING...'}
            </span>
          </div>

          {PIPELINE_STAGES.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: currentStage >= i ? 1 : 0.3,
                x: currentStage >= i ? 0 : -10 
              }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4"
            >
              <span className={`w-24 ${currentStage === i ? 'text-foreground' : ''}`}>[{stage.id}]</span>
              <span className="hidden md:inline-block text-muted/50">............</span>
              <span className={currentStage === i ? 'text-primary' : ''}>
                {currentStage >= i ? 'ACTIVE' : 'STANDBY'}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main Content Reveal */}
        <div className="w-full max-w-5xl mt-40 md:mt-20">
          <AnimatePresence>
            {systemOnline && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-foreground leading-[1.05] mb-6">
                  SYSTEMS THAT RUN<br />
                  <span className="text-muted">YOUR BUSINESS.</span>
                </h1>

                <motion.p 
                  className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  We design and deploy AI infrastructure, automation systems and operational intelligence that scale modern businesses.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-foreground text-background text-sm font-bold uppercase tracking-wider rounded-[var(--sf-radius-sm)] hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[var(--sf-shadow-glow)]"
                  >
                    Book Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#architecture"
                    className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent text-foreground border border-border/50 text-sm font-bold uppercase tracking-wider rounded-[var(--sf-radius-sm)] hover:bg-surface-hover hover:border-border transition-all duration-300"
                  >
                    Explore Systems
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
