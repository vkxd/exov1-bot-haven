
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NeonText from "@/components/common/NeonText";
import GlowButton from "@/components/common/GlowButton";
import BentoCard from "@/components/common/BentoCard";
import { Eye, EyeOff, ArrowRight, Check, X } from "lucide-react";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const passwordMatch = password === confirmPassword;
  const passwordStrong = password.length >= 8;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordMatch || !passwordStrong) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background animated-grid-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <NeonText>exo</NeonText>
          <NeonText color="magenta" animated>v1</NeonText>
        </div>
        
        <BentoCard className="animate-scale-in">
          <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                placeholder="yourusername"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {passwordStrong ? (
                  <Check size={12} className="text-green-500" />
                ) : (
                  <X size={12} className="text-red-500" />
                )}
                <span className={passwordStrong ? "text-green-500" : "text-red-500"}>
                  At least 8 characters
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-dark-lighter border border-dark-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {passwordMatch ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <X size={12} className="text-red-500" />
                  )}
                  <span className={passwordMatch ? "text-green-500" : "text-red-500"}>
                    Passwords match
                  </span>
                </div>
              )}
            </div>
            
            <GlowButton
              type="submit"
              className="w-full mt-6"
              disabled={isLoading || !passwordMatch || !passwordStrong}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Sign up</span>
                  <ArrowRight size={16} />
                </div>
              )}
            </GlowButton>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-neon-magenta hover:underline">
              Log in
            </Link>
          </div>
        </BentoCard>
      </div>
    </div>
  );
};

export default SignupPage;
