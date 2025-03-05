
import { useState } from "react";
import BentoCard from "@/components/common/BentoCard";
import GlowButton from "@/components/common/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Bot, AlertCircle, Plus, Trash2, Power, Settings, RefreshCw, Terminal, Server } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type BotStatus = "online" | "offline" | "restarting";

interface BotConfig {
  id: string;
  name: string;
  token: string;
  status: BotStatus;
  memory: {
    used: number;
    total: number;
  };
  cpu: number;
  uptime: string;
  location: string;
  ping: number;
}

const BotHostingPage = () => {
  const { toast } = useToast();
  const [bots, setBots] = useState<BotConfig[]>([
    {
      id: "bot-1",
      name: "My Bot",
      token: "MTk4NjIyNzQ4NjQ3NjA3Mjgz.Cl2FMQ.ZnCjm1XVW7vRze4b7Cq4se7NYE8",
      status: "online",
      memory: {
        used: 128,
        total: 512
      },
      cpu: 15,
      uptime: "3 days",
      location: "US East",
      ping: 42
    }
  ]);
  
  const [showToken, setShowToken] = useState(false);
  const [isAddingBot, setIsAddingBot] = useState(false);
  const [newBot, setNewBot] = useState({
    name: "",
    token: ""
  });
  
  const [processingBot, setProcessingBot] = useState<string | null>(null);
  
  const toggleBotStatus = (botId: string) => {
    setProcessingBot(botId);
    const botIndex = bots.findIndex(bot => bot.id === botId);
    
    if (botIndex === -1) return;
    
    const updatedBots = [...bots];
    const currentStatus = updatedBots[botIndex].status;
    
    // Simulate a delay for the operation
    setTimeout(() => {
      if (currentStatus === "online") {
        updatedBots[botIndex].status = "offline";
        toast({
          title: "Bot Stopped",
          description: `${updatedBots[botIndex].name} has been stopped.`,
        });
      } else {
        updatedBots[botIndex].status = "online";
        toast({
          title: "Bot Started",
          description: `${updatedBots[botIndex].name} is now online.`,
        });
      }
      
      setBots(updatedBots);
      setProcessingBot(null);
    }, 1500);
  };
  
  const restartBot = (botId: string) => {
    setProcessingBot(botId);
    const botIndex = bots.findIndex(bot => bot.id === botId);
    
    if (botIndex === -1) return;
    
    const updatedBots = [...bots];
    updatedBots[botIndex].status = "restarting";
    setBots(updatedBots);
    
    // Simulate a restart process
    setTimeout(() => {
      updatedBots[botIndex].status = "online";
      setBots(updatedBots);
      setProcessingBot(null);
      
      toast({
        title: "Bot Restarted",
        description: `${updatedBots[botIndex].name} has been restarted successfully.`,
      });
    }, 3000);
  };
  
  const deleteBot = (botId: string) => {
    const updatedBots = bots.filter(bot => bot.id !== botId);
    setBots(updatedBots);
    
    toast({
      title: "Bot Deleted",
      description: "Your bot has been deleted successfully.",
      variant: "destructive"
    });
  };
  
  const addBot = () => {
    if (!newBot.name || !newBot.token) {
      toast({
        title: "Invalid Input",
        description: "Please provide both a name and a valid token for your bot.",
        variant: "destructive"
      });
      return;
    }
    
    const newBotConfig: BotConfig = {
      id: `bot-${Date.now()}`,
      name: newBot.name,
      token: newBot.token,
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
    
    setBots([...bots, newBotConfig]);
    setNewBot({ name: "", token: "" });
    setIsAddingBot(false);
    
    toast({
      title: "Bot Added",
      description: "Your new bot has been added successfully. Click 'Start' to bring it online.",
    });
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
      
      <div className="grid grid-cols-1 gap-6">
        {bots.map(bot => (
          <BentoCard key={bot.id}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-dark-lighter flex items-center justify-center">
                  <Bot className="text-neon-magenta" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{bot.name}</h2>
                  <p className="text-gray-400 text-sm">
                    {bot.status === "online" ? `Online for ${bot.uptime}` : 
                     bot.status === "restarting" ? "Restarting..." : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <GlowButton 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => restartBot(bot.id)}
                  disabled={bot.status === "offline" || processingBot === bot.id}
                >
                  <RefreshCw size={14} className={processingBot === bot.id && bot.status === "restarting" ? "animate-spin" : ""} />
                  <span>Restart</span>
                </GlowButton>
                <GlowButton variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings size={14} />
                  <span>Configure</span>
                </GlowButton>
                <GlowButton 
                  variant="outline" 
                  size="sm" 
                  className={`flex items-center gap-2 ${
                    bot.status === "online" 
                      ? "text-green-400 border-green-500/50 hover:bg-green-500/10" 
                      : bot.status === "restarting"
                      ? "text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
                      : "text-red-400 border-red-500/50 hover:bg-red-500/10"
                  }`}
                  onClick={() => toggleBotStatus(bot.id)}
                  disabled={processingBot === bot.id}
                >
                  <Power size={14} />
                  <span>
                    {bot.status === "online" ? "Online" : 
                     bot.status === "restarting" ? "Restarting" : "Offline"}
                  </span>
                </GlowButton>
              </div>
            </div>
            
            <div className="divider" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-lighter rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Memory Usage</div>
                <div className="flex items-end justify-between">
                  <div className="text-xl font-bold">{bot.memory.used} MB</div>
                  <div className="text-xs text-gray-400">/ {bot.memory.total} MB</div>
                </div>
                <div className="mt-2 h-2 bg-dark-card rounded-full overflow-hidden">
                  <div 
                    className="bg-neon-magenta h-full rounded-full" 
                    style={{ width: `${(bot.memory.used / bot.memory.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-dark-lighter rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">CPU Usage</div>
                <div className="flex items-end justify-between">
                  <div className="text-xl font-bold">{bot.cpu}%</div>
                  <div className="text-xs text-gray-400">/ 100%</div>
                </div>
                <div className="mt-2 h-2 bg-dark-card rounded-full overflow-hidden">
                  <div 
                    className="bg-neon-magenta h-full rounded-full" 
                    style={{ width: `${bot.cpu}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-dark-lighter rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Server Location</div>
                <div className="text-xl font-bold">{bot.location}</div>
                <div className="text-xs text-gray-400 mt-1">Ping: {bot.ping}ms</div>
              </div>
            </div>
            
            <div className="divider" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Bot Token</h3>
                <div className="bg-dark-lighter p-3 rounded-lg flex justify-between items-center">
                  <div className="font-mono text-gray-400 truncate">
                    {showToken ? bot.token : "••••••••••••••••••••••••••••••••••••••••••••"}
                  </div>
                  <GlowButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? "Hide" : "Show"}
                  </GlowButton>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Hosting Information</h3>
                <div className="bg-dark-lighter p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Server size={16} className="text-neon-magenta" />
                    <span className="text-gray-300">Node.js v16.20.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-neon-magenta" />
                    <span className="text-gray-300">Discord.js v14.13.0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <GlowButton 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 text-red-400 border-red-500/50 hover:bg-red-500/10"
                onClick={() => deleteBot(bot.id)}
                disabled={processingBot === bot.id}
              >
                <Trash2 size={14} />
                <span>Delete Bot</span>
              </GlowButton>
            </div>
          </BentoCard>
        ))}
      </div>

      {/* Add Bot Dialog */}
      <Dialog open={isAddingBot} onOpenChange={setIsAddingBot}>
        <DialogContent className="bg-dark-card border-dark-border">
          <DialogHeader>
            <DialogTitle>Add New Discord Bot</DialogTitle>
            <DialogDescription>
              Enter your bot's information to start hosting it on exov1.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="botName">Bot Name</Label>
              <Input 
                id="botName" 
                placeholder="My Awesome Bot" 
                value={newBot.name}
                onChange={(e) => setNewBot({...newBot, name: e.target.value})}
                className="bg-dark-lighter border-dark-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="botToken">Bot Token</Label>
              <Input 
                id="botToken" 
                type="password" 
                placeholder="Paste your Discord bot token here" 
                value={newBot.token}
                onChange={(e) => setNewBot({...newBot, token: e.target.value})}
                className="bg-dark-lighter border-dark-border"
              />
              <p className="text-xs text-gray-400">
                You can find your bot token in the <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="text-neon-magenta hover:underline">Discord Developer Portal</a>.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch id="advanced" />
              <Label htmlFor="advanced">Use advanced configuration</Label>
            </div>
          </div>
          
          <DialogFooter>
            <GlowButton variant="outline" onClick={() => setIsAddingBot(false)}>Cancel</GlowButton>
            <GlowButton onClick={addBot}>Add Bot</GlowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BotHostingPage;
