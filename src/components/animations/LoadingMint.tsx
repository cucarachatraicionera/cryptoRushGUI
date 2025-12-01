import React from "react";

export default function LoadingMint() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-32 h-32">
        {/* Spinner futurista */}
        <div className="absolute inset-0 border-4 border-cyan-300/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-cyan-300 border-r-cyan-300 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-cyan-300/10 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-transparent border-b-cyan-300 border-l-cyan-300 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
        
        {/* Punto central pulsante */}
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,247,174,0.8)]"></div>
      </div>
      <p className="mt-6 text-sm text-cyan-300 font-medium animate-pulse">Procesando mint...</p>
    </div>
  );
}
