import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group relative z-10", className)}>
      <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Top Layer - System Input */}
          <path
            d="M2 8L12 2L22 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground transition-all duration-300 group-hover:text-primary"
          />
          {/* Middle Layer - Processing */}
          <path
            d="M2 13L12 19L22 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted transition-all duration-300 group-hover:text-foreground"
          />
          {/* Center Data Core */}
          <circle
            cx="12"
            cy="10.5"
            r="2"
            fill="currentColor"
            className="text-primary transition-all duration-300 group-hover:scale-125 origin-center"
          />
          {/* Connection Line */}
          <path
            d="M12 12.5V19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
      </div>

      {withText && (
        <span className="text-[15px] font-bold tracking-tight text-foreground">
          Strata<span className="text-primary">Flow</span>
        </span>
      )}
    </div>
  );
}
