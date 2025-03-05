
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import GlowButton from "@/components/common/GlowButton";

interface AddBotDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newBot: {
    name: string;
    token: string;
  };
  onInputChange: (field: 'name' | 'token', value: string) => void;
  onAddBot: () => void;
}

const AddBotDialog = ({ 
  isOpen, 
  onOpenChange, 
  newBot, 
  onInputChange, 
  onAddBot 
}: AddBotDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark-card border-dark-border">
        <DialogHeader>
          <DialogTitle>Add New Discord Bot</DialogTitle>
          <DialogDescription>
            Enter your bot's information to connect it to our hosting platform.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="botName">Bot Name</Label>
            <Input 
              id="botName" 
              placeholder="Enter your bot's name" 
              value={newBot.name}
              onChange={(e) => onInputChange('name', e.target.value)}
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
              onChange={(e) => onInputChange('token', e.target.value)}
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
          <GlowButton variant="outline" onClick={() => onOpenChange(false)}>Cancel</GlowButton>
          <GlowButton onClick={onAddBot}>Add Bot</GlowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBotDialog;
