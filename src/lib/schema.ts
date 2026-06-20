// JSON-LD Structured Data Generators for SEO

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StrataFlow",
    description:
      "Operational intelligence systems — data systems, AI pipelines, and automation engineered for scale.",
    url: "https://strataflow.com",
    logo: "https://strataflow.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "strataflow.02@gmail.com",
      telephone: "+91-750-234-4441",
      contactType: "sales",
    },
    sameAs: [],
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "StrataFlow",
    },
    url: service.url,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
