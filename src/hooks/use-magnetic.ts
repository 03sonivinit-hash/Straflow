"use client";

import { useRef, useEffect, useCallback } from "react";

interface UseMagneticOptions {
  strength?: number;
  range?: number;
  ease?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.3, range = 100, ease = 0.15 } = options;
  const ref = useRef<T>(null);
  const animationFrame = useRef<number>(0);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < range) {
        target.current = {
          x: distX * strength,
          y: distY * strength,
        };
      } else {
        target.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    const animate = () => {
      position.current.x = lerp(position.current.x, target.current.x, ease);
      position.current.y = lerp(position.current.y, target.current.y, ease);

      el.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

      animationFrame.current = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame.current);
      el.style.transform = "";
    };
  }, [strength, range, ease, lerp]);

  return ref;
}
