// src/lib/solana.ts
import { Connection, clusterApiUrl } from "@solana/web3.js";

export const SOLANA_CLUSTER = "devnet";
export const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER), "confirmed");
