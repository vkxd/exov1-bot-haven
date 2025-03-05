
import { useState } from "react";
import GlowButton from "@/components/common/GlowButton";
import { Plus } from "lucide-react";
import BotCard from "@/components/bot/BotCard";
import AddBotDialog from "@/components/bot/AddBotDialog";
import EmptyBotState from "@/components/bot/EmptyBotState";
import { useBotManagement } from "@/hooks/useBotManagement";

const BotHostingPage = () => {
  const { bots, processingBot, toggleBotStatus, restartBot, deleteBot, addBot } = useBotManagement();
  
  const [isAddingBot, setIsAddingBot] = useState(false);
  const [newBot, setNewBot] = useState({
    name: "",
    token: ""
  });
  
  const handleInputChange = (field: 'name' | 'token', value: string) => {
    setNewBot(prev => ({ ...prev, [field]: value }));
  };
  
  const handleAddBot = () => {
    const success = addBot(newBot.name, newBot.token);
    if (success) {
      setNewBot({ name: "", token: "" });
      setIsAddingBot(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bot Hosting</h1>
          <p className="text-gray-400">Manage your Discord bots</p>
        </div>
        <GlowButton 
          className="flex items-center gap-2"
          onClick={() => setIsAddingBot(true)}
        >
          <Plus size={16} />
          <span>Add Bot</span>
        </GlowButton>
      </div>
      
      {bots.length === 0 ? (
        <EmptyBotState onAddBot={() => setIsAddingBot(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bots.map(bot => (
            <BotCard
              key={bot.id}
              bot={bot}
              onToggleBotStatus={toggleBotStatus}
              onRestartBot={restartBot}
              onDeleteBot={deleteBot}
              processingBot={processingBot}
            />
          ))}
        </div>
      )}

      <AddBotDialog
        isOpen={isAddingBot}
        onOpenChange={setIsAddingBot}
        newBot={newBot}
        onInputChange={handleInputChange}
        onAddBot={handleAddBot}
      />
    </div>
  );
};

export default BotHostingPage;
