import React from 'react';
import Header from './Header';
import Hero from './Hero';
import WhyCryptoRush from './WhyCryptoRush';
import HowItWorks from './HowItWorks';
import NFTEconomy from './NFTEconomy';
import Roadmap from './Roadmap';
import DistributionSection from './DistributionSection';
import Community from './Community';
import CommentsSection from './CommentsSection';
import FAQ from './FAQ';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-crypto-bg">
      <Header />
      <Hero />
      <WhyCryptoRush />
      <HowItWorks />
      <NFTEconomy />
      <DistributionSection />
      <Roadmap />
      <Community />
      <CommentsSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default AppLayout;
