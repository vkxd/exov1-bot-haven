
import React, { useState } from "react";
import BentoCard from "@/components/common/BentoCard";
import GlowButton from "@/components/common/GlowButton";
import { Bot as BotIcon, RefreshCw, Settings, Power, Trash2, Terminal, Server } from "lucide-react";
import { BotConfig, BotStatus } from "@/types/bot";

interface BotCardProps {
  bot: BotConfig;
  onToggleBotStatus: (botId: string) => void;
  onRestartBot: (botId: string) => void;
  onDeleteBot: (botId: string) => void;
  processingBot: string | null;
}

const BotCard = ({ 
  bot, 
  onToggleBotStatus, 
  onRestartBot, 
  onDeleteBot, 
  processingBot 
}: BotCardProps) => {
  const [showToken, setShowToken] = useState(false);

  const getStatusTextColor = (status: BotStatus) => {
    switch (status) {
      case "online":
        return "text-green-400";
      case "restarting":
      case "connecting":
        return "text-yellow-400";
      default:
        return "text-red-400";
    }
  };

  return (
    <BentoCard key={bot.id}>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-dark-lighter flex items-center justify-center">
            <BotIcon className="text-neon-magenta" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{bot.name}</h2>
            <p className={`text-sm ${getStatusTextColor(bot.status)}`}>
              {bot.status === "online" ? `Online for ${bot.uptime}` : 
               bot.status === "restarting" ? "Restarting..." : 
               bot.status === "connecting" ? "Connecting..." : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <GlowButton 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => onRestartBot(bot.id)}
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
                : bot.status === "restarting" || bot.status === "connecting"
                ? "text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
                : "text-red-400 border-red-500/50 hover:bg-red-500/10"
            }`}
            onClick={() => onToggleBotStatus(bot.id)}
            disabled={processingBot === bot.id}
          >
            <Power size={14} className={bot.status === "connecting" ? "animate-pulse" : ""} />
            <span>
              {bot.status === "online" ? "Online" : 
               bot.status === "restarting" ? "Restarting" : 
               bot.status === "connecting" ? "Connecting..." : "Start"}
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
          onClick={() => onDeleteBot(bot.id)}
          disabled={processingBot === bot.id}
        >
          <Trash2 size={14} />
          <span>Delete Bot</span>
        </GlowButton>
      </div>
    </BentoCard>
  );
};

export default BotCard;
