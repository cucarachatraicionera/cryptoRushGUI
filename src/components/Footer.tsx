import React from 'react';
import { Twitter, MessageCircle, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-crypto-bg border-t border-crypto-surface py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="text-2xl font-sora font-bold text-crypto-neon">
              Crypto Rush
            </div>
            <p className="text-crypto-muted text-sm">
              AI-powered trading system with fair profit sharing through NFT access.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors">
                <Users size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sora font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">How it Works</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">NFT Economy</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Roadmap</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Whitepaper</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sora font-bold text-white mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Telegram</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Discord</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">GitBook</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sora font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Disclaimer</a></li>
              <li><a href="mailto:contact@cryptorush.ai" className="text-crypto-muted hover:text-crypto-neon transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-crypto-surface pt-8 text-center">
          <p className="text-crypto-muted text-sm">
            © 2025 Crypto Rush by Zionix AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;