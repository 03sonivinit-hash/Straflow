import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Privacy Policy | StrataFlow",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-32">
        <div className="sf-container max-w-4xl">
          <h1 className="mb-8">Privacy Policy</h1>
          <p className="text-muted mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-12 text-lg text-text-secondary leading-loose">
            <section>
              <h2 className="text-2xl text-foreground mb-4">1. Information Collection</h2>
              <p>We collect information that you provide directly to us when you use our operational intelligence platform, request technical support, or communicate with us.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-foreground mb-4">2. Zero Data Retention Models</h2>
              <p>For all AI and LLM integrations, we employ strict Zero Data Retention policies. Your proprietary business data sent through our pipelines is never used to train generalized models. We partner exclusively with enterprise APIs that enforce SOC2 compliance.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-foreground mb-4">3. Security</h2>
              <p>We use state-of-the-art encryption (AES-256 at rest, TLS 1.3 in transit) to protect your data. All cloud infrastructure is deployed within isolated Virtual Private Clouds (VPCs).</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
