import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Terms of Service | StrataFlow",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-32">
        <div className="sf-container max-w-4xl">
          <h1 className="mb-8">Terms of Service</h1>
          <p className="text-muted mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-12 text-lg text-text-secondary leading-loose">
            <section>
              <h2 className="text-2xl text-foreground mb-4">1. Enterprise SLAs</h2>
              <p>All StrataFlow deployments are subject to specific Service Level Agreements (SLAs) outlined in your Master Services Agreement. Standard uptime guarantees are set at 99.99% for critical infrastructure.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-foreground mb-4">2. Intellectual Property</h2>
              <p>The custom middleware, AI agents, and workflow systems developed for your enterprise become your proprietary property upon final payment, unless otherwise stated in the open-source usage addendum.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-foreground mb-4">3. Liability Limits</h2>
              <p>StrataFlow builds highly resilient systems, but we are not liable for outages caused by third-party downstream APIs (e.g., Salesforce downtime, OpenAI rate limits).</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
