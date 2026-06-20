"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface TearableRevealProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  className?: string;
  tearThreshold?: number; // Distance in pixels to trigger complete tear
}

export function TearableReveal({
  topContent,
  bottomContent,
  className,
  tearThreshold = 150,
}: TearableRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTorn, setIsTorn] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1000);
  const dragX = useMotionValue(0);
  const controls = useAnimation();

  // Handle Resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Map drag distance to the clip path polygon (creating a jagged, diagonal tear)
  const clipPath = useTransform(dragX, (x) => {
    // If torn completely, mask out the top layer completely
    if (isTorn) return `polygon(100% 0, 100% 0, 100% 100%, 100% 100%)`;
    
    // Normal state is full screen (0 drag)
    // As we drag right (positive x), the left side of the polygon moves right
    const px = Math.max(0, x);
    const p1 = px;
    const p2 = px + 40; // jagged point
    const p3 = px + 10;
    const p4 = px + 60;
    const p5 = px + 20;
    const p6 = px + 80;

    return `polygon(
      ${p1}px 0%, 
      100% 0%, 
      100% 100%, 
      ${p6}px 100%, 
      ${p5}px 80%, 
      ${p4}px 60%, 
      ${p3}px 40%, 
      ${p2}px 20%
    )`;
  });

  // Calculate paper curl / shadow intensity based on drag
  const shadowOpacity = useTransform(dragX, [0, tearThreshold], [0, 0.4]);
  const curlRotate = useTransform(dragX, [0, tearThreshold], [0, 15]);
  const curlX = useTransform(dragX, (x) => Math.max(0, x));

  const handleDrag = (e: any, info: PanInfo) => {
    if (isTorn) return;
    // Allow dragging right to tear
    if (info.offset.x > 0) {
      dragX.set(info.offset.x);
    }
  };

  const handleDragEnd = async (e: any, info: PanInfo) => {
    if (isTorn) return;
    
    if (info.offset.x > tearThreshold || info.velocity.x > 500) {
      // Trigger full tear
      setIsTorn(true);
      await controls.start({
        x: containerWidth + 100,
        transition: { type: "spring", stiffness: 200, damping: 20 }
      });
      dragX.set(containerWidth + 100);
    } else {
      // Snap back
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } });
      dragX.set(0);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full overflow-hidden select-none bg-background", className)}
      style={{ touchAction: "none" }}
    >
      {/* Bottom Layer (Revealed) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {bottomContent}
      </div>

      {/* Top Layer (Tearable Paper) */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath }}
      >
        <div className="w-full h-full pointer-events-auto">
          {topContent}
        </div>
      </motion.div>

      {/* The Peel / Curl Effect */}
      {!isTorn && (
        <motion.div
          className="absolute top-0 bottom-0 z-20 pointer-events-none origin-left flex items-center justify-end"
          style={{ 
            x: curlX,
            width: "120px",
            rotateY: curlRotate,
            left: -120, // starts offscreen to the left
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.8) 40%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0.4) 100%)",
            boxShadow: "20px 0 30px rgba(0,0,0,0.3)"
          }}
        >
          {/* Jagged paper edge image or SVG could go here to make the curl look realistic */}
          <svg className="absolute right-0 h-full w-[20px] text-surface fill-current" preserveAspectRatio="none" viewBox="0 0 20 100">
            <polygon points="20,0 0,20 15,40 5,60 18,80 0,100 20,100" />
          </svg>
        </motion.div>
      )}

      {/* Invisible Drag Target (Left Edge) */}
      {!isTorn && (
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-16 md:w-24 z-30 cursor-grab active:cursor-grabbing hover:bg-primary/5 transition-colors"
          drag="x"
          dragConstraints={{ left: 0, right: containerWidth }}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x: dragX }}
        >
          {/* Affordance Handle */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-1 items-center opacity-50">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span className="text-[10px] font-mono font-bold text-primary origin-left -rotate-90 mt-8 tracking-widest whitespace-nowrap">
              PULL TO REVEAL
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
