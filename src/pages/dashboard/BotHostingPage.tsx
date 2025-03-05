
import BentoCard from "@/components/common/BentoCard";
import GlowButton from "@/components/common/GlowButton";
import { Bot, AlertCircle, Plus, Trash2, Power, Settings, RefreshCw } from "lucide-react";

const BotHostingPage = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bot Hosting</h1>
          <p className="text-gray-400">Manage your Discord bots</p>
        </div>
        <GlowButton className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Bot</span>
        </GlowButton>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <BentoCard>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-dark-lighter flex items-center justify-center">
                <Bot className="text-neon-magenta" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold">My Bot</h2>
                <p className="text-gray-400 text-sm">Online for 3 days</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <GlowButton variant="outline" size="sm" className="flex items-center gap-2">
                <RefreshCw size={14} />
                <span>Restart</span>
              </GlowButton>
              <GlowButton variant="outline" size="sm" className="flex items-center gap-2">
                <Settings size={14} />
                <span>Configure</span>
              </GlowButton>
              <GlowButton variant="outline" size="sm" className="flex items-center gap-2 text-green-400 border-green-500/50 hover:bg-green-500/10">
                <Power size={14} />
                <span>Online</span>
              </GlowButton>
            </div>
          </div>
          
          <div className="divider" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-lighter rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Memory Usage</div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold">128 MB</div>
                <div className="text-xs text-gray-400">/ 512 MB</div>
              </div>
              <div className="mt-2 h-2 bg-dark-card rounded-full overflow-hidden">
                <div className="bg-neon-magenta h-full rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div className="bg-dark-lighter rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">CPU Usage</div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold">15%</div>
                <div className="text-xs text-gray-400">/ 100%</div>
              </div>
              <div className="mt-2 h-2 bg-dark-card rounded-full overflow-hidden">
                <div className="bg-neon-magenta h-full rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            
            <div className="bg-dark-lighter rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Server Location</div>
              <div className="text-xl font-bold">US East</div>
              <div className="text-xs text-gray-400 mt-1">Ping: 42ms</div>
            </div>
          </div>
          
          <div className="divider" />
          
          <div>
            <h3 className="text-lg font-bold mb-3">Bot Token</h3>
            <div className="bg-dark-lighter p-3 rounded-lg flex justify-between items-center">
              <div className="font-mono text-gray-400">••••••••••••••••••••••••••••••••••••••••••••</div>
              <GlowButton variant="ghost" size="sm">Show</GlowButton>
            </div>
            <div className="mt-4 bg-dark-lighter p-4 rounded-lg border border-yellow-500/20">
              <div className="flex gap-2 text-yellow-400">
                <AlertCircle size={20} />
                <div>
                  <p className="font-medium">Security Note</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Never share your bot token with anyone. ExoV1 encrypts your token and only uses it to connect to Discord's API.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <GlowButton variant="outline" size="sm" className="flex items-center gap-2 text-red-400 border-red-500/50 hover:bg-red-500/10">
              <Trash2 size={14} />
              <span>Delete Bot</span>
            </GlowButton>
          </div>
        </BentoCard>
        
        {/* Add another bot card placeholder for free users */}
        <div className="border border-dashed border-dark-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <Bot className="text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Add another bot</h3>
          <p className="text-gray-400 text-sm mb-4">Upgrade to Pro to host multiple bots</p>
          <GlowButton>Upgrade to Pro</GlowButton>
        </div>
      </div>
    </div>
  );
};

export default BotHostingPage;
