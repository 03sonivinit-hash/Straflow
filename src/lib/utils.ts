import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation easing curves
export const easings = {
  // Premium, smooth easing for most animations
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Snappy for interactive elements
  snappy: [0.19, 1, 0.22, 1] as const,
  // Elastic bounce for tear effects
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
  // Heavy entrance for reveals
  entrance: [0.0, 0.0, 0.2, 1] as const,
  // Quick exit
  exit: [0.4, 0.0, 1, 1] as const,
} as const;

// GSAP easing strings
export const gsapEasings = {
  smooth: "power2.inOut",
  snappy: "power3.out",
  elastic: "elastic.out(1, 0.5)",
  entrance: "power4.out",
  exit: "power2.in",
  bounce: "bounce.out",
} as const;

// Pipeline stages used throughout the site
export const PIPELINE_STAGES = [
  { id: "input", label: "INPUT", index: 0, color: "#7A7A7A" },
  { id: "processing", label: "PROCESSING", index: 1, color: "#9A8A7A" },
  { id: "ai-core", label: "AI CORE", index: 2, color: "#FF4D2E" },
  { id: "automation", label: "AUTOMATION", index: 3, color: "#9A8A7A" },
  { id: "output", label: "OUTPUT", index: 4, color: "#121212" },
] as const;

// Viewport breakpoints matching CSS grid system
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  ultrawide: 1920,
} as const;
