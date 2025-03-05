
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bot, Command, Activity, Menu, X, LogOut, User } from "lucide-react";
import NeonText from "@/components/common/NeonText";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, active }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active 
          ? "bg-neon-magenta/20 text-white" 
          : "text-gray-400 hover:bg-dark-lighter hover:text-white"
      }`}
    >
      <Icon size={18} className={active ? "text-neon-magenta" : ""} />
      <span>{label}</span>
    </Link>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = () => {
    // We'll implement actual logout later
    navigate("/login");
  };
  
  const menuItems = [
    { path: "/dashboard", icon: User, label: "Overview" },
    { path: "/dashboard/bot-hosting", icon: Bot, label: "Bot Hosting" },
    { path: "/dashboard/custom-commands", icon: Command, label: "Custom Commands" },
    { path: "/dashboard/status-changer", icon: Activity, label: "Status Changer" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-dark-border bg-dark-lighter transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-dark-border">
          <Link to="/" className="flex items-center gap-2">
            <NeonText>exo</NeonText>
            <NeonText color="magenta">v1</NeonText>
          </Link>
          <button 
            className="md:hidden rounded-md p-1 text-gray-400 hover:bg-dark-card hover:text-white"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="py-6 px-3 flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
              />
            ))}
          </nav>
          
          <div>
            <div className="divider" />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-lg transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-dark-border h-16 flex items-center px-4">
          <button 
            className="md:hidden rounded-md p-1 text-gray-400 hover:bg-dark-card hover:text-white"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
        </div>
        
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
