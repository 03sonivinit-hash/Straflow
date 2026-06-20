// StrataFlow Analytics Utility
// Provider-agnostic event tracking

type EventName =
  | "hero_cta_click"
  | "service_open"
  | "tear_interaction"
  | "case_study_view"
  | "architecture_engagement"
  | "form_step_complete"
  | "form_submit"
  | "call_booked"
  | "page_view";

interface EventData {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: EventName, data?: EventData) {
  if (typeof window === "undefined") return;

  // Console logging in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, data);
  }

  // Vercel Analytics (if available)
  if (typeof (window as any).va === "function") {
    (window as any).va("event", { name, ...data });
  }

  // Google Analytics 4 (if available)
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, data);
  }

  // PostHog (if available)
  if (typeof (window as any).posthog?.capture === "function") {
    (window as any).posthog.capture(name, data);
  }
}

export function trackPageView(url: string) {
  trackEvent("page_view", { url });
}
