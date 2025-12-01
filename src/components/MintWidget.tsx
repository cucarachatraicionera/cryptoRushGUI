import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import BackgroundFX from "./BackgroundFX";
import LoadingMint from "./animations/LoadingMint";
import SuccessMint from "./animations/SuccessMint";
import ErrorMint from "./animations/ErrorMint";

// ======== CONFIGURA ESTO ========
const WALLET_B = "5msxv9UseB1hZUxx5XYAy2SFy3SyorKsT7MRAPj7Tezy";  // B recibe el SOL
const PRICE_SOL = 0.01;                       // precio en SOL por unidad (devnet)
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyngEtZxgMJMnn4Xp2g4E5lrNHhuF87tBXPofv31eDoRGtN7HJAy4nrF6ajnBf_cYvF/exec";                       // opcional: URL de Google Apps Script
// =================================

type MintStatus = "idle" | "loading" | "success" | "error";

// Usa SIEMPRE esta versión (FormData) en tu frontend
async function sendWebhook(payload: any) {
  if (!WEBHOOK_URL) return;

  // ID único para rastrear la fila en Sheets
  if (!payload.request_id) {
    payload.request_id = (crypto as any)?.randomUUID?.() || String(Date.now());
  }

  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));

  // no-cors para evitar CORS/preflight
  await fetch(WEBHOOK_URL, {
    method: "POST",
    body: fd,
    mode: "no-cors",
  });

  console.log("Webhook enviado (no-cors). request_id:", payload.request_id, payload);
}

// Función para crear explosiones neon
const fireFX = (x?: number, y?: number) => {
  const flare = document.createElement("div");
  flare.className = "fx-flare";
  
  if (x !== undefined && y !== undefined) {
    flare.style.left = `${x - 80}px`;
    flare.style.top = `${y - 80}px`;
  } else {
    // Centro de la pantalla por defecto
    flare.style.left = "50%";
    flare.style.top = "50%";
    flare.style.transform = "translate(-50%, -50%)";
  }
  
  document.body.appendChild(flare);
  setTimeout(() => flare.remove(), 700);
};

