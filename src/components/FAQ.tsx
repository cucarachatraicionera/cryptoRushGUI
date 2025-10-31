import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What do I get as a holder?',
      answer: 'As an NFT holder, you get access to our AI trading system, profit sharing (50% of all profits distributed to holders), and community participation rights.'
    },
    {
      question: 'How often are profits distributed?',
      answer: 'Distribution frequency will be announced in the holders panel. We aim for regular distributions based on trading performance and market conditions.'
    },
    {
      question: 'Do I need trading experience?',
      answer: 'No trading experience required. Our AI manages all trading operations automatically. You simply hold your NFT and receive your share of profits.'
    },
    {
      question: 'Can I resell my NFT?',
      answer: 'Yes, NFTs are fully transferable and can be resold on secondary markets, depending on platform availability.'
    },
    {
      question: 'What are the risks?',
      answer: 'All trading operations involve market risks. Profits are not guaranteed, and you may experience losses. Past performance does not indicate future results.'
    },
    {
      question: 'Legal and compliance?',
      answer: 'This project does not constitute financial advice. Please check your local regulations regarding cryptocurrency investments and NFT ownership.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-crypto-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-crypto-muted max-w-2xl mx-auto">
            Everything you need to know about Crypto Rush.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-crypto-surface/50 backdrop-blur-md border border-crypto-neon/20 rounded-2xl px-6"
              >
                <AccordionTrigger className="text-white hover:text-crypto-neon font-sora font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-crypto-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-crypto-muted text-sm max-w-3xl mx-auto">
            <strong className="text-crypto-warning">Disclaimer:</strong> This project does not constitute financial advice. 
            Participation involves market risks and potential losses. Returns are not guaranteed. 
            Check applicable regulations in your jurisdiction before participating.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;