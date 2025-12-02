import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";

// ======== CONFIGURA ESTO ========

// Wallet que recibe el SOL (tesorería en mainnet).
// Puedes dejar esta o poner la de tu Phantom / tesorera.
const WALLET_B = "5msxv9UseB1hZUxx5XYAy2SFy3SyorKsT7MRAPj7Tezy";

// Precio objetivo en USD por NFT
const PRICE_USD_PRESALE = 300;
const PRICE_USD_LAUNCH = 300;

// Conversión manual USD → SOL.
// EJEMPLO: si 1 SOL ≈ 200 USD → USD_PER_SOL = 200.
// Entonces PRICE_SOL = 300 / 200 = 1.5 SOL.
// ACTUALIZA ESTE VALOR CUANDO CAMBIE EL PRECIO DEL SOL.
const USD_PER_SOL = 200;

// Precio en SOL calculado a partir de los 300 USD
const PRICE_SOL = PRICE_USD_PRESALE / USD_PER_SOL;

// URL de tu Google Apps Script (igual que antes)
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyngEtZxgMJMnn4Xp2g4E5lrNHhuF87tBXPofv31eDoRGtN7HJAy4nrF6ajnBf_cYvF/exec";

// =================================

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

const MintWidget: React.FC = () => {
  const [isPresale, setIsPresale] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [txid, setTxid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // UI en USD (para mostrar precio)
  const priceUSD = isPresale ? PRICE_USD_PRESALE : PRICE_USD_LAUNCH;
  const totalUSD = priceUSD * quantity;

  // Total a cobrar en SOL (en mainnet)
  const totalSOL = useMemo(() => {
    return Math.max(1, quantity) * PRICE_SOL;
  }, [quantity]);

  const { connect, paySOL, pubkey, connected } = usePhantomWallet();

  const onConnect = async () => {
    try {
      const k = await connect();
      setStatus(`Conectado: ${k}`);
    } catch {
      setStatus("Conexión cancelada o fallida.");
    }
  };

  const onMint = async () => {
    try {
      if (!connected) {
        setStatus("Conecta tu wallet primero.");
        return;
      }
      setLoading(true);
      const sig = await paySOL(WALLET_B, totalSOL);
      setTxid(sig);
      setStatus(`Transacción de NFT exitosa. TXID: ${sig}`);

      await sendWebhook({
        pubkey: pubkey?.toString(),
        monto: totalSOL,
        qty: quantity,
        txid: sig,
      });

      // Aquí haces tu "magia": transfieres manualmente el NFT
      // desde tu Candy Machine / billetera al comprador.
    } catch (e: any) {
      setStatus(`Error en la transacción: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-crypto-surface/50 backdrop-blur-md border border-crypto-neon/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(34,247,174,0.1)]">
      <h3 className="text-xl font-sora font-bold text-white mb-4">Access NFT Mint</h3>

      <div className="flex bg-crypto-bg/50 rounded-xl p-1 mb-6">
        <button
          onClick={() => setIsPresale(true)}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            isPresale
              ? "bg-crypto-neon text-crypto-bg shadow-[0_0_15px_rgba(34,247,174,0.3)]"
              : "text-crypto-muted hover:text-white"
          }`}
        >
          Presale ${PRICE_USD_PRESALE}
        </button>
        <button
          onClick={() => setIsPresale(false)}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            !isPresale
              ? "bg-crypto-neon text-crypto-bg shadow-[0_0_15px_rgba(34,247,174,0.3)]"
              : "text-crypto-muted hover:text-white"
          }`}
        >
          Launch ${PRICE_USD_LAUNCH}
        </button>
      </div>

      <div className="flex items-center justify-between bg-crypto-bg/30 rounded-xl p-4 mb-6">
        <span className="text-crypto-muted">Quantity</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg bg-crypto-surface border border-crypto-neon/20 flex items-center justify-center text-crypto-neon hover:bg-crypto-neon/10 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="text-white font-medium w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-8 h-8 rounded-lg bg-crypto-surface border border-crypto-neon/20 flex items-center justify-center text-crypto-neon hover:bg-crypto-neon/10 transition-colors"
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
        <p className="text-xs text-crypto-muted mt-1">
          Total a cobrar: {totalSOL} SOL (mainnet)
        </p>
        {pubkey && (
          <p className="text-xs text-crypto-muted mt-1 break-all">
            Comprador: {pubkey.toString()}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Button
          onClick={onMint}
          disabled={!connected || loading}
          className="w-full bg-crypto-neon text-crypto-bg hover:bg-crypto-neon/90 rounded-2xl py-3 font-semibold shadow-[0_0_20px_rgba(34,247,174,0.3)] hover:shadow-[0_0_30px_rgba(34,247,174,0.5)] transition-all"
        >
          {loading ? "Procesando..." : "Mint NFT"}
        </Button>

        <Button
          onClick={onConnect}
          variant="outline"
          className="w-full border-crypto-cyan text-crypto-cyan hover:bg-crypto-cyan/10 rounded-2xl py-3"
        >
          {connected ? "Wallet Conectada" : "Connect Wallet"}
        </Button>
      </div>

      <p className="text-xs text-crypto-muted text-center mt-4">
        No performance promises. Market risk.
      </p>

      {status && (
        <div className="mt-3 text-xs text-crypto-muted break-words">
          {status}{" "}
          {txid && (
            <a
              className="text-crypto-cyan underline"
              href={`https://explorer.solana.com/tx/${txid}`}
              target="_blank"
              rel="noreferrer"
            >
              Ver en Explorer
            </a>
          )}
        </div>
      )}
    </Card>
  );
};

export default MintWidget;
