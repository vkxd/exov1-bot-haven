
import React from "react";
import BentoCard from "@/components/common/BentoCard";
import GlowButton from "@/components/common/GlowButton";
import { Bot, Plus } from "lucide-react";

interface EmptyBotStateProps {
  onAddBot: () => void;
}

const EmptyBotState = ({ onAddBot }: EmptyBotStateProps) => {
  return (
    <BentoCard>
      <div className="flex flex-col items-center justify-center py-16">
        <Bot size={64} className="text-neon-magenta mb-4 opacity-40" />
        <h2 className="text-2xl font-bold mb-2">No Bots Available</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          You haven't added any Discord bots yet. Click the "Add Bot" button to get started.
        </p>
        <GlowButton 
          className="flex items-center gap-2"
          onClick={onAddBot}
        >
          <Plus size={16} />
          <span>Add Your First Bot</span>
        </GlowButton>
      </div>
    </BentoCard>
  );
};

export default EmptyBotState;
