"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/lead-generation", label: "Lead Generation" },
    { href: "/services/ai-agents", label: "AI Agents" },
    { href: "/services/workflow-automation", label: "Workflow Automation" },
    { href: "/services/cloud-infrastructure", label: "Cloud Infrastructure" },
    { href: "/services/voice-ai", label: "Voice AI" },
    { href: "/services/data-extraction", label: "Data Extraction" },
    { href: "/services/marketing-growth", label: "Marketing & Growth" },
  ],
  resources: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-background text-foreground overflow-hidden">
      {/* Pipeline decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="sf-container py-12 md:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6">
              <Logo className="text-foreground" />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-xs">
              Intelligent systems that transform how businesses operate. From
              input to output, every layer engineered for scale.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
              <span>Data Systems</span>
              <span className="text-[#FF4D2E]">·</span>
              <span>AI Pipelines</span>
              <span className="text-[#FF4D2E]">·</span>
              <span>Automation</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.15em] text-muted uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-[#FF4D2E] transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.15em] text-muted uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-[#FF4D2E] transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.15em] text-muted uppercase mb-6">
              Resources
            </h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-[#FF4D2E] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-mono tracking-[0.15em] text-muted uppercase mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:strataflow.02@gmail.com"
                className="text-sm text-text-secondary hover:text-[#FF4D2E] transition-colors duration-300"
              >
                strataflow.02@gmail.com
              </a>
              <a
                href="tel:7502344441"
                className="text-sm text-text-secondary hover:text-[#FF4D2E] transition-colors duration-300"
              >
                7502344441
              </a>
            </div>
          </div>
        </div>

        {/* Pipeline flow decoration */}
        <div className="relative py-8 mb-8 border-t border-border">
          <div className="flex items-center justify-center gap-4 md:gap-8 overflow-hidden">
            {["INPUT", "PROCESSING", "AI CORE", "AUTOMATION", "OUTPUT"].map(
              (stage, i) => (
                <div key={stage} className="flex items-center gap-4 md:gap-8">
                  <span
                    className={`font-mono text-[10px] md:text-xs tracking-[0.15em] ${
                      stage === "AI CORE"
                        ? "text-[#FF4D2E] font-bold"
                        : "text-muted"
                    }`}
                  >
                    {stage}
                  </span>
                  {i < 4 && (
                    <span className="text-[#FF4D2E]/40 text-xs">→</span>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} StrataFlow. All rights reserved.</p>
          <p className="font-mono tracking-wider">
            OPERATIONAL INTELLIGENCE SYSTEMS
          </p>
        </div>
      </div>
    </footer>
  );
}
