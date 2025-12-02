// src/lib/solana.ts
import { Connection } from "@solana/web3.js";

// La red de Solana que usará todo el proyecto
export const SOLANA_CLUSTER = "mainnet-beta";

// Conexión a tu RPC dedicado de Helius
export const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=b739be59-fbf8-48e7-b4ee-2d9f3dcefd8b",
  "confirmed"
);
