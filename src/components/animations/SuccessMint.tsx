import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function SuccessMint({ txid }: { txid?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Círculo de éxito con animación */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-300/20 to-cyan-300/5 border-4 border-cyan-300/40 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-16 h-16 text-cyan-300" strokeWidth={2.5} />
        </div>
        
        {/* Anillos de expansión */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/30 animate-ping" style={{ animationDuration: "2s" }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }}></div>
      </div>
      
      <p className="mt-6 text-lg font-semibold text-cyan-300 animate-pulse">Mint exitoso 🎉</p>
      
      {txid && (
        <a
          href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-sm text-cyan-300/80 underline hover:text-cyan-300 transition-colors"
        >
          Ver transacción
        </a>
      )}
    </div>
  );
}
