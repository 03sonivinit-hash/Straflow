import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CTABlock } from "@/components/ui/cta-block";
import { MetricCounter } from "@/components/ui/metric-counter";

export const metadata: Metadata = {
  title: "About",
  description: "StrataFlow builds intelligent systems that transform how businesses operate. Learn about our mission, team, and approach.",
};

const values = [
  { title: "Systems Over Solutions", description: "We architect interconnected systems, not isolated features. Every component serves the whole." },
  { title: "Intelligence By Design", description: "AI is not an afterthought. It is built into the foundation of every system we create." },
  { title: "Production First", description: "We don't build prototypes. Every system is engineered for production from day one." },
  { title: "Measurable Impact", description: "If we can't measure the outcome, we don't ship it. Data drives every decision." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="sf-section">
          <div className="sf-container">
            <div className="sf-pipeline-label">ABOUT STRATAFLOW</div>
            <h1 className="mb-6 max-w-4xl">
              We don&apos;t build software.{" "}
              <span className="sf-gradient-text">We build systems.</span>
            </h1>
            <p className="text-lg max-w-2xl mb-16">
              StrataFlow was founded on a simple belief: businesses don&apos;t need
              more tools — they need architecture. We build the operational
              intelligence layer that connects data, AI, and automation into
              systems that run themselves.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <MetricCounter end={50} suffix="+" label="Systems Deployed" />
              <MetricCounter end={99} suffix=".9%" label="Uptime" />
              <MetricCounter end={10} suffix="M+" label="Tasks Automated" />
              <MetricCounter end={40} suffix="+" label="Enterprise Clients" />
            </div>
          </div>
        </section>

        <section className="sf-section py-12 bg-surface/30">
          <div className="sf-container">
            <h2 className="mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="p-6 rounded-[var(--sf-radius-lg)] border border-border bg-background"
                >
                  <span className="font-mono text-xs text-primary mb-3 block">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h4 className="mb-2">{value.title}</h4>
                  <p className="text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sf-section py-12">
          <div className="sf-container max-w-3xl">
            <h2 className="mb-8">Our Approach</h2>
            <div className="space-y-8">
              {[
                { stage: "INPUT", title: "Discover", desc: "We audit your current systems, data flows, and bottlenecks to understand where intelligence can be injected." },
                { stage: "PROCESSING", title: "Design", desc: "We architect the system — every layer, every connection, every data flow — before writing a single line of code." },
                { stage: "AI CORE", title: "Build", desc: "We engineer production-grade systems with AI at the core. No prototypes, no MVPs — real infrastructure from day one." },
                { stage: "AUTOMATION", title: "Deploy", desc: "We deploy with full monitoring, error handling, and automated scaling. Your system runs without babysitting." },
                { stage: "OUTPUT", title: "Optimize", desc: "We continuously monitor performance, fine-tune AI models, and optimize for better outcomes over time." },
              ].map((step, i) => (
                <div key={step.stage} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${step.stage === "AI CORE" ? "border-primary bg-primary/10" : "border-border"}`}>
                      <span className="font-mono text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    {i < 4 && <div className="w-px h-full bg-border mt-2" />}
                  </div>
                  <div className="pb-8">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-muted">[{step.stage}]</span>
                    <h4 className="mb-2">{step.title}</h4>
                    <p className="text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABlock />
      </main>
      <Footer />
    </>
  );
}
