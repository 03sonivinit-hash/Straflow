import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CTABlock } from "@/components/ui/cta-block";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore real-world StrataFlow deployments and the measurable outcomes our intelligent systems deliver across industries.",
};

const caseStudies = [
  {
    title: "Enterprise Lead Engine",
    industry: "Real Estate",
    challenge: "A national real estate network was manually processing 2,000+ property inquiries daily across 15 regional offices.",
    solution: "Built an end-to-end lead processing system: web scraping → AI qualification → CRM routing → automated follow-up sequences.",
    results: [{ metric: "340%", label: "More Qualified Leads" }, { metric: "28%", label: "Conversion Rate" }, { metric: "85%", label: "Time Saved" }],
  },
  {
    title: "AI Customer Service Platform",
    industry: "E-Commerce",
    challenge: "Handling 50,000+ monthly support tickets with a team of 12 agents. Response times averaged 4 hours.",
    solution: "Deployed custom AI agents with knowledge base integration, sentiment-based routing, and intelligent escalation workflows.",
    results: [{ metric: "70%", label: "Tickets Auto-Resolved" }, { metric: "94%", label: "Customer Satisfaction" }, { metric: "60%", label: "Cost Reduction" }],
  },
  {
    title: "Predictive Operations System",
    industry: "Manufacturing",
    challenge: "Unplanned equipment downtime was costing $2M+ annually. No predictive maintenance capability existed.",
    solution: "Built a sensor data pipeline → anomaly detection AI → automated maintenance scheduling → real-time dashboards.",
    results: [{ metric: "60%", label: "Downtime Reduction" }, { metric: "99.5%", label: "Uptime Achieved" }, { metric: "$2M", label: "Annual Savings" }],
  },
  {
    title: "Voice AI Sales System",
    industry: "Insurance",
    challenge: "Sales team could only handle 200 outbound calls per day. Lead follow-up was inconsistent and slow.",
    solution: "Deployed Voice AI agents that handle initial qualification calls, schedule appointments, and sync with CRM.",
    results: [{ metric: "5x", label: "Call Volume" }, { metric: "40%", label: "Meeting Book Rate" }, { metric: "3x", label: "Revenue Growth" }],
  },
  {
    title: "Data Extraction Pipeline",
    industry: "Legal",
    challenge: "Lawyers spent 30+ hours/week manually reviewing contracts to extract key terms and obligations.",
    solution: "Built a document OCR → GPT-4 parsing → structured extraction → searchable database pipeline.",
    results: [{ metric: "95%", label: "Extraction Accuracy" }, { metric: "100x", label: "Faster Processing" }, { metric: "$500K", label: "Annual Savings" }],
  },
  {
    title: "Growth Marketing Engine",
    industry: "SaaS",
    challenge: "Marketing team of 3 couldn't scale content production or accurately attribute conversions across channels.",
    solution: "Built AI content generation pipeline, multi-touch attribution model, and automated A/B testing framework.",
    results: [{ metric: "3x", label: "Content Output" }, { metric: "45%", label: "Lower CAC" }, { metric: "2x", label: "Trial Conversions" }],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="sf-section">
          <div className="sf-container">
            <div className="sf-pipeline-label">
              <span className="text-primary mr-1">[05]</span> OUTPUT
            </div>
            <h1 className="mb-6 max-w-3xl">
              Systems in{" "}
              <span className="sf-gradient-text">production.</span>
            </h1>
            <p className="text-lg max-w-2xl mb-16">
              Real results from real deployments. Every case study represents a living,
              breathing system in production.
            </p>

            <div className="space-y-8">
              {caseStudies.map((cs) => (
                <div
                  key={cs.title}
                  className="p-6 md:p-8 rounded-[var(--sf-radius-lg)] border border-border bg-surface/50 hover:shadow-[var(--sf-shadow-md)] transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <span className="text-xs font-mono tracking-[0.15em] text-primary mb-2 block uppercase">
                        {cs.industry}
                      </span>
                      <h3 className="mb-3">{cs.title}</h3>

                      <div className="mb-4">
                        <h5 className="text-xs font-mono tracking-[0.15em] text-muted mb-1 uppercase">
                          Challenge
                        </h5>
                        <p className="text-sm">{cs.challenge}</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-mono tracking-[0.15em] text-muted mb-1 uppercase">
                          Solution
                        </h5>
                        <p className="text-sm">{cs.solution}</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-6 md:gap-4 flex-shrink-0 md:w-40">
                      {cs.results.map((r) => (
                        <div key={r.label} className="text-center md:text-right">
                          <div className="font-mono text-2xl font-bold text-primary">
                            {r.metric}
                          </div>
                          <div className="text-[10px] text-muted font-mono uppercase tracking-wider">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
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
