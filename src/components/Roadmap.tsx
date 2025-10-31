import React from 'react';
import { Card } from '@/components/ui/card';

const Roadmap: React.FC = () => {
  const milestones = [
    {
      quarter: 'Q4 2025',
      title: 'Presale & Community Campaign',
      description: 'Launch presale and build initial community',
      status: 'current'
    },
    {
      quarter: 'Q1 2026',
      title: 'User & Holders Panel',
      description: 'Official NFT launch with basic dashboard',
      status: 'upcoming'
    },
    {
      quarter: 'Q2 2026',
      title: 'Contract Audits & Monthly Reporting',
      description: 'Security audits and transparent reporting system',
      status: 'upcoming'
    },
    {
      quarter: 'Q3 2026',
      title: 'Multichain & Mobile Wallet Beta',
      description: 'Cross-chain integration and mobile app',
      status: 'upcoming'
    },
    {
      quarter: 'Q4 2026',
      title: 'DAO-lite Governance',
      description: 'Basic governance voting for holders',
      status: 'upcoming'
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-crypto-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Roadmap
          </h2>
          <p className="text-xl text-crypto-muted max-w-2xl mx-auto">
            Our journey to revolutionize AI-powered trading
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-crypto-neon to-crypto-cyan rounded-full opacity-20" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-center">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-crypto-neon rounded-full shadow-[0_0_20px_rgba(34,247,174,0.5)] z-10" />
                
                {/* Card */}
                <Card className={`w-full max-w-md ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'} bg-crypto-surface/50 backdrop-blur-md border border-crypto-neon/20 p-6 rounded-2xl`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-crypto-neon font-sora font-bold">
                      {milestone.quarter}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'current' 
                        ? 'bg-crypto-neon/20 text-crypto-neon' 
                        : 'bg-crypto-cyan/20 text-crypto-cyan'
                    }`}>
                      {milestone.status === 'current' ? 'Current' : 'Upcoming'}
                    </span>
                  </div>
                  <h3 className="text-lg font-sora font-bold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-crypto-muted text-sm">
                    {milestone.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;