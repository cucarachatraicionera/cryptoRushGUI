// src/hooks/usePhantomWallet.ts
import { useCallback, useMemo, useState } from "react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "@/lib/solana";

type Provider = {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
};
function getProvider(): Provider | null {
  // @ts-expect-error window phantom
  const p = window?.phantom?.solana;
  return p?.isPhantom ? (p as Provider) : null;
}

export function usePhantomWallet() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [pubkey, setPubkey] = useState<PublicKey | null>(null);
  const connected = useMemo(() => !!pubkey, [pubkey]);

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

      const signed = await provider.signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
      return sig;
    },
    [provider, pubkey]
  );

  return { connect, paySOL, pubkey, connected };
}
