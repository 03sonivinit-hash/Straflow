import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactWizard } from "@/components/sections/contact-wizard";

export const metadata: Metadata = {
  title: "Contact — System Assessment",
  description:
    "Take our System Assessment to identify your biggest operational bottlenecks. Get a customized StrataFlow architecture recommendation.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactWizard />
      </main>
      <Footer />
    </>
  );
}
