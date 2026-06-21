"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Check,
  Building2,
  Users,
  Database,
  AlertCircle,
  Target,
  User,
  ListChecks,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

// --- Schema ---
const contactSchema = z.object({
  industry: z.string().min(1, "Please select your industry"),
  companySize: z.string().min(1, "Please select your company size"),
  currentSystems: z.array(z.string()).min(1, "Select at least one system"),
  bottleneck: z.string().min(1, "Please select your biggest bottleneck"),
  projectGoal: z.string().min(1, "Please select your primary goal"),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// --- Step Data ---
const industries = ["Healthcare", "Finance", "Real Estate", "E-Commerce", "Manufacturing", "Logistics", "SaaS / Technology", "Professional Services", "Other"];
const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"];
const systems = ["Salesforce", "HubSpot", "Zendesk", "Custom ERP", "Shopify", "NetSuite", "Spreadsheets/Manual", "Other"];
const bottlenecks = [
  { label: "Manual Data Entry", desc: "Too much time spent on repetitive tasks" },
  { label: "Lead Qualification", desc: "Can't efficiently identify prospects" },
  { label: "Customer Support", desc: "Overwhelmed with ticket volume" },
  { label: "Data Silos", desc: "Information trapped in disconnected systems" },
  { label: "Scaling Operations", desc: "Processes break as company grows" },
  { label: "Reporting & Analytics", desc: "No real-time visibility" },
];
const goals = [
  "Automate internal workflows",
  "Deploy AI support agents",
  "Scale lead generation",
  "Upgrade cloud infrastructure",
  "Automate data extraction",
  "General digital transformation"
];

const STEPS = [
  { id: "industry", label: "Industry", icon: Building2 },
  { id: "size", label: "Company Size", icon: Users },
  { id: "systems", label: "Current Systems", icon: Database },
  { id: "bottleneck", label: "Bottleneck", icon: AlertCircle },
  { id: "goal", label: "Project Goals", icon: Target },
  { id: "contact", label: "Contact Info", icon: User },
  { id: "review", label: "Review & Submit", icon: ListChecks },
];

export function ContactWizard() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    setValue,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { industry: "", companySize: "", currentSystems: [], bottleneck: "", projectGoal: "", fullName: "", email: "", phone: "", message: "" },
  });

  const formValues = watch();

  const canProceed = () => {
    switch (step) {
      case 0: return !!formValues.industry;
      case 1: return !!formValues.companySize;
      case 2: return formValues.currentSystems.length > 0;
      case 3: return !!formValues.bottleneck;
      case 4: return !!formValues.projectGoal;
      case 5: return !!formValues.fullName && !!formValues.email;
      case 6: return true;
      default: return false;
    }
  };

  const nextStep = () => { if (canProceed() && step < STEPS.length - 1) setStep(step + 1); };
  const prevStep = () => { if (step > 0) setStep(step - 1); };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) setIsSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSystem = (system: string) => {
    const current = formValues.currentSystems;
    const updated = current.includes(system) ? current.filter((s) => s !== system) : [...current, system];
    setValue("currentSystems", updated);
  };

  if (isSubmitted) {
    return (
      <section className="sf-section min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-2xl p-12 sf-glass rounded-[var(--sf-radius-lg)] border border-border/50">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mb-6">System assessment complete.</h2>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            We have received your requirements. Our engineering team will review your architecture needs and reach out within 24 hours to schedule your strategy session.
          </p>
          <MagneticButton href="/" variant="primary">Return Home</MagneticButton>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[85vh] border-y border-border/50 bg-background overflow-hidden">
      
      {/* Left Panel - Branding & Steps */}
      <div className="lg:w-1/3 bg-surface border-r border-border/50 p-6 md:p-12 xl:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="sf-pipeline-label mb-8">SYSTEM ASSESSMENT</div>
          <h1 className="text-4xl md:text-5xl tracking-tight mb-6">Architect your <br/>future.</h1>
          <p className="text-base text-text-secondary mb-16 leading-relaxed max-w-sm">
            Complete this technical assessment. We will design a custom intelligence pipeline based on these exact operational parameters.
          </p>

          <div className="space-y-6 hidden lg:block">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === step;
              const isComplete = i < step;

              return (
                <div key={s.id} className="flex items-center gap-5">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500",
                    isActive ? "bg-primary border-primary text-[#111111] dark:text-white shadow-[var(--sf-shadow-sm)] scale-110" : 
                    isComplete ? "bg-foreground border-foreground text-background" : 
                    "bg-surface sf-glass border-border/50 text-muted"
                  )}>
                    {isComplete ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "font-mono text-sm uppercase tracking-widest transition-all duration-300", 
                    isActive ? "text-foreground font-bold" : "text-muted"
                  )}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="relative z-10 hidden lg:flex items-center gap-4 mt-16 pt-8 border-t border-border/50">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="text-xs font-mono text-muted uppercase tracking-widest">Secure SSL Connection</div>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="lg:w-2/3 p-6 md:p-12 xl:p-20 flex flex-col justify-center relative">
        {/* Progress Bar (Mobile mostly, but good for context) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-border/30">
          <motion.div 
            className="h-full bg-primary" 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col max-w-3xl w-full mx-auto justify-center min-h-[50vh]">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              transition={{ duration: 0.3, ease: "easeOut" }} 
            >
              
              {/* Step 0: Industry */}
              {step === 0 && (
                <div className="space-y-8">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 01 / 07</div>
                  <h2 className="text-3xl md:text-4xl mb-10">What is your primary industry?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {industries.map((ind) => (
                      <button
                        key={ind} type="button" onClick={() => setValue("industry", ind)}
                        className={cn(
                          "p-5 rounded-xl border text-left text-sm font-semibold transition-all duration-300", 
                          formValues.industry === ind ? "border-primary bg-primary/10 text-foreground shadow-md ring-1 ring-primary/20 scale-[1.02]" : "border-border/60 hover:border-border text-text-secondary hover:text-foreground sf-glass hover:bg-surface"
                        )}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Company Size */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 02 / 07</div>
                  <h2 className="text-3xl md:text-4xl mb-10">What is your company size?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {companySizes.map((size) => (
                      <button
                        key={size} type="button" onClick={() => setValue("companySize", size)}
                        className={cn(
                          "p-6 rounded-xl border text-left text-base font-semibold transition-all duration-300", 
                          formValues.companySize === size ? "border-primary bg-primary/10 text-foreground shadow-md ring-1 ring-primary/20 scale-[1.02]" : "border-border/60 hover:border-border text-text-secondary hover:text-foreground sf-glass hover:bg-surface"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Current Systems (Multi-Select) */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 03 / 07</div>
                    <h2 className="text-3xl md:text-4xl mb-4">Which systems do you currently use?</h2>
                    <p className="text-lg text-text-secondary mb-10">Select all that apply. We need to know what we are integrating with.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {systems.map((sys) => {
                      const isSelected = formValues.currentSystems.includes(sys);
                      return (
                        <button
                          key={sys} type="button" onClick={() => toggleSystem(sys)}
                          className={cn(
                            "p-5 rounded-xl border text-left text-sm font-semibold transition-all duration-300 flex items-center gap-4", 
                            isSelected ? "border-primary bg-primary/10 text-foreground shadow-md ring-1 ring-primary/20" : "border-border/60 hover:border-border text-text-secondary hover:text-foreground sf-glass hover:bg-surface"
                          )}
                        >
                          <div className={cn("w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors", isSelected ? "bg-primary border-primary text-[#111111] dark:text-white" : "border-border/80 bg-background")}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          {sys}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Bottleneck */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 04 / 07</div>
                  <h2 className="text-3xl md:text-4xl mb-10">What is your primary operational bottleneck?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bottlenecks.map((b) => (
                      <button
                        key={b.label} type="button" onClick={() => setValue("bottleneck", b.label)}
                        className={cn(
                          "p-6 rounded-xl border text-left transition-all duration-300", 
                          formValues.bottleneck === b.label ? "border-primary bg-primary/10 text-foreground shadow-md ring-1 ring-primary/20 scale-[1.02]" : "border-border/60 hover:border-border sf-glass hover:bg-surface"
                        )}
                      >
                        <div className={cn("text-base font-bold mb-2", formValues.bottleneck === b.label ? "text-foreground" : "text-text-secondary")}>{b.label}</div>
                        <div className="text-sm text-muted leading-relaxed">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Project Goals */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 05 / 07</div>
                  <h2 className="text-3xl md:text-4xl mb-10">What is your primary goal for this engagement?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {goals.map((g) => (
                      <button
                        key={g} type="button" onClick={() => setValue("projectGoal", g)}
                        className={cn(
                          "p-6 rounded-xl border text-left text-base font-semibold transition-all duration-300", 
                          formValues.projectGoal === g ? "border-primary bg-primary/10 text-foreground shadow-md ring-1 ring-primary/20 scale-[1.02]" : "border-border/60 hover:border-border text-text-secondary hover:text-foreground sf-glass hover:bg-surface"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Contact Details */}
              {step === 5 && (
                <div className="space-y-8">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 06 / 07</div>
                  <h2 className="text-3xl md:text-4xl mb-10">Where should we send the architecture blueprint?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono uppercase text-muted mb-3 font-bold">Full Name *</label>
                      <input {...register("fullName")} className="w-full min-h-[56px] px-5 py-4 rounded-xl border border-border/80 sf-glass text-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-[16px] md:text-lg" placeholder="John Smith" />
                      {errors.fullName && <p className="text-sm font-medium text-primary mt-2">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-3 font-bold">Email *</label>
                      <input {...register("email")} type="email" className="w-full min-h-[56px] px-5 py-4 rounded-xl border border-border/80 sf-glass text-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-[16px] md:text-lg" placeholder="john@company.com" />
                      {errors.email && <p className="text-sm font-medium text-primary mt-2">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-3 font-bold">Phone</label>
                      <input {...register("phone")} className="w-full min-h-[56px] px-5 py-4 rounded-xl border border-border/80 sf-glass text-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-[16px] md:text-lg" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono uppercase text-muted mb-3 font-bold">Additional Context (Optional)</label>
                      <textarea {...register("message")} rows={4} className="w-full px-5 py-4 rounded-xl border border-border/80 sf-glass text-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none text-[16px] md:text-lg" placeholder="Any specific API endpoints, target metrics, or constraints?" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {step === 6 && (
                <div className="space-y-8">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Step 07 / 07</div>
                  <h2 className="text-3xl md:text-4xl mb-10">Review your assessment.</h2>
                  
                  <div className="sf-glass border border-border/50 rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4 pb-6 border-b border-border/50">
                      <div>
                        <div className="text-xs font-mono text-muted mb-1">Industry</div>
                        <div className="font-semibold text-lg">{formValues.industry}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted mb-1">Company Size</div>
                        <div className="font-semibold text-lg">{formValues.companySize}</div>
                      </div>
                    </div>
                    
                    <div className="pb-6 border-b border-border/50">
                      <div className="text-xs font-mono text-muted mb-3">Current Tech Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {formValues.currentSystems.map(sys => (
                          <span key={sys} className="px-3 py-1 bg-surface border border-border/50 rounded-md text-sm font-medium">{sys}</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/50">
                      <div>
                        <div className="text-xs font-mono text-muted mb-2">Primary Bottleneck</div>
                        <div className="font-semibold text-primary">{formValues.bottleneck}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted mb-2">Target Goal</div>
                        <div className="font-semibold text-foreground">{formValues.projectGoal}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-muted mb-2">Contact Details</div>
                      <div className="text-base">{formValues.fullName} &middot; {formValues.email}</div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Form Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border/50">
            <button
              type="button" onClick={prevStep}
              className={cn("flex items-center gap-2 text-base font-medium text-muted hover:text-foreground transition-colors py-2", step === 0 && "invisible")}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <MagneticButton
                onClick={nextStep}
                disabled={!canProceed()}
                variant="primary"
                size="lg"
                className="px-8"
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </MagneticButton>
            ) : (
              <button
                type="submit" disabled={!canProceed() || isSubmitting}
                className="flex items-center gap-3 h-14 px-10 rounded-xl bg-primary text-[#111111] dark:text-white text-lg font-bold hover:bg-primary-hover shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Pipeline...</> : <><Check className="w-5 h-5" /> Request Architecture Blueprint</>}
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
}
