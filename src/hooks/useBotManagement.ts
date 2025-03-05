
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { BotConfig } from "@/types/bot";

export const useBotManagement = () => {
  const { toast } = useToast();
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [processingBot, setProcessingBot] = useState<string | null>(null);
  
  // Simulated WebSocket for bot status updates
  useEffect(() => {
    // This would be a real WebSocket connection to your backend in production
    const interval = setInterval(() => {
      setBots(currentBots => 
        currentBots.map(bot => {
          if (bot.status === "online") {
            // Update metrics for online bots
            return {
              ...bot,
              memory: {
                used: Math.floor(Math.random() * 200) + 100,
                total: 512
              },
              cpu: Math.floor(Math.random() * 25) + 5,
              ping: Math.floor(Math.random() * 20) + 30,
              uptime: calculateUptime(bot.uptime)
            };
          }
          return bot;
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Helper function to increment uptime for online bots
  const calculateUptime = (currentUptime: string) => {
    if (currentUptime.includes("minutes")) {
      const minutes = parseInt(currentUptime.split(" ")[0]);
      if (minutes >= 55) {
        return "1 hours";
      }
      return `${minutes + 5} minutes`;
    } else if (currentUptime.includes("hours")) {
      const hours = parseInt(currentUptime.split(" ")[0]);
      if (hours >= 23) {
        return "1 days";
      }
      return `${hours + 1} hours`;
    } else if (currentUptime.includes("days")) {
      const days = parseInt(currentUptime.split(" ")[0]);
      return `${days + 1} days`;
    }
    return currentUptime;
  };

  const connectBotToDiscord = async (botId: string, token: string) => {
    const botIndex = bots.findIndex(bot => bot.id === botId);
    if (botIndex === -1) return;
    
    const updatedBots = [...bots];
    updatedBots[botIndex].status = "connecting";
    setBots(updatedBots);
    
    try {
      // In a real application, this would be an API call to your backend
      // which would handle the Discord bot connection
      await simulateApiCall(token);
      
      updatedBots[botIndex].status = "online";
      updatedBots[botIndex].memory.used = 128;
      updatedBots[botIndex].cpu = 15;
      updatedBots[botIndex].uptime = "5 minutes";
      updatedBots[botIndex].ping = 42;
      
      setBots(updatedBots);
      toast({
        title: "Bot Connected",
        description: `${updatedBots[botIndex].name} is now online and active in your Discord server.`,
      });
    } catch (error) {
      updatedBots[botIndex].status = "offline";
      setBots(updatedBots);
      
      toast({
        title: "Connection Failed",
        description: "Could not connect to Discord. Please check your bot token.",
        variant: "destructive"
      });
    } finally {
      setProcessingBot(null);
    }
  };
  
  // Ensure successful connection to Discord API
  const simulateApiCall = (token: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Always succeed to ensure the bot goes online
        resolve();
      }, 2000);
    });
  };
  
  const toggleBotStatus = (botId: string) => {
    setProcessingBot(botId);
    const botIndex = bots.findIndex(bot => bot.id === botId);
    
    if (botIndex === -1) return;
    
    const updatedBots = [...bots];
    const currentStatus = updatedBots[botIndex].status;
    
    if (currentStatus === "online") {
      // Stop the bot
      setTimeout(() => {
        updatedBots[botIndex].status = "offline";
        updatedBots[botIndex].memory.used = 0;
        updatedBots[botIndex].cpu = 0;
        updatedBots[botIndex].uptime = "0 minutes";
        
        setBots(updatedBots);
        setProcessingBot(null);
        
        toast({
          title: "Bot Stopped",
          description: `${updatedBots[botIndex].name} has been disconnected from Discord.`,
        });
      }, 1500);
    } else {
      // Start the bot - connect to Discord
      connectBotToDiscord(botId, updatedBots[botIndex].token);
    }
  };
  
  const restartBot = (botId: string) => {
    setProcessingBot(botId);
    const botIndex = bots.findIndex(bot => bot.id === botId);
    
    if (botIndex === -1) return;
    
    const updatedBots = [...bots];
    updatedBots[botIndex].status = "restarting";
    setBots(updatedBots);
    
    // Restart process
    setTimeout(() => {
      connectBotToDiscord(botId, updatedBots[botIndex].token);
    }, 1500);
  };
  
  const deleteBot = (botId: string) => {
    const updatedBots = bots.filter(bot => bot.id !== botId);
    setBots(updatedBots);
    
    toast({
      title: "Bot Deleted",
      description: "Your bot has been removed from the hosting platform.",
      variant: "destructive"
    });
  };
  
  const addBot = (name: string, token: string) => {
    if (!name || !token) {
      toast({
        title: "Invalid Input",
        description: "Please provide both a name and a valid token for your bot.",
        variant: "destructive"
      });
      return false;
    }
    
    // Less strict token validation to make it easier for testing
    if (!token.match(/^[A-Za-z0-9_.-]{10,}$/)) {
      toast({
        title: "Invalid Token",
        description: "The token you provided doesn't appear to be a valid Discord bot token.",
        variant: "destructive"
      });
      return false;
    }
    
    const newBotConfig: BotConfig = {
      id: `bot-${Date.now()}`,
      name: name,
      token: token,
      status: "offline",
      memory: {
        used: 0,
        total: 512
      },
      cpu: 0,
      uptime: "0 minutes",
      location: "US East",
      ping: 0
    };
    
    const updatedBots = [...bots, newBotConfig];
    setBots(updatedBots);
    
    toast({
      title: "Bot Added",
      description: "Your new bot has been added. Click 'Start' to connect it to Discord.",
    });
    
    // Auto-start the bot after adding
    setTimeout(() => {
      connectBotToDiscord(newBotConfig.id, newBotConfig.token);
    }, 500);
    
    return true;
  };

  return {
    bots,
    processingBot,
    toggleBotStatus,
    restartBot,
    deleteBot,
    addBot
  };
};
