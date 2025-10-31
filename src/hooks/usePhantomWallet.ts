// src/hooks/usePhantomWallet.ts
import { useCallback, useMemo, useRef, useState } from "react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "@/lib/solana";

type Provider = {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAndSendTransaction?: (tx: Transaction) => Promise<{ signature: string }>;
};

function getProvider(): Provider | null {
  // @ts-expect-error phantom is injected by the extension
  const p = window?.phantom?.solana;
  return p?.isPhantom ? (p as Provider) : null;
}

export function usePhantomWallet() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [pubkey, setPubkey] = useState<PublicKey | null>(null);
  const connected = useMemo(() => !!pubkey, [pubkey]);
  const inFlight = useRef(false);

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

        // Blockhash fresco en cada intento
        tx.feePayer = pubkey;
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");
        tx.recentBlockhash = blockhash;

        // Preferir signAndSendTransaction (evita doble envío)
        if (provider.signAndSendTransaction) {
          const { signature } = await provider.signAndSendTransaction(tx);
          await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
          return signature;
        }

        // Fallback: firmar y luego enviar manualmente
        const signed = await provider.signTransaction(tx);
        const signature = await connection.sendRawTransaction(signed.serialize(), { skipPreflight: false });
        await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
        return signature;
      } catch (e: any) {
        // Si el nodo dice "already processed", intenta tratarlo como éxito
        const msg = (e?.message || "").toLowerCase();
        const already = msg.includes("already been processed") || msg.includes("already processed");
        if (already && e?.signature) {
          const status = await connection.getSignatureStatus(e.signature);
          if (status?.value?.confirmationStatus) return e.signature;
        }
        // Logs (si la lib los expone)
        // @ts-ignore
        if (typeof e?.getLogs === "function") {
          try {
            // @ts-ignore
            const logs = await e.getLogs(connection);
            console.warn("TX logs:", logs);
          } catch {}
        }
        throw e;
      } finally {
        inFlight.current = false;
      }
    },
    [provider, pubkey]
  );

  return { connect, paySOL, pubkey, connected };
}
