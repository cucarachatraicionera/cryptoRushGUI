import React from 'react';
import { Card } from '@/components/ui/card';
import { Key, Bot, TrendingUp, BarChart3 } from 'lucide-react';

const WhyCryptoRush: React.FC = () => {
  const features = [
    {
      icon: Key,
      title: 'NFT Key',
      description: 'Your exclusive pass to the system.',
      color: 'crypto-neon'
    },
    {
      icon: Bot,
      title: 'AI 24/7',
      description: 'Automated strategies, constant execution.',
      color: 'crypto-cyan'
    },
    {
      icon: TrendingUp,
      title: '50/50 Sharing',
      description: '50% of profits for holders.',
      color: 'crypto-neon'
    },
    {
      icon: BarChart3,
      title: 'Transparency',
      description: 'Dashboard & periodic reports.',
      color: 'crypto-cyan'
    }
  ];

  return (
    <section className="py-20 bg-crypto-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Why Crypto Rush
          </h2>
          <p className="text-xl text-crypto-muted max-w-2xl mx-auto">
            AI, simple access, and fair sharing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = feature.color === 'crypto-neon' ? 'text-crypto-neon' : 'text-crypto-cyan';
            const bgClass = feature.color === 'crypto-neon' ? 'bg-crypto-neon/10' : 'bg-crypto-cyan/10';
            const borderClass = feature.color === 'crypto-neon' ? 'border-crypto-neon/20' : 'border-crypto-cyan/20';
            
            return (
              <Card 
                key={index}
                className={`bg-crypto-surface/50 backdrop-blur-md border ${borderClass} p-6 rounded-2xl hover:shadow-[0_0_30px_rgba(34,247,174,0.1)] transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`w-12 h-12 ${bgClass} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={24} className={colorClass} />
                </div>
                <h3 className="text-xl font-sora font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-crypto-muted">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCryptoRush;