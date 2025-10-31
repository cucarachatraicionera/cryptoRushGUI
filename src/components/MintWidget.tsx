import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";

// ======== CONFIGURA ESTO ========
const WALLET_B = "5msxv9UseB1hZUxx5XYAy2SFy3SyorKsT7MRAPj7Tezy";  // B recibe el SOL
const PRICE_SOL = 0.01;                       // precio en SOL por unidad (devnet)
const WEBHOOK_URL = "";                       // opcional: URL de Google Apps Script
// =================================

async function sendWebhook(payload: any) {
  if (!WEBHOOK_URL) return;
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

const MintWidget: React.FC = () => {
  const [isPresale, setIsPresale] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [txid, setTxid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Tu UI en USD (no afecta al cobro en SOL)
  const priceUSD = isPresale ? 500 : 650;
  const totalUSD = priceUSD * quantity;

  // Total a cobrar en SOL (devnet)
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
      if (!connected) { setStatus("Conecta tu wallet primero."); return; }
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

      // Aquí haces tu "magia": transfieres manualmente el NFT desde A al comprador.
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
          Presale ${priceUSD}
        </button>
        <button
          onClick={() => setIsPresale(false)}
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
        <p className="text-xs text-crypto-muted mt-1">Total a cobrar: {totalSOL} SOL (devnet)</p>
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
              href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
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
