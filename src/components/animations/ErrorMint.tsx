import React from "react";
import { XCircle, X } from "lucide-react";

export default function ErrorMint({ message, onClose }: { message?: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 relative">
      {/* Botón X para cerrar */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/30 hover:border-red-500/60 transition-colors z-20"
          aria-label="Cerrar error"
        >
          <X size={16} />
        </button>
      )}
      
      <div className="relative">
        {/* Círculo de error con animación */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/5 border-4 border-red-500/40 flex items-center justify-center animate-pulse">
          <XCircle className="w-16 h-16 text-red-400" strokeWidth={2.5} />
        </div>
        
        {/* Anillos de expansión */}
        <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" style={{ animationDuration: "2s" }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }}></div>
      </div>
      
      <p className="mt-6 text-lg font-semibold text-red-400">Mint falló</p>
      {message && (
        <p className="mt-2 text-sm text-red-300/80 max-w-xs text-center">{message}</p>
      )}
    </div>
  );
}
