// src/hooks/usePhantomWallet.ts (añade el useEffect de auto-detección)
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "@/lib/solana";

type Provider = {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAndSendTransaction?: (tx: Transaction) => Promise<{ signature: string }>;
  // eventos opcionales
  on?: (event: "connect" | "disconnect", handler: (...args: any[]) => void) => void;
  publicKey?: PublicKey | null;
};

function getProvider(): Provider | null {
  // @ts-expect-error window.phantom injected
  const p = window?.phantom?.solana;
  return p?.isPhantom ? (p as Provider) : null;
}

export function usePhantomWallet() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [pubkey, setPubkey] = useState<PublicKey | null>(null);
  const connected = useMemo(() => !!pubkey, [pubkey]);
  const inFlight = useRef(false);

  // ⬇️ auto-detecta conexión existente y escucha eventos
  useEffect(() => {
    const prov = getProvider();
    if (!prov) return;
    setProvider(prov);
    if (prov.publicKey) setPubkey(prov.publicKey);
    prov.on?.("connect", (pk: PublicKey) => setPubkey(pk));
    prov.on?.("disconnect", () => setPubkey(null));
  }, []);

  const connect = useCallback(async () => {
    const prov = getProvider();
    if (!prov) throw new Error("Phantom no detectado. Instálalo y ponlo en Devnet.");
    const { publicKey } = await prov.connect();
    setProvider(prov);
    setPubkey(publicKey);
    return publicKey.toString();
  }, []);

  const paySOL = useCallback(
    async (to: string, amountSol: number) => {
      if (!provider || !pubkey) throw new Error("Conecta tu wallet primero.");
      if (inFlight.current) throw new Error("Transacción en curso, intenta de nuevo en un momento.");
      inFlight.current = true;

      try {
        const toPubkey = new PublicKey(to);
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: pubkey,
            toPubkey,
            lamports: Math.round(amountSol * LAMPORTS_PER_SOL),
          })
        );
        tx.feePayer = pubkey;
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");
        tx.recentBlockhash = blockhash;

        if (provider.signAndSendTransaction) {
          const { signature } = await provider.signAndSendTransaction(tx);
          await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
          return signature;
        }
        const signed = await provider.signTransaction(tx);
        const signature = await connection.sendRawTransaction(signed.serialize(), { skipPreflight: false });
        await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
        return signature;
      } finally {
        inFlight.current = false;
      }
    },
    [provider, pubkey]
  );

  return { connect, paySOL, pubkey, connected };
}
