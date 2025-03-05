
import BentoCard from "@/components/common/BentoCard";
import NeonText from "@/components/common/NeonText";
import { Bot, Command, Activity, Clock, Server } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome to your ExoV1 control panel</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BentoCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-neon-magenta/20 flex items-center justify-center">
            <Bot className="text-neon-magenta" size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Active Bots</div>
            <div className="text-2xl font-bold">1 / 1</div>
          </div>
        </BentoCard>
        
        <BentoCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-neon-magenta/20 flex items-center justify-center">
            <Clock className="text-neon-magenta" size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Uptime</div>
            <div className="text-2xl font-bold">99.9%</div>
          </div>
        </BentoCard>
        
        <BentoCard className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-neon-magenta/20 flex items-center justify-center">
            <Server className="text-neon-magenta" size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Plan</div>
            <div className="text-2xl font-bold">Free</div>
          </div>
        </BentoCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BentoCard>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-dark-lighter rounded-lg p-4 text-center hover:bg-dark-card cursor-pointer transition-all">
              <Bot className="mx-auto text-neon-magenta mb-2" size={24} />
              <div className="text-sm">Add Bot</div>
            </div>
            
            <div className="bg-dark-lighter rounded-lg p-4 text-center hover:bg-dark-card cursor-pointer transition-all">
              <Command className="mx-auto text-neon-magenta mb-2" size={24} />
              <div className="text-sm">Create Command</div>
            </div>
            
            <div className="bg-dark-lighter rounded-lg p-4 text-center hover:bg-dark-card cursor-pointer transition-all">
              <Activity className="mx-auto text-neon-magenta mb-2" size={24} />
              <div className="text-sm">Change Status</div>
            </div>
          </div>
        </BentoCard>
        
        <BentoCard>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Bots</h2>
          </div>
          
          <div className="rounded-lg border border-dark-border p-4 flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-dark-lighter flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <div className="font-medium">My Bot</div>
                <div className="text-xs text-gray-400">Status: Online</div>
              </div>
            </div>
            <div className="text-xs py-1 px-2 rounded-full bg-green-500/20 text-green-400">
              Online
            </div>
          </div>
          
          <div className="text-center py-6 border border-dashed border-dark-border rounded-lg">
            <p className="text-gray-400 text-sm">
              Upgrade to <NeonText color="magenta">Pro Plan</NeonText> to add more bots
            </p>
          </div>
        </BentoCard>
      </div>
    </div>
  );
};

export default DashboardHome;
