import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, Server, Database, Layers, Search, Code, Cpu, Volume2 } from "lucide-react";
import { CTABlock } from "@/components/ui/cta-block";

export const metadata: Metadata = {
  title: "Services | StrataFlow",
  description: "Explore our operational intelligence systems including AI Agents, Workflow Automation, and Cloud Infrastructure.",
};

const SERVICES = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    desc: "Autonomous agents that handle complex business tasks 24/7.",
    icon: Cpu,
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    desc: "End-to-end process automation eliminating manual operations.",
    icon: Layers,
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    desc: "Automated pipelines that identify and qualify leads at scale.",
    icon: Search,
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    desc: "Production-grade infrastructure designed for AI workloads.",
    icon: Server,
  },
  {
    slug: "voice-ai",
    title: "Voice AI",
    desc: "Conversational voice agents for inbound support and outbound calling.",
    icon: Volume2,
  },
  {
    slug: "data-extraction",
    title: "Data Extraction",
    desc: "Turn unstructured documents and websites into clean, structured data.",
    icon: Database,
  },
  {
    slug: "marketing-growth",
    title: "Marketing & Growth",
    desc: "Programmatic SEO, automated content, and personalized outreach.",
    icon: Code,
  }
];

export default function ServicesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="sf-container">
          
          <div className="max-w-3xl mb-24">
            <div className="sf-pipeline-label mb-8">SYSTEM DIRECTORY</div>
            <h1 className="mb-8 tracking-tight text-5xl md:text-6xl">
              Operational Intelligence <br /><span className="text-muted">Modules.</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              We design, build, and deploy custom infrastructure. Select a module below to explore its capabilities, architecture, and deployment process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.slug} 
                  href={`/services/${service.slug}`}
                  className="group block p-10 sf-glass rounded-none border border-border/50 hover:border-primary/50 transition-all hover:bg-surface/50 shadow-sm hover:shadow-xl"
                >
                  <Icon className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform origin-left" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-text-secondary leading-relaxed mb-8">{service.desc}</p>
                  <div className="text-sm font-mono font-bold text-foreground flex items-center gap-2 group-hover:gap-4 transition-all">
                    EXPLORE SYSTEM <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
      
      <CTABlock 
        title="Don't see what you need?"
        subtitle="We build fully custom infrastructure from the ground up. Book a call and tell us your operational bottlenecks."
      />
      <Footer />
    </>
  );
}
