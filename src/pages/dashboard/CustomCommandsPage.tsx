
import { useState } from "react";
import BentoCard from "@/components/common/BentoCard";
import GlowButton from "@/components/common/GlowButton";
import { Command, Plus, Edit, Trash2, Save, X } from "lucide-react";

const CustomCommandsPage = () => {
  const [commands, setCommands] = useState([
    { name: "!help", response: "Available commands: !help, !info, !ping", isEditing: false },
    { name: "!info", response: "This bot is hosted on ExoV1", isEditing: false },
    { name: "!ping", response: "Pong! The bot is online.", isEditing: false },
  ]);
  
  const [newCommand, setNewCommand] = useState({ name: "", response: "" });
  const [isAddingCommand, setIsAddingCommand] = useState(false);
  
  const handleEdit = (index: number) => {
    const updatedCommands = [...commands];
    updatedCommands[index].isEditing = true;
    setCommands(updatedCommands);
  };
  
  const handleSave = (index: number) => {
    const updatedCommands = [...commands];
    updatedCommands[index].isEditing = false;
    setCommands(updatedCommands);
  };
  
  const handleDelete = (index: number) => {
    const updatedCommands = [...commands];
    updatedCommands.splice(index, 1);
    setCommands(updatedCommands);
  };
  
  const handleInputChange = (index: number, field: "name" | "response", value: string) => {
    const updatedCommands = [...commands];
    updatedCommands[index][field] = value;
    setCommands(updatedCommands);
  };
  
  const handleAddCommand = () => {
    if (newCommand.name && newCommand.response) {
      setCommands([...commands, { ...newCommand, isEditing: false }]);
      setNewCommand({ name: "", response: "" });
      setIsAddingCommand(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Custom Commands</h1>
          <p className="text-gray-400">Create and manage custom commands for your bot</p>
        </div>
        <GlowButton 
          className="flex items-center gap-2"
          onClick={() => setIsAddingCommand(true)}
        >
          <Plus size={16} />
          <span>Add Command</span>
        </GlowButton>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {isAddingCommand && (
          <BentoCard className="border-neon-magenta/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Command</h2>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsAddingCommand(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="commandName" className="block text-sm font-medium text-gray-300 mb-1">
                  Command Name
                </label>
                <input
                  id="commandName"
                  type="text"
                  value={newCommand.name}
                  onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  placeholder="!command"
                />
              </div>
              
              <div>
                <label htmlFor="commandResponse" className="block text-sm font-medium text-gray-300 mb-1">
                  Response
                </label>
                <textarea
                  id="commandResponse"
                  value={newCommand.response}
                  onChange={(e) => setNewCommand({ ...newCommand, response: e.target.value })}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent min-h-[100px]"
                  placeholder="The bot will respond with this message"
                />
              </div>
              
              <div className="flex justify-end">
                <GlowButton 
                  onClick={handleAddCommand}
                  disabled={!newCommand.name || !newCommand.response}
                >
                  Add Command
                </GlowButton>
              </div>
            </div>
          </BentoCard>
        )}
        
        {commands.map((command, index) => (
          <BentoCard key={index}>
            {command.isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Command Name
                  </label>
                  <input
                    type="text"
                    value={command.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Response
                  </label>
                  <textarea
                    value={command.response}
                    onChange={(e) => handleInputChange(index, "response", e.target.value)}
                    className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent min-h-[100px]"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <GlowButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSave(index)}
                    className="flex items-center gap-2"
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </GlowButton>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-neon-magenta/20 flex items-center justify-center">
                      <Command className="text-neon-magenta" size={16} />
                    </div>
                    <h3 className="text-lg font-bold">{command.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 bg-dark-lighter rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{command.response}</p>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  Used 12 times in the last 24 hours
                </div>
              </div>
            )}
          </BentoCard>
        ))}
        
        {commands.length === 0 && !isAddingCommand && (
          <div className="border border-dashed border-dark-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <Command className="text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">No commands yet</h3>
            <p className="text-gray-400 text-sm mb-4">Create your first custom command to get started</p>
            <GlowButton onClick={() => setIsAddingCommand(true)}>Add Command</GlowButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCommandsPage;
