import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageCircle, Twitter, Users, BookOpen } from 'lucide-react';

const Community: React.FC = () => {
  const socialLinks = [
    {
      icon: MessageCircle,
      name: 'Telegram',
      description: 'Join our active community',
      color: 'crypto-cyan',
      members: '2.5K+'
    },
    {
      icon: Twitter,
      name: 'X/Twitter',
      description: 'Latest updates and news',
      color: 'crypto-neon',
      members: '1.8K+'
    },
    {
      icon: Users,
      name: 'Discord',
      description: 'Chat with the community',
      color: 'crypto-cyan',
      members: '3.2K+'
    },
    {
      icon: BookOpen,
      name: 'GitBook',
      description: 'Read our whitepaper',
      color: 'crypto-neon',
      members: 'Docs'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Early Investor',
      comment: 'The AI trading approach is revolutionary. Excited to be part of this journey.',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/68b710b5ae3a283e4ed11aac_1756827881355_4af405c7.webp'
    },
    {
      name: 'Sarah Johnson',
      role: 'Crypto Enthusiast',
      comment: 'Finally, a project that combines AI innovation with fair profit sharing.',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/68b710b5ae3a283e4ed11aac_1756827882080_75c29fa3.webp'
    }
  ];

  return (
    <section id="community" className="py-20 bg-crypto-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Community & Social
          </h2>
          <p className="text-xl text-crypto-muted max-w-2xl mx-auto">
            Join our growing community of AI trading enthusiasts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            const colorClass = link.color === 'crypto-neon' ? 'text-crypto-neon' : 'text-crypto-cyan';
            const bgClass = link.color === 'crypto-neon' ? 'bg-crypto-neon/10' : 'bg-crypto-cyan/10';
            const borderClass = link.color === 'crypto-neon' ? 'border-crypto-neon/20' : 'border-crypto-cyan/20';
            
            return (
              <Card 
                key={index}
                className={`bg-crypto-surface/50 backdrop-blur-md border ${borderClass} p-6 rounded-2xl text-center hover:shadow-[0_0_30px_rgba(34,247,174,0.1)] transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
              >
                <div className={`w-12 h-12 ${bgClass} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={24} className={colorClass} />
                </div>
                <h3 className="text-lg font-sora font-bold text-white mb-2">
                  {link.name}
                </h3>
                <p className="text-crypto-muted text-sm mb-3">
                  {link.description}
                </p>
                <div className={`text-xs ${colorClass} font-medium`}>
                  {link.members}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-crypto-surface/50 backdrop-blur-md border border-crypto-neon/20 p-6 rounded-2xl"
            >
              <div className="flex items-start space-x-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-sora font-bold text-white">
                      {testimonial.name}
                    </h4>
                    <span className="text-crypto-muted text-sm">
                      • {testimonial.role}
                    </span>
                  </div>
                  <p className="text-crypto-muted italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;