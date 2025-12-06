import { defineChain } from "thirdweb";

// BNB Chain Testnet
export const bnbTestnet = defineChain(97);

// Test token on BNB Chain Testnet
export const TOKENS = {
  BUSN: {
    address: "0x0000000000000000000000000000000000000000" as const,
    symbol: "BUSN",
    decimals: 18,
    name: "BUSN Test Token",
    logo: "🧪",
  },
} as const;

export type TokenSymbol = keyof typeof TOKENS;
