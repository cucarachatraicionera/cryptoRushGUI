import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NFTEconomy: React.FC = () => {
  const stats = [
    { label: 'Presale', value: '$500', color: 'crypto-neon' },
    { label: 'Launch', value: '$650', color: 'crypto-cyan' },
    { label: 'Sharing', value: '50% Holders / 50% Project', color: 'crypto-neon' }
  ];

  const allocation = [
    { label: 'Operations & liquidity', percentage: 77, color: 'crypto-neon' },
    { label: 'For marketing & development', percentage: 13, color: 'crypto-cyan' },
    // { label: 'Marketing & community', percentage: 20, color: 'crypto-warning' },
    // { label: 'Team (vesting)', percentage: 15, color: 'crypto-muted' }
  ];

  return (
    <section id="nft-economy" className="py-20 bg-crypto-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            NFT Economy & Profit Sharing
          </h2>
          <p className="text-xl text-crypto-muted max-w-2xl mx-auto">
            Transparent tokenomics and fair distribution model
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const colorClass = stat.color === 'crypto-neon' ? 'text-crypto-neon border-crypto-neon/20' : 
                              stat.color === 'crypto-cyan' ? 'text-crypto-cyan border-crypto-cyan/20' : 
                              'text-crypto-warning border-crypto-warning/20';
            
            return (
              <Card 
                key={index}
                className={`bg-crypto-surface/50 backdrop-blur-md border ${colorClass.split(' ')[1]} p-6 rounded-2xl text-center`}
              >
                <div className={`text-3xl font-sora font-bold ${colorClass.split(' ')[0]} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-crypto-muted font-medium">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="bg-crypto-surface/50 backdrop-blur-md border border-crypto-neon/20 p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-sora font-bold text-white mb-6 text-center">
            Fund Allocation
          </h3>
          
          <div className="space-y-4">
            {allocation.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-4 h-4 rounded-full`}
                    style={{ backgroundColor: 
                      item.color === 'crypto-neon' ? '#22F7AE' :
                      item.color === 'crypto-cyan' ? '#27D3F8' :
                      item.color === 'crypto-warning' ? '#F59E0B' :
                      '#94A3B8'
                    }}
                  />
                  <span className="text-white">{item.label}</span>
                </div>
                <span className="text-crypto-muted font-medium">{item.percentage}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 h-4 bg-crypto-bg rounded-full overflow-hidden flex">
            {allocation.map((item, index) => (
              <div
                key={index}
                className="h-full"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: 
                    item.color === 'crypto-neon' ? '#22F7AE' :
                    item.color === 'crypto-cyan' ? '#27D3F8' :
                    item.color === 'crypto-warning' ? '#F59E0B' :
                    '#94A3B8'
                }}
              />
            ))}
          </div>
        </Card>

        <div className="text-center">
          <p className="text-crypto-muted mb-6">
            Total NFT supply and exact numbers will be published in the whitepaper.
          </p>
          <Button className="bg-crypto-cyan text-crypto-bg hover:bg-crypto-cyan/90 rounded-2xl px-8 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(39,211,248,0.3)] hover:shadow-[0_0_40px_rgba(39,211,248,0.5)] transition-all">
            View Whitepaper
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NFTEconomy;