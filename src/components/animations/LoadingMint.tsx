import React, { useMemo } from "react";

export default function LoadingMint() {
  // Generar posiciones de chispas alrededor del círculo - MÁS CHISPAS Y FRENÉTICAS
  const sparks = useMemo(() => {
    // Más chispas en múltiples capas
    const outerSparks = Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      const radius = 75;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return {
        x,
        y,
        delay: i * 0.05,
        size: 4 + Math.random() * 5, // Más grandes: 4-9px
        duration: 0.3 + Math.random() * 0.2, // Más rápido
      };
    });
    
    const innerSparks = Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12 + 15; // Offset para no alinearse
      const radius = 55;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return {
        x,
        y,
        delay: i * 0.06,
        size: 3 + Math.random() * 4, // Más grandes: 3-7px
        duration: 0.25 + Math.random() * 0.15,
      };
    });
    
    // Chispas aleatorias adicionales para efecto de fritura
    const randomSparks = Array.from({ length: 8 }).map(() => {
      const angle = Math.random() * 360;
      const radius = 50 + Math.random() * 30;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return {
        x,
        y,
        delay: Math.random() * 0.3,
        size: 3 + Math.random() * 4, // Más grandes: 3-7px
        duration: 0.2 + Math.random() * 0.2,
      };
    });
    
    return [...outerSparks, ...innerSparks, ...randomSparks];
  }, []);

  // Chispas tipo estrella que salen del círculo hacia afuera (pequeñas - las originales)
  const starSparks = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = Math.random() * 360;
      const startRadius = 40 + Math.random() * 20; // Empiezan cerca del círculo
      const endRadius = 100 + Math.random() * 40; // Salen hacia afuera
      const startX = Math.cos((angle * Math.PI) / 180) * startRadius;
      const startY = Math.sin((angle * Math.PI) / 180) * startRadius;
      const endX = Math.cos((angle * Math.PI) / 180) * endRadius;
      const endY = Math.sin((angle * Math.PI) / 180) * endRadius;
      
      return {
        angle,
        startX,
        startY,
        endX,
        endY,
        delay: Math.random() * 0.4,
        duration: 0.4 + Math.random() * 0.3,
        size: 8 + Math.random() * 8, // MUCHO más grandes: 8-16px
      };
    });
  }, []);

  // Chispas tipo estrella GRANDES que salen del círculo hacia afuera
  const bigStarSparks = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const angle = Math.random() * 360;
      const startRadius = 35 + Math.random() * 15;
      const endRadius = 110 + Math.random() * 50;
      const startX = Math.cos((angle * Math.PI) / 180) * startRadius;
      const startY = Math.sin((angle * Math.PI) / 180) * startRadius;
      const endX = Math.cos((angle * Math.PI) / 180) * endRadius;
      const endY = Math.sin((angle * Math.PI) / 180) * endRadius;
      
      return {
        angle,
        startX,
        startY,
        endX,
        endY,
        delay: Math.random() * 0.5,
        duration: 0.5 + Math.random() * 0.4,
        size: 12 + Math.random() * 10, // MUCHO más grandes: 12-22px
      };
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-32 h-32">
        {/* Spinner futurista */}
        <div className="absolute inset-0 border-4 border-cyan-300/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-cyan-300 border-r-cyan-300 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-cyan-300/10 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-transparent border-b-cyan-300 border-l-cyan-300 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
        
        {/* Punto central pulsante más intenso */}
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,247,174,0.8)]"></div>
        
        {/* Chispas frenéticas alrededor del círculo (las originales) */}
        {sparks.map((spark, i) => (
          <div
            key={`spark-${i}`}
            className="absolute rounded-full bg-cyan-300 animate-spark-frenetic"
            style={{
              left: `calc(50% + ${spark.x}px)`,
              top: `calc(50% + ${spark.y}px)`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${spark.delay}s`,
              animationDuration: `${spark.duration}s`,
              boxShadow: `0 0 ${spark.size * 3}px rgba(34, 247, 174, 1), 0 0 ${spark.size * 5}px rgba(45, 212, 191, 0.6)`,
            }}
          />
        ))}
        
        {/* Chispas tipo estrella pequeñas que salen del círculo hacia afuera */}
        {starSparks.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-star-burst"
            style={{
              left: "50%",
              top: "50%",
              width: `${star.size}px`,
              height: `${star.size}px`,
              transform: `translate(calc(-50% + ${star.startX}px), calc(-50% + ${star.startY}px))`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              '--start-x': `${star.startX}px`,
              '--start-y': `${star.startY}px`,
              '--end-x': `${star.endX}px`,
              '--end-y': `${star.endY}px`,
            } as React.CSSProperties}
          >
            {/* Estrella usando múltiples divs rotados */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, #22f7ae 40%, transparent 70%)`,
                boxShadow: `0 0 ${star.size * 2}px rgba(34, 247, 174, 1), 0 0 ${star.size * 4}px rgba(45, 212, 191, 0.8)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, transparent 30%, #2dd4bf 50%, transparent 70%)`,
                transform: 'rotate(45deg)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent 30%, #0ea5e9 50%, transparent 70%)`,
                transform: 'rotate(90deg)',
              }}
            />
          </div>
        ))}
        
        {/* Chispas tipo estrella GRANDES que salen del círculo hacia afuera */}
        {bigStarSparks.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-star-burst"
            style={{
              left: "50%",
              top: "50%",
              width: `${star.size}px`,
              height: `${star.size}px`,
              transform: `translate(calc(-50% + ${star.startX}px), calc(-50% + ${star.startY}px))`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              '--start-x': `${star.startX}px`,
              '--start-y': `${star.startY}px`,
              '--end-x': `${star.endX}px`,
              '--end-y': `${star.endY}px`,
            } as React.CSSProperties}
          >
            {/* Estrella usando múltiples divs rotados */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, #22f7ae 40%, transparent 70%)`,
                boxShadow: `0 0 ${star.size * 2}px rgba(34, 247, 174, 1), 0 0 ${star.size * 4}px rgba(45, 212, 191, 0.8)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, transparent 30%, #2dd4bf 50%, transparent 70%)`,
                transform: 'rotate(45deg)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent 30%, #0ea5e9 50%, transparent 70%)`,
                transform: 'rotate(90deg)',
              }}
            />
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-cyan-300 font-medium animate-pulse">Processing mint...</p>
      
      <style>{`
        @keyframes spark-frenetic {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5) rotate(45deg);
          }
          20% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.8) rotate(90deg);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.8) rotate(135deg);
          }
          40% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.6) rotate(225deg);
          }
          60% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(0.9) rotate(270deg);
          }
          70% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.7) rotate(315deg);
          }
          80% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1) rotate(360deg);
          }
          90% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.4) rotate(405deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6) rotate(450deg);
          }
        }
        
        @keyframes star-burst {
          0% {
            opacity: 0;
            transform: translate(calc(-50% + var(--start-x)), calc(-50% + var(--start-y))) scale(0.2) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translate(calc(-50% + calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.15))), calc(-50% + calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.15))) scale(1.8) rotate(180deg);
          }
          30% {
            opacity: 0.9;
            transform: translate(calc(-50% + calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.3))), calc(-50% + calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.3))) scale(1.4) rotate(360deg);
          }
          50% {
            opacity: 1;
            transform: translate(calc(-50% + calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.5))), calc(-50% + calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.5))) scale(2) rotate(540deg);
          }
          70% {
            opacity: 0.8;
            transform: translate(calc(-50% + calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.7))), calc(-50% + calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.7))) scale(1.6) rotate(720deg);
          }
          85% {
            opacity: 0.6;
            transform: translate(calc(-50% + calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.85))), calc(-50% + calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.85))) scale(1.2) rotate(900deg);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0.3) rotate(1080deg);
          }
        }
        
        .animate-spark-frenetic {
          animation: spark-frenetic ease-in-out infinite;
        }
        
        .animate-star-burst {
          animation: star-burst ease-out infinite;
        }
      `}</style>
    </div>
  );
}
