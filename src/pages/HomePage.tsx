
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, Command, Activity } from "lucide-react";
import NeonText from "@/components/common/NeonText";
import GlowButton from "@/components/common/GlowButton";

const HomePage = () => {
  // Animation effect for elements when they appear in viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    const hiddenElements = document.querySelectorAll('.initially-hidden');
    hiddenElements.forEach(el => observer.observe(el));
    
    return () => {
      hiddenElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-dark-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <NeonText>exo</NeonText>
          <NeonText color="magenta" animated>v1</NeonText>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <GlowButton variant="ghost" size="sm">Login</GlowButton>
          </Link>
          <Link to="/signup">
            <GlowButton size="sm">Sign Up</GlowButton>
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="flex-1 animated-grid-bg">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="max-w-3xl text-center mb-10 initially-hidden opacity-0">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <NeonText>exo</NeonText>
              <NeonText color="magenta" animated>v1</NeonText>
            </h1>
            <p className="text-xl text-gray-300 mb-8">Instant-Access to discord bot hosting</p>
            <Link to="/signup">
              <GlowButton size="lg" className="animate-pulse-fade">
                Sign Up
              </GlowButton>
            </Link>
          </div>
          
          {/* Features preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10">
            <div className="bento-card initially-hidden opacity-0" style={{ animationDelay: "0.1s" }}>
              <div className="h-12 w-12 rounded-full bg-neon-magenta/20 flex items-center justify-center mb-4">
                <Bot className="text-neon-magenta" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bot Hosting</h3>
              <p className="text-gray-400">Deploy your Discord bots with just a few clicks and keep them running 24/7.</p>
            </div>
            
            <div className="bento-card initially-hidden opacity-0" style={{ animationDelay: "0.2s" }}>
              <div className="h-12 w-12 rounded-full bg-neon-magenta/20 flex items-center justify-center mb-4">
                <Command className="text-neon-magenta" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Commands</h3>
              <p className="text-gray-400">Create and manage custom commands for your Discord bots effortlessly.</p>
            </div>
            
            <div className="bento-card initially-hidden opacity-0" style={{ animationDelay: "0.3s" }}>
              <div className="h-12 w-12 rounded-full bg-neon-magenta/20 flex items-center justify-center mb-4">
                <Activity className="text-neon-magenta" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Status Changer</h3>
              <p className="text-gray-400">Customize and schedule your bot's status messages and activities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
