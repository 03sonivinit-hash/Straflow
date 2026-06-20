import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Server, Zap, GitPullRequest, LayoutDashboard, Search, ShieldAlert, KeyRound, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Extended System Data with massive depth
const SYSTEMS = {
  "ai-agents": {
    id: "SYS.01",
    title: "AI Agents",
    shortDesc: "Autonomous agents that handle complex business tasks 24/7.",
    overview: "Deploy multi-modal AI agents capable of reasoning, tool usage, and autonomous execution.",
    whatItIs: "An AI Agent is an autonomous software entity powered by Large Language Models (LLMs) that can perceive its environment, make decisions, and execute actions to achieve a specific goal. Unlike a simple chatbot that only returns text, an agent has 'hands'—it can query databases, trigger webhooks, draft emails, and update your CRM.",
    howItWorks: "We construct agents using frameworks like LangChain or AutoGen. We give the agent a system prompt (its brain), a set of tools (API connections to your software), and access to a vector database (RAG) containing your company's proprietary data. When a user or system event triggers the agent, it enters a reasoning loop (ReAct—Reasoning and Acting) to figure out the exact sequence of tool calls needed to solve the problem.",
    whyNeeded: "Human capital is expensive and often bottlenecked by mundane, repetitive triage tasks. AI Agents operate 24/7 with zero latency. By deploying agents to handle L1 and L2 operational tasks, your human workforce is freed to focus entirely on high-leverage strategic work.",
    security: "Data sovereignty is our highest priority. We utilize Zero Data Retention agreements with LLM providers (OpenAI, Anthropic). Your data is never used to train public models. Furthermore, we implement a middleware proxy that scrubs Personally Identifiable Information (PII) before the payload ever reaches the LLM.",
    techStack: ["LangChain", "OpenAI GPT-4o", "Claude 3.5 Sonnet", "Pinecone VectorDB", "Next.js", "Redis"],
    capabilities: [
      { name: "RAG Knowledge Retrieval", desc: "Instantly queries your proprietary company data with semantic search." },
      { name: "Function Calling", desc: "Agents can execute POST/GET requests to your internal APIs." },
      { name: "Multi-Agent Orchestration", desc: "Specialized agents hand off tasks to each other seamlessly." },
      { name: "Human Escalation", desc: "Graceful fallback to human operators when confidence drops below 95%." }
    ],
    useCases: [
      { title: "Automated L1/L2 IT Support", desc: "Agents troubleshoot employee access issues, reset passwords via Okta integration, and route hardware requests to the right department." },
      { title: "Sales Engineering QA", desc: "Sales reps query the agent with highly technical prospect questions to get immediate, documentation-backed answers while live on calls." },
      { title: "Invoice & Procurement Matching", desc: "Agents receive inbound vendor invoices, extract line items using Vision models, cross-reference against Purchase Orders in NetSuite, and approve for payment." }
    ],
    deploymentFlow: [
      { phase: "Data Ingestion", time: "Week 1", desc: "Index your SOPs, past tickets, and documentation into a secure vector database." },
      { phase: "Tool Binding", time: "Week 2", desc: "Connect the LLM to your CRM, ERP, or internal APIs using strict IAM roles." },
      { phase: "Shadow Mode", time: "Week 3", desc: "Agent runs silently in parallel to humans to validate decision accuracy without executing live actions." },
      { phase: "Live Deployment", time: "Week 4", desc: "Agent begins handling live traffic with monitored guardrails." }
    ],
    roi: [
      { metric: "70%", label: "Ticket Auto-Resolution" },
      { metric: "< 2min", label: "Average Handle Time" },
      { metric: "24/7", label: "Operational Uptime" }
    ],
    faqs: [
      { q: "How secure is our data?", a: "We use zero-retention API contracts. Your data is never used to train public models, and all PII is scrubbed via middleware before processing." },
      { q: "Can the agent make mistakes?", a: "We mitigate hallucinations by grounding the agent strictly in your data (RAG) and defining deterministic guardrails. If confidence is below 95%, it routes to a human." },
      { q: "What happens if an API changes?", a: "Our monitoring layer detects API schema changes and alerts our engineering team immediately, preventing silent failures." }
    ]
  },
  "workflow-automation": {
    id: "SYS.02",
    title: "Workflow Automation",
    shortDesc: "End-to-end process automation eliminating manual operations.",
    overview: "We architect event-driven workflow systems that connect your disparate SaaS tools into a single, cohesive engine.",
    whatItIs: "Workflow Automation is the programmatic linking of disparate software systems to execute business processes without human intervention. It replaces the 'copy-paste economy' with event-driven webhooks and API payloads.",
    howItWorks: "Instead of relying on fragile Zapier connections, we build robust, custom middleware on AWS or GCP. We listen for webhooks (e.g., 'Lead Created in Salesforce'), ingest the payload into a message queue (e.g., Kafka or RabbitMQ) to prevent data loss, run custom transformation logic via Node.js or Python, and execute API calls to downstream systems (e.g., 'Create Project in Jira').",
    whyNeeded: "Manual data entry is prone to human error and scales poorly. As your company grows, the overhead of managing information between HubSpot, NetSuite, Slack, and Zendesk becomes a massive operational bottleneck. Automation ensures data integrity, instant synchronization, and infinite scalability.",
    security: "All API tokens are stored in AWS Secrets Manager. Webhook endpoints are secured with HMAC signature verification to ensure payloads actually originate from the verified source. All data is encrypted in transit using TLS 1.3.",
    techStack: ["Node.js", "Python", "AWS EventBridge", "RabbitMQ", "PostgreSQL", "Docker"],
    capabilities: [
      { name: "Event-Driven Triggers", desc: "Instantly reacts to state changes in your CRM or database." },
      { name: "Cross-System Sync", desc: "Bi-directional data synchronization across 5+ enterprise platforms." },
      { name: "Error Recovery & Retry", desc: "Built-in queueing with exponential backoff ensures no data drops if an API fails." },
      { name: "Conditional Routing", desc: "Complex routing logic based on real-time payload inspection." }
    ],
    useCases: [
      { title: "Lead-to-Deal Routing", desc: "Inbound leads are automatically enriched via Clearbit, scored via custom logic, and routed to the correct SDR's queue based on territory routing rules." },
      { title: "Employee Onboarding Provisioning", desc: "HR marks a candidate 'Hired' in Workday. The system automatically creates Google Workspace accounts, provisions Okta access, adds them to specific Slack channels, and orders a laptop." },
      { title: "E-Commerce Fulfillment Sync", desc: "Orders from Shopify sync immediately to warehouse ERPs, updating multi-location inventory arrays across multiple storefronts in real-time." }
    ],
    deploymentFlow: [
      { phase: "Process Mapping", time: "Week 1", desc: "Document every manual touchpoint in the current workflow." },
      { phase: "API Architecture", time: "Week 2", desc: "Design the webhook endpoints, queuing layer, and error handling." },
      { phase: "Staging Testing", time: "Week 3", desc: "Simulate edge cases, massive concurrent loads, and API failures." },
      { phase: "Go-Live", time: "Week 4", desc: "Cut over to automated processes with fallback Datadog alerting." }
    ],
    roi: [
      { metric: "10x", label: "Processing Speed" },
      { metric: "0", label: "Data Entry Errors" },
      { metric: "40hrs", label: "Saved per Employee/Mo" }
    ],
    faqs: [
      { q: "Why not just use Zapier or Make.com?", a: "Zapier is great for small startups, but it becomes incredibly fragile and expensive at enterprise scale. We build custom middleware hosted on AWS for infinite scalability, precise error handling, and complete data ownership." },
      { q: "How do you handle API rate limits?", a: "We use robust queueing systems with token-bucket rate limiting algorithms to ensure we respect downstream API limits without dropping payloads." }
    ]
  },
  "lead-generation": {
    id: "SYS.03",
    title: "Lead Generation",
    shortDesc: "Automated pipelines that identify and qualify leads at scale.",
    overview: "Automate your outbound and inbound pipelines with AI-driven enrichment and programmatic extraction.",
    whatItIs: "An automated lead generation system is a data pipeline that continuously searches for, extracts, enriches, and scores potential customers based on your Ideal Customer Profile (ICP), feeding them directly into your CRM.",
    howItWorks: "We build custom Python scrapers to monitor directories, social platforms, and job boards for buying signals. When a signal is detected, the system extracts the company data and pings enrichment APIs (like Apollo or Clearbit) to find the decision-maker's contact info. An LLM then scores the lead against your historical win data. If the score passes the threshold, it is pushed via API to HubSpot or Salesforce.",
    whyNeeded: "Sales Development Reps (SDRs) spend up to 40% of their day manually researching accounts and copying emails into spreadsheets. This is a massive waste of expensive talent. Our systems automate the research phase completely.",
    security: "We only utilize verified B2B enrichment APIs that are strictly compliant with GDPR, CCPA, and SOC2. Scraping infrastructure uses rotating proxies to prevent IP bans and complies with terms of service.",
    techStack: ["Python", "BeautifulSoup", "Clearbit API", "OpenAI Classifiers", "HubSpot API"],
    capabilities: [
      { name: "Programmatic Extraction", desc: "Pull data from directories, maps, and social platforms automatically." },
      { name: "AI Lead Scoring", desc: "Score leads based on ICP fit using custom trained ML models." },
      { name: "Data Enrichment", desc: "Automatically append missing emails, phone numbers, and revenue data." },
      { name: "CRM Routing", desc: "Push qualified leads directly to the right SDR's queue." }
    ],
    useCases: [
      { title: "Competitor Displacement", desc: "Automatically identify companies posting job descriptions for specific software roles and trigger targeted outreach sequences." },
      { title: "Hyper-Local B2B Scraping", desc: "Extract 10,000+ local businesses from map directories, enrich with decision-maker emails, and inject into CRM for local ad targeting." }
    ],
    deploymentFlow: [
      { phase: "Source Identification", time: "Week 1", desc: "Map all target data sources and establish extraction scripts." },
      { phase: "Enrichment Setup", time: "Week 2", desc: "Integrate APIs to fill data gaps (emails, revenues)." },
      { phase: "Scoring Model", time: "Week 3", desc: "Train the AI on your historical closed-won data to score new leads." },
      { phase: "Pipeline Activation", time: "Week 4", desc: "Turn on the daily feed directly into your CRM." }
    ],
    roi: [
      { metric: "340%", label: "Increase in Lead Volume" },
      { metric: "85%", label: "Reduction in Manual Research" },
      { metric: "28%", label: "Higher Close Rate" }
    ],
    faqs: [
      { q: "Is this compliant with data laws?", a: "Yes. We only use verified B2B enrichment APIs that comply with international data privacy laws like GDPR." }
    ]
  },
  "cloud-infrastructure": {
    id: "SYS.04",
    title: "Cloud Infrastructure",
    shortDesc: "Production-grade infrastructure designed for AI workloads.",
    overview: "We design and deploy robust, auto-scaling cloud environments using modern DevOps practices.",
    whatItIs: "Cloud Infrastructure refers to the backend architecture—servers, databases, load balancers, and VPCs—required to run high-availability applications and AI inference models. We treat Infrastructure as Code (IaC).",
    howItWorks: "We use Terraform to define your entire environment in code. We deploy Kubernetes clusters for microservices, configure multi-AZ RDS databases for resilience, and set up CI/CD pipelines via GitHub Actions. If traffic spikes, the cluster automatically provisions more nodes. If a node fails, it replaces itself.",
    whyNeeded: "Manually clicking through the AWS console leads to untrackable changes, security vulnerabilities, and vendor lock-in. IaC allows your infrastructure to be version-controlled, auditable, and instantly reproducible. Perfect for startups scaling quickly or enterprises migrating off legacy metal.",
    security: "We enforce strict Principle of Least Privilege (PoLP) via AWS IAM. All databases are placed in private subnets with no public internet access. Traffic is routed through strict NAT Gateways and WAFs. All data is AES-256 encrypted at rest.",
    techStack: ["AWS / GCP", "Terraform", "Kubernetes (EKS)", "Docker", "GitHub Actions", "Datadog"],
    capabilities: [
      { name: "Infrastructure as Code", desc: "Entire environments defined and version-controlled via Terraform." },
      { name: "Auto-Scaling Clusters", desc: "Compute resources scale dynamically based on real-time load." },
      { name: "CI/CD Pipelines", desc: "Automated testing and deployment for zero-downtime releases." },
      { name: "Security Hardening", desc: "VPC, strict IAM roles, and encryption at rest/transit." }
    ],
    useCases: [
      { title: "High-Traffic E-Commerce", desc: "Migrating monolithic storefronts into microservices running on Kubernetes to handle massive Black Friday loads without crashing." },
      { title: "AI Model Hosting", desc: "Deploying custom open-source LLMs (like Llama 3) on GPU clusters with auto-scaling to manage inference costs efficiently." }
    ],
    deploymentFlow: [
      { phase: "Architecture Audit", time: "Week 1", desc: "Review current cloud setup and design the target state." },
      { phase: "IaC Development", time: "Week 2", desc: "Write Terraform modules for the new infrastructure." },
      { phase: "Migration", time: "Week 3", desc: "Securely migrate data and services to the new environment." },
      { phase: "Monitoring Setup", time: "Week 4", desc: "Deploy Datadog/Prometheus for real-time alerts." }
    ],
    roi: [
      { metric: "99.99%", label: "System Uptime SLA" },
      { metric: "40%", label: "Cloud Cost Reduction" },
      { metric: "Zero", label: "Downtime Deployments" }
    ],
    faqs: [
      { q: "Do you offer ongoing management?", a: "Yes, we provide SLA-backed managed services to monitor and maintain the infrastructure post-deployment 24/7." }
    ]
  },
  "voice-ai": {
    id: "SYS.05",
    title: "Voice AI",
    shortDesc: "Conversational voice agents for inbound support and outbound calling.",
    overview: "Deploy ultra-low latency conversational AI that speaks naturally, perfect for customer support and outbound qualification.",
    whatItIs: "Voice AI is a telephonic agent that can hold natural, two-way conversations with humans over the phone. It is not an old-school 'Press 1 for Sales' IVR menu. It understands context, handles interruptions, and speaks with human-like inflection.",
    howItWorks: "We integrate WebRTC audio streams with Speech-to-Text (STT) models like Deepgram. The transcribed text is sent to a low-latency LLM (like GPT-4o) equipped with system prompts and API tools. The response is immediately synthesized into audio using Text-to-Speech (TTS) models like ElevenLabs. The entire loop happens in under 500 milliseconds.",
    whyNeeded: "Call centers suffer from high turnover, massive overhead, and long wait times. Voice AI can answer 10,000 calls simultaneously with zero wait time, drastically reducing cost-per-call while improving customer satisfaction.",
    security: "Call recordings and transcripts are scrubbed of sensitive PII (like credit card numbers) before storage. Data in transit is encrypted via WebRTC standards. STT models can be deployed locally to avoid sending audio to third parties.",
    techStack: ["Vapi / Bland AI", "Deepgram (STT)", "ElevenLabs (TTS)", "WebSockets", "Twilio"],
    capabilities: [
      { name: "Sub-500ms Latency", desc: "Real-time conversational speeds matching human interaction." },
      { name: "Live API Execution", desc: "Agent can book calendars or lookup accounts during the call." },
      { name: "Interruption Handling", desc: "Agent stops talking and listens when the user interrupts." },
      { name: "Post-Call Analytics", desc: "Automatic transcripts, sentiment analysis, and CRM updates." }
    ],
    useCases: [
      { title: "Inbound Receptionist", desc: "Answers 100% of calls instantly, answers FAQs, and books appointments directly onto the sales calendar." },
      { title: "Outbound Reactivation", desc: "Calls dead leads from 6 months ago to offer a new promotion and qualifies them live." }
    ],
    deploymentFlow: [
      { phase: "Persona Design", time: "Week 1", desc: "Craft the voice, tone, and script guidelines." },
      { phase: "Knowledge Base", time: "Week 2", desc: "Upload FAQs and connect the agent to scheduling APIs." },
      { phase: "Simulation", time: "Week 3", desc: "Internal team stress tests the agent's conversational abilities." },
      { phase: "Go-Live", time: "Week 4", desc: "Agent takes over a dedicated phone line for live operations." }
    ],
    roi: [
      { metric: "100%", label: "Call Answer Rate" },
      { metric: "24/7", label: "Availability" },
      { metric: "60%", label: "Lower Cost Per Call" }
    ],
    faqs: [
      { q: "Does it sound like a robot?", a: "No. We use state-of-the-art TTS models that include breaths, pauses, and inflections, making it nearly indistinguishable from a human." }
    ]
  },
  "data-extraction": {
    id: "SYS.06",
    title: "Data Extraction",
    shortDesc: "Turn unstructured documents and websites into clean, structured data.",
    overview: "We build pipelines that ingest messy PDFs, invoices, forms, and web pages, extracting fields into a clean schema.",
    whatItIs: "Data Extraction is the process of using AI Vision models and Optical Character Recognition (OCR) to read unstructured data (like scanned PDFs or messy websites) and output highly structured JSON or SQL records.",
    howItWorks: "Documents are ingested via email parsers or API uploads. We pass the document through AWS Textract or GPT-4 Vision with a strict JSON schema definition. The AI extracts the requested fields (e.g., 'Total Amount', 'Vendor Name'). The data is then validated against business rules. If confidence is low, it enters a Human-in-the-Loop (HITL) queue.",
    whyNeeded: "Companies spend millions annually paying humans to manually transcribe data from invoices, claims, and forms into ERPs. Automated extraction eliminates this bottleneck, processing documents in seconds rather than days.",
    security: "Documents are processed in ephemeral containers. Once the data is extracted, the original document image is either securely archived in an encrypted S3 bucket or immediately deleted based on compliance requirements.",
    techStack: ["GPT-4o Vision", "AWS Textract", "Puppeteer", "PostgreSQL", "Next.js"],
    capabilities: [
      { name: "OCR & Vision", desc: "Read text from scanned documents and images with high precision." },
      { name: "Schema Enforcement", desc: "AI forces extracted data to match your strict JSON/SQL schema." },
      { name: "Web Scraping", desc: "Navigate complex SPAs and login-gated sites to pull data." },
      { name: "Validation Pipeline", desc: "Flag uncertain extractions for quick human review." }
    ],
    useCases: [
      { title: "Invoice Automation", desc: "Automatically extracts line items, taxes, and vendor info from 5,000+ inbound PDFs per month and pushes directly to QuickBooks." },
      { title: "Competitor Price Tracking", desc: "Scrapes competitor e-commerce sites daily to adjust your own dynamic pricing algorithms." }
    ],
    deploymentFlow: [
      { phase: "Target Mapping", time: "Week 1", desc: "Identify document formats and required data fields." },
      { phase: "Model Prompting", time: "Week 2", desc: "Tune Vision models to accurately identify fields in messy layouts." },
      { phase: "Pipeline Integration", time: "Week 3", desc: "Connect extraction output directly to your ERP or database." },
      { phase: "Accuracy Tuning", time: "Week 4", desc: "Refine models based on staging data to hit 99% accuracy." }
    ],
    roi: [
      { metric: "99%", label: "Extraction Accuracy" },
      { metric: "Hours", label: "Saved vs Manual Entry" },
      { metric: "10x", label: "Faster Processing" }
    ],
    faqs: [
      { q: "Can it handle handwritten text?", a: "Yes, advanced Vision models are highly capable of transcribing cursive and messy handwriting accurately." }
    ]
  },
  "marketing-growth": {
    id: "SYS.07",
    title: "Marketing & Growth",
    shortDesc: "Programmatic SEO, automated content, and personalized outreach.",
    overview: "Scale your top-of-funnel operations without hiring an army using programmatic SEO infrastructure and AI content.",
    whatItIs: "Marketing automation at the infrastructure level. Instead of writing one blog post manually, we build Next.js applications that programmatically generate thousands of high-quality, localized, and intent-driven landing pages based on datasets.",
    howItWorks: "We connect a database (e.g., a list of 500 cities) to a Next.js Static Site Generator (SSG). An AI pipeline writes unique, highly relevant copy for each page. The site compiles and deploys. Simultaneously, we build automated outreach pipelines that scrape LinkedIn for prospect data and draft hyper-personalized cold emails using AI.",
    whyNeeded: "Organic growth requires massive scale that is impossible to achieve manually. Programmatic SEO allows you to capture long-tail search intent across thousands of variations, driving massive free traffic.",
    security: "Outreach pipelines use strict daily limits to protect domain reputation. We implement DKIM, DMARC, and SPF records to ensure maximum deliverability.",
    techStack: ["Next.js (SSG)", "OpenAI", "SendGrid", "Instantly.ai", "PostgreSQL"],
    capabilities: [
      { name: "Programmatic SEO", desc: "Generate thousands of high-quality, targeted landing pages." },
      { name: "Personalized Outreach", desc: "AI writes unique cold emails based on prospect LinkedIn data." },
      { name: "Content Generation", desc: "Automate the creation of technical blogs and social posts." },
      { name: "A/B Testing Infrastructure", desc: "Automatically route traffic to winning variants." }
    ],
    useCases: [
      { title: "Local SEO Dominance", desc: "Generate 500+ localized service pages ranking for high-intent keywords across every zip code in a state." },
      { title: "Hyper-Personalized Cold Email", desc: "AI reads a prospect's recent LinkedIn post and writes a highly relevant, non-templated opening line." }
    ],
    deploymentFlow: [
      { phase: "Strategy", time: "Week 1", desc: "Identify long-tail keywords and target audience personas." },
      { phase: "Template Design", time: "Week 2", desc: "Design master templates for programmatic pages." },
      { phase: "Content Engine", time: "Week 3", desc: "Build the AI pipeline to generate and format the content." },
      { phase: "Launch", time: "Week 4", desc: "Deploy pages and begin automated outreach sequences." }
    ],
    roi: [
      { metric: "5x", label: "Organic Traffic Growth" },
      { metric: "1000+", label: "Pages Generated" },
      { metric: "30%", label: "Higher Open Rates" }
    ],
    faqs: [
      { q: "Will Google penalize AI content?", a: "We don't just dump raw AI text. We build programmatic pages using structured data, deep internal linking, and valuable metadata that Google rewards." }
    ]
  }
};