const MintWidget: React.FC = () => {
  const [isPresale, setIsPresale] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<MintStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [txid, setTxid] = useState<string | null>(null);

  // Tu UI en USD (no afecta al cobro en SOL)
  const priceUSD = isPresale ? 500 : 650;
  const totalUSD = priceUSD * quantity;

  // Total a cobrar en SOL (devnet)
  const totalSOL = useMemo(() => {
    return Math.max(1, quantity) * PRICE_SOL;
  }, [quantity]);

  const { connect, paySOL, pubkey, connected } = usePhantomWallet();

  const onConnect = async (e?: React.MouseEvent) => {
    try {
      if (e) {
        fireFX(e.clientX, e.clientY);
      }
      const k = await connect();
      setStatus("idle");
      setErrorMessage("");
      fireFX();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage("Conexión cancelada o fallida.");
      fireFX();
    }
  };

  const onMint = async (e?: React.MouseEvent) => {
    try {
      if (!connected) {
        setStatus("error");
        setErrorMessage("Conecta tu wallet primero.");
        if (e) fireFX(e.clientX, e.clientY);
        return;
      }

      if (e) {
        fireFX(e.clientX, e.clientY);
      }

      setStatus("loading");
      setErrorMessage("");
      setTxid(null);

      // Pequeño delay para mostrar la animación de carga
      await new Promise(resolve => setTimeout(resolve, 500));

      const sig = await paySOL(WALLET_B, totalSOL);
      setTxid(sig);
      setStatus("success");

      // Explosión de éxito
      fireFX();
      setTimeout(() => fireFX(), 200);
      setTimeout(() => fireFX(), 400);

      await sendWebhook({
        pubkey: pubkey?.toString(),
        monto: totalSOL,
        qty: quantity,
        txid: sig,
      });

      // Reset después de 5 segundos
      setTimeout(() => {
        setStatus("idle");
        setTxid(null);
      }, 5000);
    } catch (e: any) {
      setStatus("error");
      setErrorMessage(e?.message || "Error en la transacción");
      fireFX();
    }
  };

  const handleQuantityChange = (delta: number, e?: React.MouseEvent) => {
    if (e) fireFX(e.clientX, e.clientY);
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handlePresaleToggle = (presale: boolean, e?: React.MouseEvent) => {
    if (e) fireFX(e.clientX, e.clientY);
    setIsPresale(presale);
  };

  return (
    <div className="relative">
      {/* Partículas futuristas de fondo */}
      <BackgroundFX />

      <Card className="relative bg-crypto-surface/50 backdrop-blur-xl border border-cyan-300/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(34,247,174,0.1)] z-10">
        <h3 className="text-xl font-sora font-bold text-white mb-4">Access NFT Mint</h3>

        {/* Estados de animación */}
        {status === "loading" && <LoadingMint />}
        {status === "success" && <SuccessMint txid={txid || undefined} />}
        {status === "error" && <ErrorMint message={errorMessage} />}

        {/* UI principal (oculta durante loading/success/error) */}
        {status === "idle" && (
          <>
            <div className="flex bg-crypto-bg/50 rounded-xl p-1 mb-6">
              <button
                onClick={(e) => handlePresaleToggle(true, e)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  isPresale
                    ? "bg-crypto-neon text-crypto-bg shadow-[0_0_15px_rgba(34,247,174,0.3)]"
                    : "text-crypto-muted hover:text-white"
                }`}
              >
                Presale ${priceUSD}
              </button>
              <button
                onClick={(e) => handlePresaleToggle(false, e)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  !isPresale
                    ? "bg-crypto-neon text-crypto-bg shadow-[0_0_15px_rgba(34,247,174,0.3)]"
                    : "text-crypto-muted hover:text-white"
                }`}
              >
                Launch ${priceUSD}
              </button>
            </div>

            <div className="flex items-center justify-between bg-crypto-bg/30 rounded-xl p-4 mb-6">
              <span className="text-crypto-muted">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => handleQuantityChange(-1, e)}
                  className="w-8 h-8 rounded-lg bg-crypto-surface border border-cyan-300/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-300/10 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={(e) => handleQuantityChange(1, e)}
                  className="w-8 h-8 rounded-lg bg-crypto-surface border border-cyan-300/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-300/10 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-2xl font-sora font-bold text-white">${totalUSD}</div>
              <p className="text-sm text-crypto-muted mt-2">
                50% of profit is distributed to holders. The other 50% fuels the project.
              </p>
              <p className="text-xs text-crypto-muted mt-1">Total a cobrar: {totalSOL} SOL (devnet)</p>
              {pubkey && (
                <p className="text-xs text-crypto-muted mt-1 break-all">
                  Comprador: {pubkey.toString()}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button
                onClick={(e) => onMint(e)}
                disabled={!connected}
                className="w-full bg-crypto-neon text-crypto-bg hover:bg-crypto-neon/90 rounded-2xl py-3 font-semibold shadow-[0_0_20px_rgba(34,247,174,0.3)] hover:shadow-[0_0_30px_rgba(34,247,174,0.5)] transition-all"
              >
                Mint NFT
              </Button>

              <Button
                onClick={(e) => onConnect(e)}
                variant="outline"
                className="w-full border-cyan-300/40 text-cyan-300 hover:bg-cyan-300/10 rounded-2xl py-3 backdrop-blur-sm"
              >
                {connected ? "Wallet Conectada" : "Connect Wallet"}
              </Button>
            </div>

            <p className="text-xs text-crypto-muted text-center mt-4">
              No performance promises. Market risk.
            </p>
          </>
        )}

        {/* Mostrar txid si existe y estamos en estado success */}
        {status === "success" && txid && (
          <div className="mt-3 text-xs text-crypto-muted break-words text-center">
            <a
              className="text-cyan-300 underline hover:text-cyan-200"
              href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
              target="_blank"
              rel="noreferrer"
            >
              Ver transacción en Explorer
            </a>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MintWidget;
