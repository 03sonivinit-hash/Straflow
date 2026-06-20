import { TearableReveal } from "@/components/ui/tearable-reveal";
import { Server, Zap, Database, Lock, Search } from "lucide-react";

export function TearableDemo() {
  const topLayer = (
    <div className="w-full h-[60vh] min-h-[500px] bg-foreground text-background flex flex-col justify-center items-center relative p-8">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-2xl text-center relative z-10">
        <div className="text-[10px] font-mono tracking-widest text-background/50 mb-6 uppercase border border-background/20 inline-block px-3 py-1 rounded">
          Status Quo
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-background">
          The Legacy Stack is <span className="text-background/50">Fragile.</span>
        </h2>
        <p className="text-lg text-background/70 mb-12">
          Your data is trapped in silos. Your employees are copying and pasting across 15 different browser tabs. Operations are breaking under the weight of manual processes.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 opacity-50">
          <div className="p-4 border border-background/20 rounded-md flex items-center gap-2"><Database className="w-4 h-4" /> Disconnected CRMs</div>
          <div className="p-4 border border-background/20 rounded-md flex items-center gap-2"><Lock className="w-4 h-4" /> Data Silos</div>
          <div className="p-4 border border-background/20 rounded-md flex items-center gap-2"><Search className="w-4 h-4" /> Manual Triage</div>
        </div>
      </div>
    </div>
  );

  const bottomLayer = (
    <div className="w-full h-[60vh] min-h-[500px] bg-surface flex flex-col justify-center items-center relative p-8">
      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,var(--color-primary)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-2xl text-center relative z-10 pl-16 md:pl-24">
        <div className="text-[10px] font-mono tracking-widest text-primary mb-6 uppercase border border-primary/20 bg-primary/10 inline-block px-3 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block mr-2 animate-pulse" />
          The StrataFlow Layer
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Engineered for <span className="text-primary">Autonomy.</span>
        </h2>
        <p className="text-lg text-text-secondary mb-12">
          We strip away the noise and build unified operational pipelines. Real-time extraction, AI-driven reasoning, and programmatic execution. No manual labor required.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="p-4 sf-glass border border-primary/20 rounded-md flex items-center gap-2 text-primary font-medium"><Server className="w-4 h-4" /> Autonomous Agents</div>
          <div className="p-4 sf-glass border border-border/50 rounded-md flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Event-Driven Workflows</div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="border-y border-border/50 bg-background overflow-hidden">
      <TearableReveal 
        topContent={topLayer} 
        bottomContent={bottomLayer}
        tearThreshold={250}
      />
    </section>
  );
}
