
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

const BentoCard = ({ 
  children, 
  className = "", 
  hoverable = true,
  style
}: BentoCardProps) => {
  return (
    <div 
      className={cn(
        "bento-card",
        hoverable && "hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-magenta/10",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default BentoCard;
