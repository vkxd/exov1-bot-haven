
import { useState } from "react";
import BentoCard from "@/components/common/BentoCard";
import GlowButton from "@/components/common/GlowButton";
import { Activity, Plus, Edit, Trash2, Save, X, Clock } from "lucide-react";

const statusTypes = [
  { value: "playing", label: "Playing" },
  { value: "listening", label: "Listening to" },
  { value: "watching", label: "Watching" },
  { value: "competing", label: "Competing in" },
];

interface StatusItem {
  type: string;
  text: string;
  isEditing: boolean;
  interval: number;
}

const StatusChangerPage = () => {
  const [statuses, setStatuses] = useState<StatusItem[]>([
    { type: "playing", text: "with Discord users", isEditing: false, interval: 30 },
    { type: "listening", text: "to commands", isEditing: false, interval: 30 },
  ]);
  
  const [newStatus, setNewStatus] = useState<StatusItem>({ type: "playing", text: "", isEditing: false, interval: 30 });
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  
  const handleEdit = (index: number) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index].isEditing = true;
    setStatuses(updatedStatuses);
  };
  
  const handleSave = (index: number) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index].isEditing = false;
    setStatuses(updatedStatuses);
  };
  
  const handleDelete = (index: number) => {
    const updatedStatuses = [...statuses];
    updatedStatuses.splice(index, 1);
    setStatuses(updatedStatuses);
  };
  
  const handleInputChange = (index: number, field: keyof StatusItem, value: string | number) => {
    const updatedStatuses = [...statuses];
    if (field === 'type' || field === 'text') {
      updatedStatuses[index][field] = value as string;
    } else if (field === 'interval') {
      updatedStatuses[index][field] = value as number;
    }
    setStatuses(updatedStatuses);
  };
  
  const handleAddStatus = () => {
    if (newStatus.text) {
      setStatuses([...statuses, { ...newStatus, isEditing: false }]);
      setNewStatus({ type: "playing", text: "", isEditing: false, interval: 30 });
      setIsAddingStatus(false);
    }
  };
  
  const getStatusDisplay = (type: string, text: string) => {
    switch (type) {
      case "playing":
        return `Playing ${text}`;
      case "listening":
        return `Listening to ${text}`;
      case "watching":
        return `Watching ${text}`;
      case "competing":
        return `Competing in ${text}`;
      default:
        return text;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Status Changer</h1>
          <p className="text-gray-400">Create and schedule custom status messages for your bot</p>
        </div>
        <GlowButton 
          className="flex items-center gap-2"
          onClick={() => setIsAddingStatus(true)}
        >
          <Plus size={16} />
          <span>Add Status</span>
        </GlowButton>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <BentoCard>
          <h2 className="text-xl font-bold mb-4">Status Rotation</h2>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-green-400">Status rotation is active</p>
          </div>
          
          <div className="bg-dark-lighter rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="text-neon-magenta" size={18} />
                <span className="font-medium">Current Status:</span>
              </div>
              <div className="text-neon-magenta font-semibold">Playing with Discord users</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            Your bot will automatically cycle through all active status messages.
          </div>
        </BentoCard>
        
        {isAddingStatus && (
          <BentoCard className="border-neon-magenta/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Status</h2>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsAddingStatus(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="statusType" className="block text-sm font-medium text-gray-300 mb-1">
                  Status Type
                </label>
                <select
                  id="statusType"
                  value={newStatus.type}
                  onChange={(e) => setNewStatus({ ...newStatus, type: e.target.value })}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                >
                  {statusTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="statusText" className="block text-sm font-medium text-gray-300 mb-1">
                  Status Text
                </label>
                <input
                  id="statusText"
                  type="text"
                  value={newStatus.text}
                  onChange={(e) => setNewStatus({ ...newStatus, text: e.target.value })}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  placeholder="Your status text"
                />
              </div>
              
              <div>
                <label htmlFor="statusInterval" className="block text-sm font-medium text-gray-300 mb-1">
                  Change Interval (minutes)
                </label>
                <input
                  id="statusInterval"
                  type="number"
                  min="1"
                  max="60"
                  value={newStatus.interval}
                  onChange={(e) => setNewStatus({ ...newStatus, interval: parseInt(e.target.value) })}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end">
                <GlowButton 
                  onClick={handleAddStatus}
                  disabled={!newStatus.text}
                >
                  Add Status
                </GlowButton>
              </div>
            </div>
          </BentoCard>
        )}
        
        {statuses.map((status, index) => (
          <BentoCard key={index}>
            {status.isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status Type
                  </label>
                  <select
                    value={status.type}
                    onChange={(e) => handleInputChange(index, "type", e.target.value)}
                    className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  >
                    {statusTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status Text
                  </label>
                  <input
                    type="text"
                    value={status.text}
                    onChange={(e) => handleInputChange(index, "text", e.target.value)}
                    className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Change Interval (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={status.interval}
                    onChange={(e) => handleInputChange(index, "interval", parseInt(e.target.value))}
                    className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
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
                      <Activity className="text-neon-magenta" size={16} />
                    </div>
                    <h3 className="text-lg font-bold">{getStatusDisplay(status.type, status.text)}</h3>
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
                
                <div className="mt-4 flex items-center gap-2 text-gray-400">
                  <Clock size={14} />
                  <span>Changes every {status.interval} minutes</span>
                </div>
              </div>
            )}
          </BentoCard>
        ))}
        
        {statuses.length === 0 && !isAddingStatus && (
          <div className="border border-dashed border-dark-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <Activity className="text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">No status messages yet</h3>
            <p className="text-gray-400 text-sm mb-4">Create your first status message to get started</p>
            <GlowButton onClick={() => setIsAddingStatus(true)}>Add Status</GlowButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusChangerPage;
