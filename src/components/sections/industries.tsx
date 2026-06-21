"use client";

const INDUSTRIES = [
  {
    name: "B2B SaaS",
    challenge: "High CAC, manual onboarding, high churn on complex products.",
    system: "Automated trial-to-paid engagement engines, AI-driven customer success monitoring.",
    impact: "Lower CAC, higher LTV"
  },
  {
    name: "Agencies & Services",
    challenge: "Inconsistent lead flow, unscalable fulfillment, manual reporting.",
    system: "Lead extraction pipelines, programmatic fulfillment workflows.",
    impact: "Higher margins"
  },
  {
    name: "Real Estate",
    challenge: "Slow lead response times, scattered property data, manual follow-ups.",
    system: "Instant AI qualification bots, centralized property data lakes.",
    impact: "Higher conversion rate"
  },
  {
    name: "E-Commerce",
    challenge: "Support ticket volume, generic marketing, manual inventory sync.",
    system: "Tier-1 AI support agents, personalized recommendation engines.",
    impact: "Lower support costs"
  }
];

export function Industries() {
  return (
    <section id="industries" className="sf-section">
      <div className="sf-container">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="sf-pipeline-label">
              <span className="text-primary mr-2">{"//"}</span> DEPLOYMENT DOMAINS
            </div>
            <h2 className="mb-4">Industry <span className="text-muted">agnostic.</span></h2>
            <p className="text-sm text-text-secondary">
              Inefficiency looks the same in every sector. We build operational intelligence layers tailored to the specific bottlenecks of your industry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRIES.map((industry, i) => (
            <div
              key={i}
              className="flex flex-col justify-between bg-surface/30 border border-border/50 rounded-[var(--sf-radius-lg)] p-6 md:p-8 hover:bg-surface/50 hover:border-border transition-all duration-300"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl tracking-tight">{industry.name}</h3>
                  <span className="font-mono text-xs text-muted">[{String(i + 1).padStart(2, '0')}]</span>
                </div>
                
                <h4 className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">The Bottleneck</h4>
                <p className="text-sm text-text-secondary mb-6">{industry.challenge}</p>
                
                <h4 className="text-[10px] font-mono text-foreground uppercase tracking-widest mb-2">Standard Deployment</h4>
                <p className="text-sm">{industry.system}</p>
              </div>
              
              <div className="pt-5 border-t border-border/50 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted">PRIMARY OUTCOME</span>
                <span className="text-xs font-mono text-foreground font-semibold bg-surface px-3 py-1 rounded-md border border-border/50">{industry.impact}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
