
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Bot, ArrowRight } from "lucide-react";
import NeonText from "@/components/common/NeonText";
import GlowButton from "@/components/common/GlowButton";
import BentoCard from "@/components/common/BentoCard";

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 mb-4">
    <Check className="text-neon-magenta shrink-0 mt-1" size={16} />
    <span className="text-gray-300">{children}</span>
  </div>
);

const PricingPage = () => {
  const [annualBilling, setAnnualBilling] = useState(false);
  
  const proPrice = annualBilling ? 4 : 5; // 20% discount for annual
  
  return (
    <div className="min-h-screen bg-background animated-grid-bg">
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
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-300">Choose the plan that's right for you</p>
          
          <div className="mt-8 inline-flex items-center p-1 bg-dark-lighter rounded-lg">
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                !annualBilling ? "bg-dark-card text-white" : "text-gray-400"
              }`}
              onClick={() => setAnnualBilling(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                annualBilling ? "bg-dark-card text-white" : "text-gray-400"
              }`}
              onClick={() => setAnnualBilling(true)}
            >
              Annually <span className="text-xs text-neon-magenta">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <BentoCard className="border-white/5 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                <NeonText>Free Plan</NeonText>
              </h2>
              <div className="text-4xl font-bold mb-4">
                <NeonText color="magenta">$0</NeonText>
                <span className="text-gray-400 text-lg font-normal">/month</span>
              </div>
              <p className="text-gray-400">Perfect for hobbyists and beginners</p>
            </div>
            
            <div className="divider" />
            
            <div className="mb-8">
              <PlanFeature>1 Discord Bot</PlanFeature>
              <PlanFeature>Basic hosting resources</PlanFeature>
              <PlanFeature>10 custom commands</PlanFeature>
              <PlanFeature>3 status rotations</PlanFeature>
              <PlanFeature>Community support</PlanFeature>
            </div>
            
            <div className="text-center">
              <Link to="/signup">
                <GlowButton variant="outline" className="w-full">
                  <div className="flex items-center justify-center gap-2">
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </div>
                </GlowButton>
              </Link>
            </div>
          </BentoCard>
          
          {/* Pro Plan */}
          <BentoCard className="border-neon-magenta/30 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -top-3 right-10 bg-neon-magenta text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                <NeonText>Pro Plan</NeonText>
              </h2>
              <div className="text-4xl font-bold mb-4">
                <NeonText color="magenta">${proPrice}</NeonText>
                <span className="text-gray-400 text-lg font-normal">/{annualBilling ? 'month' : 'month'}</span>
              </div>
              <p className="text-gray-400">For serious Discord community managers</p>
            </div>
            
            <div className="divider" />
            
            <div className="mb-8">
              <PlanFeature>Up to 5 Discord Bots</PlanFeature>
              <PlanFeature>Advanced hosting resources</PlanFeature>
              <PlanFeature>Unlimited custom commands</PlanFeature>
              <PlanFeature>Unlimited status rotations</PlanFeature>
              <PlanFeature>Priority support</PlanFeature>
              <PlanFeature>Custom bot profile picture</PlanFeature>
              <PlanFeature>Detailed analytics and logs</PlanFeature>
              <PlanFeature>Advanced bot permissions</PlanFeature>
            </div>
            
            <div className="text-center">
              <Link to="/signup">
                <GlowButton className="w-full">
                  <div className="flex items-center justify-center gap-2">
                    <span>Upgrade to Pro</span>
                    <ArrowRight size={16} />
                  </div>
                </GlowButton>
              </Link>
            </div>
          </BentoCard>
        </div>
        
        <div className="mt-20 text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <BentoCard>
              <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, PayPal, and cryptocurrency.</p>
            </BentoCard>
            
            <BentoCard>
              <h3 className="text-lg font-bold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-400">Yes, you can cancel your subscription at any time with no cancellation fees.</p>
            </BentoCard>
            
            <BentoCard>
              <h3 className="text-lg font-bold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-400">We offer a 7-day money-back guarantee for all new Pro subscriptions.</p>
            </BentoCard>
            
            <BentoCard>
              <h3 className="text-lg font-bold mb-2">Can I upgrade from Free to Pro later?</h3>
              <p className="text-gray-400">Yes, you can upgrade to Pro at any time and your new features will be instantly available.</p>
            </BentoCard>
          </div>
        </div>
        
        <div className="mt-20 max-w-3xl mx-auto text-center bg-dark-lighter p-10 rounded-xl border border-neon-magenta/20 animate-fade-in">
          <Bot className="mx-auto text-neon-magenta mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-4">Ready to take your Discord server to the next level?</h2>
          <p className="text-gray-300 mb-6">Join thousands of Discord server owners who trust ExoV1 for reliable bot hosting.</p>
          <Link to="/signup">
            <GlowButton size="lg">Get Started Today</GlowButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
