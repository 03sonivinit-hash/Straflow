import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TearableDemo } from "@/components/sections/tearable-demo";
import { Problems } from "@/components/sections/problems";
import { Solution } from "@/components/sections/solution";
import { Services } from "@/components/sections/services";
import { Architecture } from "@/components/sections/architecture";
import { Industries } from "@/components/sections/industries";
import { CaseStudies } from "@/components/sections/case-studies";
import { WhyStrataFlow } from "@/components/sections/why-strataflow";
import { Security } from "@/components/sections/security";
import { CTABlock } from "@/components/ui/cta-block";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TearableDemo />
        <Problems />
        <Solution />
        <Services />
        <Architecture />
        <Industries />
        <CaseStudies />
        <WhyStrataFlow />
        <Security />
        <CTABlock />
      </main>
      <Footer />
    </>
  );
}
