
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NeonText from "@/components/common/NeonText";
import GlowButton from "@/components/common/GlowButton";
import { Bot } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen animated-grid-bg flex flex-col items-center justify-center p-6 text-center">
      <Bot className="text-neon-magenta mb-6" size={64} />
      <h1 className="text-6xl font-bold mb-4">
        <NeonText>4</NeonText>
        <NeonText color="magenta" animated>0</NeonText>
        <NeonText>4</NeonText>
      </h1>
      <p className="text-xl text-gray-300 mb-8">Oops! This page doesn't exist in our dimension</p>
      <Link to="/">
        <GlowButton size="lg">Return to Home</GlowButton>
      </Link>
    </div>
  );
};

export default NotFound;
