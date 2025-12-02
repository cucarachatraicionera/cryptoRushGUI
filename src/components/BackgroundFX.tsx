import React, { useMemo } from "react";

export default function BackgroundFX() {
  // Generar posiciones una sola vez
  const particles = useMemo(() => {
    return {
      large: Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      })),
      medium: Array.from({ length: 30 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
        offsetX: (Math.random() - 0.5) * 20,
        offsetY: (Math.random() - 0.5) * 20,
      })),
      small: Array.from({ length: 40 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 2,
        offsetX: (Math.random() - 0.5) * 15,
        offsetY: (Math.random() - 0.5) * 15,
      })),
    };
  }, []);

  return (
    <div className="fx-fullscreen overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {/* Capa 1: Partículas grandes */}
        {particles.large.map((p, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-1 h-1 bg-cyan-300/30 rounded-full animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
        
        {/* Capa 2: Partículas medianas */}
        {particles.medium.map((p, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-0.5 h-0.5 bg-cyan-300/20 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              '--offset-x': `${p.offsetX}px`,
              '--offset-y': `${p.offsetY}px`,
            } as React.CSSProperties}
          />
        ))}
        
        {/* Capa 3: Partículas pequeñas */}
        {particles.small.map((p, i) => (
          <div
            key={`small-${i}`}
            className="absolute w-0.5 h-0.5 bg-blue-300/15 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              '--offset-x': `${p.offsetX}px`,
              '--offset-y': `${p.offsetY}px`,
            } as React.CSSProperties}
          />
        ))}
        
        {/* Líneas de conexión sutiles */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: 5 }).map((_, i) => {
            const x1 = 20 + Math.random() * 60;
            const y1 = 20 + Math.random() * 60;
            const x2 = x1 + (Math.random() - 0.5) * 20;
            const y2 = y1 + (Math.random() - 0.5) * 20;
            return (
              <line
                key={`line-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#gradient)"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22f7ae" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(var(--offset-x, 5px), var(--offset-y, 5px)) scale(1.2);
            opacity: 0.4;
          }
          50% {
            transform: translate(calc(var(--offset-x, 5px) * 1.5), calc(var(--offset-y, 5px) * 1.5)) scale(0.8);
            opacity: 0.3;
          }
          75% {
            transform: translate(calc(var(--offset-x, 5px) * 0.75), calc(var(--offset-y, 5px) * 0.75)) scale(1.1);
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
}
