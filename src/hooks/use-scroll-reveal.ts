"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

type RevealVariant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale" | "text-mask";

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  duration?: number;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    variant = "fade-up",
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    triggerStart = "top 85%",
    once = true,
  } = options;

  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll("[data-reveal]");
      const targets = elements.length > 0 ? elements : [containerRef.current];

      const getAnimation = () => {
        switch (variant) {
          case "fade-up":
            return { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } };
          case "fade-in":
            return { from: { opacity: 0 }, to: { opacity: 1 } };
          case "slide-left":
            return { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0 } };
          case "slide-right":
            return { from: { opacity: 0, x: 50 }, to: { opacity: 1, x: 0 } };
          case "scale":
            return { from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1 } };
          case "text-mask":
            return {
              from: { clipPath: "inset(0 100% 0 0)" },
              to: { clipPath: "inset(0 0% 0 0)" },
            };
          default:
            return { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } };
        }
      };

      const { from, to } = getAnimation();

      gsap.set(targets, from);

      gsap.to(targets, {
        ...to,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    },
    { scope: containerRef, dependencies: [variant, duration, delay, stagger] }
  );

  return containerRef;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5
) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        yPercent: speed * 20,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return ref;
}
