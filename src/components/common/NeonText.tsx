
import { cn } from "@/lib/utils";

interface NeonTextProps {
  children: React.ReactNode;
  color?: "white" | "magenta";
  className?: string;
  animated?: boolean;
}

const NeonText = ({ 
  children, 
  color = "white", 
  className = "", 
  animated = false 
}: NeonTextProps) => {
  return (
    <span 
      className={cn(
        color === "white" ? "neon-text" : "neon-magenta",
        animated && "animate-glow",
        className
      )}
    >
      {children}
    </span>
  );
};

export default NeonText;
