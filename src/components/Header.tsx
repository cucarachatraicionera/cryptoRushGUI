import React from "react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-crypto-bg/80 backdrop-blur-md border-b border-crypto-surface">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Top bar */}
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20">
          {/* IZQ: hamburguesa (mobile) / gutter (desktop) */}
          <div className="flex items-center col-start-1">
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/50 transition-colors"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            {/* gutter para centrar el nav en desktop */}
            <div className="hidden md:block w-24 md:w-28" />
          </div>

          {/* CENTRO: Nav (solo desktop) */}
          <nav className="hidden md:flex items-center gap-8 justify-center">
            <button onClick={() => scrollToSection("home")} className="text-crypto-muted hover:text-crypto-neon transition-colors">Home</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-crypto-muted hover:text-crypto-neon transition-colors">How it Works</button>
            <button onClick={() => scrollToSection("nft-economy")} className="text-crypto-muted hover:text-crypto-neon transition-colors">NFT Economy</button>
            <button onClick={() => scrollToSection("distribution")} className="text-crypto-muted hover:text-crypto-neon transition-colors">Distribution</button>
            <button onClick={() => scrollToSection("roadmap")} className="text-crypto-muted hover:text-crypto-neon transition-colors">Roadmap</button>
            <button onClick={() => scrollToSection("community")} className="text-crypto-muted hover:text-crypto-neon transition-colors">Community</button>
            <button onClick={() => scrollToSection("comments")} className="text-crypto-muted hover:text-crypto-neon transition-colors">Comments</button>
            <button onClick={() => scrollToSection("faq")} className="text-crypto-muted hover:text-crypto-neon transition-colors">FAQ</button>
          </nav>

          {/* DER: botón (forzado a col 3 en mobile) */}
          <div className="col-start-3 justify-self-end z-10">
            <Button className="bg-crypto-neon/10 text-crypto-neon border border-crypto-neon hover:bg-crypto-neon hover:text-crypto-bg rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,247,174,0.3)] text-sm md:text-base">
              Connect Wallet
            </Button>
          </div>
        </div>

        {/* LOGO (mobile) centrado en la barra */}
        <a
          href="/"
          aria-label="Crypto Rush — Home"
          className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-[70px] sm:w-[80px] pointer-events-none z-0"
        >
          <img src="/crypto-rush-logo.svg" alt="Crypto Rush" className="w-full h-auto select-none drop-shadow-[0_0_18px_rgba(34,247,174,0.35)]" draggable={false} />
        </a>

        {/* LOGO (desktop) a la izquierda “colgando” 20% */}
        <a
          href="/"
          aria-label="Crypto Rush — Home"
          className="hidden md:block absolute left-0 md:left-2 lg:left-4 top-[20%] -translate-y-1/3 w-[100px] md:w-[130px] lg:w-[120px] z-10"
        >
          <img src="/crypto-rush-logo.svg" alt="Crypto Rush" className="w-full h-auto select-none drop-shadow-[0_0_24px_rgba(34,247,174,0.45)]" draggable={false} />
        </a>
      </div>

      {/* MENÚ MOBILE desplegable */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bg-crypto-bg/95 backdrop-blur border-b border-crypto-surface transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
          <button onClick={() => go("home")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">Home</button>
          <button onClick={() => go("how-it-works")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">How it Works</button>
          <button onClick={() => go("nft-economy")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">NFT Economy</button>
          <button onClick={() => go("distribution")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">Distribution</button>
          <button onClick={() => go("roadmap")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">Roadmap</button>
          <button onClick={() => go("community")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">Community</button>
          <button onClick={() => go("comments")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">Comments</button>
          <button onClick={() => go("faq")} className="text-left px-3 py-2 rounded-lg text-crypto-muted hover:text-crypto-neon hover:bg-crypto-surface/40 transition-colors">FAQ</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