type Slug = keyof typeof SYSTEMS;

export function generateStaticParams() {
  return Object.keys(SYSTEMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const system = SYSTEMS[resolvedParams.slug as Slug];
  if (!system) return { title: "Not Found" };
  return {
    title: `${system.title} | Services | StrataFlow`,
    description: system.overview,
  };
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const system = SYSTEMS[resolvedParams.slug as Slug];
  if (!system) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-32">
        <div className="sf-container">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs font-mono text-muted mb-16 uppercase tracking-widest">
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-bold">{system.title}</span>
          </div>

          {/* Hero Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-20 mb-24 pb-20 border-b border-border/50">
            <div className="lg:w-3/5">
              <div className="text-xs font-mono border border-primary text-primary px-4 py-2 inline-flex items-center gap-3 rounded-md mb-8 bg-primary/10 shadow-[var(--sf-shadow-sm)]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {system.id} // ACTIVE
              </div>
              <h1 className="mb-8">{system.title}</h1>
              <p className="text-xl text-text-secondary leading-loose max-w-2xl mb-12">
                {system.overview}
              </p>
              <div className="flex items-center gap-6">
                <MagneticButton href="/contact" variant="primary" size="lg" className="px-8 py-4 text-lg">
                  Deploy {system.title} <ArrowRight className="w-5 h-5 ml-2" />
                </MagneticButton>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="lg:w-1/3 sf-glass border border-border/50 rounded-2xl p-10 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <h4 className="text-xs font-mono text-muted mb-10 uppercase tracking-widest flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-primary" /> System Specifications
              </h4>
              
              <div className="space-y-10 relative z-10">
                <div>
                  <div className="text-xs text-muted mb-3 uppercase font-mono tracking-widest">Architecture Type</div>
                  <div className="text-base font-semibold flex items-center gap-3 text-foreground"><Server className="w-5 h-5 text-primary" /> Enterprise / Scalable</div>
                </div>
                <div className="h-px bg-border/50" />
                <div>
                  <div className="text-xs text-muted mb-4 uppercase font-mono tracking-widest">Core Technologies</div>
                  <div className="flex flex-wrap gap-3">
                    {system.techStack.map(tech => (
                      <span key={tech} className="text-xs font-mono sf-glass border border-border/50 px-4 py-2 rounded-md text-foreground shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left Column - Deep Content */}
            <div className="lg:col-span-8 space-y-32">
              
              {/* Deep Dive: What, How, Why */}
              <section className="space-y-16">
                <div>
                  <h3 className="mb-6 flex items-center gap-4"><Search className="w-6 h-6 text-primary" /> What is it?</h3>
                  <p className="text-lg text-text-secondary leading-loose">{system.whatItIs}</p>
                </div>
                <div>
                  <h3 className="mb-6 flex items-center gap-4"><Zap className="w-6 h-6 text-primary" /> How does it work?</h3>
                  <p className="text-lg text-text-secondary leading-loose">{system.howItWorks}</p>
                </div>
                <div>
                  <h3 className="mb-6 flex items-center gap-4"><ShieldCheck className="w-6 h-6 text-primary" /> Security & Compliance</h3>
                  <p className="text-lg text-text-secondary leading-loose">{system.security}</p>
                </div>
              </section>

              {/* Capabilities */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-16 rounded-2xl sf-glass flex items-center justify-center border border-border/50 shadow-md">
                    <Server className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-4xl tracking-tight m-0">Core Capabilities</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {system.capabilities.map((cap, i) => (
                    <div key={i} className="p-10 border border-border/50 rounded-2xl sf-glass hover:bg-surface/80 transition-all hover:shadow-[var(--sf-shadow-sm)] group">
                      <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{cap.name}</h4>
                      <p className="text-base text-text-secondary leading-relaxed">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Use Cases */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-16 rounded-2xl sf-glass flex items-center justify-center border border-border/50 shadow-md">
                    <Target className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-4xl tracking-tight m-0">Enterprise Use Cases</h3>
                </div>
                <div className="space-y-8">
                  {system.useCases.map((uc, i) => (
                    <div key={i} className="p-10 border-l-4 border-primary/50 bg-surface/30 rounded-r-2xl hover:bg-surface/60 transition-colors">
                      <h4 className="text-xl font-bold mb-4">{uc.title}</h4>
                      <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Deployment Flow */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-16 rounded-2xl sf-glass flex items-center justify-center border border-border/50 shadow-md">
                    <GitPullRequest className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-4xl tracking-tight m-0">Deployment Pipeline</h3>
                </div>
                <div className="relative border-l-2 border-border/50 ml-8 space-y-16 pb-6">
                  {system.deploymentFlow.map((flow, i) => (
                    <div key={i} className="relative pl-16 group">
                      <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-background border-[3px] border-primary group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4">
                        <h4 className="text-2xl font-bold m-0">{flow.phase}</h4>
                        <span className="text-xs font-mono text-primary bg-primary/10 px-4 py-1.5 rounded-md border border-primary/20">{flow.time}</span>
                      </div>
                      <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">{flow.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section className="pt-16 border-t border-border/50">
                <h3 className="text-3xl mb-12">Frequently Asked Questions</h3>
                <div className="space-y-8">
                  {system.faqs.map((faq, i) => (
                    <div key={i} className="p-8 sf-glass border border-border/50 rounded-2xl shadow-sm">
                      <div className="font-bold text-xl mb-4 flex gap-4">
                        <span className="text-primary font-mono">Q.</span> {faq.q}
                      </div>
                      <div className="text-lg text-text-secondary flex gap-4 leading-relaxed">
                        <span className="text-muted font-mono">A.</span> <span>{faq.a}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-40 space-y-12">
                {/* ROI Metrics */}
                <section className="bg-primary/5 border border-primary/20 rounded-3xl p-10 shadow-2xl">
                  <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-10 flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4" /> Measured Impact
                  </h3>
                  <div className="space-y-12">
                    {system.roi.map((roi, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-6xl xl:text-7xl font-mono font-bold text-foreground mb-4 tracking-tighter">{roi.metric}</span>
                        <span className="text-sm font-mono text-muted uppercase tracking-widest border-t border-primary/20 pt-4">{roi.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Help CTA */}
                <div className="sf-glass border border-border/50 rounded-3xl p-8 flex flex-col items-center text-center">
                  <HelpCircle className="w-10 h-10 text-muted mb-6" />
                  <h4 className="text-xl mb-4">Need technical details?</h4>
                  <p className="text-sm text-text-secondary mb-6">Our engineers are available to review your current architecture.</p>
                  <MagneticButton href="/contact" variant="ghost" className="w-full bg-surface">Contact Engineering</MagneticButton>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

// Icon helper for target
function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
