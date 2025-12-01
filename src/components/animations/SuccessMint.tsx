import React, { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";

export default function SuccessMint({ txid }: { txid?: string }) {
  // Generar MÁS chispas de festejo cayendo - duración 2 segundos
  const confettiSparks = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2, // Duración fija de 2 segundos
      size: 3 + Math.random() * 5,
      color: i % 4 === 0 ? "#22f7ae" : i % 4 === 1 ? "#2dd4bf" : i % 4 === 2 ? "#0ea5e9" : "#06b6d4",
      rotation: Math.random() * 720, // Rotación aleatoria
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8 relative overflow-visible">
      {/* Chispas de festejo cayendo */}
      {confettiSparks.map((spark, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute rounded-full animate-confetti-fall"
          style={{
            left: `${spark.left}%`,
            top: "-10%",
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            animationDelay: `${spark.delay}s`,
            animationDuration: `${spark.duration}s`,
            boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
            '--rotation': `${spark.rotation}deg`,
          } as React.CSSProperties}
        />
      ))}
      
      <div className="relative z-10">
        {/* Círculo de éxito con animación */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-300/20 to-cyan-300/5 border-4 border-cyan-300/40 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-16 h-16 text-cyan-300" strokeWidth={2.5} />
        </div>
        
        {/* Anillos de expansión */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/30 animate-ping" style={{ animationDuration: "2s" }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }}></div>
      </div>
      
      <p className="mt-6 text-lg font-semibold text-cyan-300 animate-pulse z-10 relative">Mint exitoso 🎉</p>
      

      
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(250px) rotate(var(--rotation, 360deg));
            opacity: 0;
          }
        }
        
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  );
}
