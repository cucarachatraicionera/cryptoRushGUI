import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Bot, DollarSign } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Buy your access NFT',
      description: 'Purchase in presale ($500) or at launch ($650)',
      color: 'crypto-neon'
    },
    {
      icon: Bot,
      title: 'AI executes trading',
      description: 'Pool capitalization with raised funds; AI executes continuous optimized trading',
      color: 'crypto-cyan'
    },
    {
      icon: DollarSign,
      title: 'Profit distribution',
      description: '50% to holders proportionally; 50% to development and ecosystem expansion',
      color: 'crypto-neon'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-crypto-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-crypto-muted max-w-2xl mx-auto">
            Three simple steps to start earning with AI-powered trading
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colorClass = step.color === 'crypto-neon' ? 'text-crypto-neon' : 'text-crypto-cyan';
            const bgClass = step.color === 'crypto-neon' ? 'bg-crypto-neon/10' : 'bg-crypto-cyan/10';
            const borderClass = step.color === 'crypto-neon' ? 'border-crypto-neon/20' : 'border-crypto-cyan/20';
            
            return (
              <Card 
                key={index}
                className={`bg-crypto-surface/50 backdrop-blur-md border ${borderClass} p-8 rounded-2xl text-center relative`}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-8 h-8 ${bgClass} rounded-full flex items-center justify-center border ${borderClass}`}>
                    <span className={`text-sm font-bold ${colorClass}`}>{index + 1}</span>
                  </div>
                </div>
                
                <div className={`w-16 h-16 ${bgClass} rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4`}>
                  <Icon size={32} className={colorClass} />
                </div>
                
                <h3 className="text-xl font-sora font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-crypto-muted">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-crypto-neon text-crypto-bg hover:bg-crypto-neon/90 rounded-2xl px-8 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(34,247,174,0.3)] hover:shadow-[0_0_40px_rgba(34,247,174,0.5)] transition-all">
            Join Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;