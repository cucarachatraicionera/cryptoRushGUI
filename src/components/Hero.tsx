import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import MintWidget from './MintWidget';

const Hero: React.FC = () => {
  const scrollToMint = () => {
    document.getElementById('nft-economy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen bg-crypto-bg relative overflow-hidden pt-20">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/68b710b5ae3a283e4ed11aac_1756827879729_3c89139b.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-sora font-bold text-white leading-tight">
              Your gateway to an{' '}
              <span className="text-crypto-neon">AI-powered trading system</span>{' '}
              through NFTs
            </h1>
            
            <p className="text-xl text-crypto-muted leading-relaxed">
              Acquire an access NFT and participate in a shared profit model. The AI operates 24/7; you receive earnings simply and transparently.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                'Access via NFT',
                'AI-powered automated trading',
                '50/50 profit sharing',
                'No need to be a pro trader'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-crypto-neon/20 flex items-center justify-center">
                    <Check size={12} className="text-crypto-neon" />
                  </div>
                  <span className="text-crypto-muted text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToMint}
                className="bg-crypto-neon text-crypto-bg hover:bg-crypto-neon/90 rounded-2xl px-8 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(34,247,174,0.3)] hover:shadow-[0_0_40px_rgba(34,247,174,0.5)] transition-all"
              >
                Buy NFT in presale – $500
              </Button>
              <Button 
                variant="outline" 
                className="border-crypto-cyan text-crypto-cyan hover:bg-crypto-cyan/10 rounded-2xl px-8 py-4 text-lg"
              >
                Read Whitepaper
              </Button>
            </div>

            <p className="text-crypto-muted">
              Crypto Rush by Zionix AI bridges innovation in artificial intelligence with a fair and transparent model: 50% of total profit is distributed among access NFT holders, while the other 50% fuels project growth.
            </p>
          </div>

          <div className="lg:pl-8">
            <MintWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;