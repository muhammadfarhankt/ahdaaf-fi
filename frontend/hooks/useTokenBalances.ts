"use client";

import { useState, useEffect, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20";
import { client } from "@/lib/thirdwebClient";
import { bnbTestnet, TOKENS, type TokenSymbol } from "@/lib/tokens";

export interface TokenBalance {
  symbol: TokenSymbol;
  name: string;
  balance: string;
  rawBalance: bigint;
  decimals: number;
  logo: string;
}

export function useTokenBalances() {
  const account = useActiveAccount();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!account?.address) {
      setBalances([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tokenBalances: TokenBalance[] = [];

      // Fetch BUSN token balance
      const busnContract = getContract({
        client,
        chain: bnbTestnet,
        address: TOKENS.BUSN.address,
      });

      const busnBalance = await balanceOf({
        contract: busnContract,
        address: account.address,
      });

      tokenBalances.push({
        symbol: "BUSN",
        name: TOKENS.BUSN.name,
        balance: formatBalance(busnBalance, TOKENS.BUSN.decimals),
        rawBalance: busnBalance,
        decimals: TOKENS.BUSN.decimals,
        logo: TOKENS.BUSN.logo,
      });

      setBalances(tokenBalances);
    } catch (err) {
      console.error("Error fetching token balances:", err);
      setError("Failed to fetch token balances");
    } finally {
      setIsLoading(false);
    }
  }, [account?.address]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { balances, isLoading, error, refetch: fetchBalances };
}

function formatBalance(value: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;

  // Format with up to 4 decimal places
  const fractionalStr = fractionalPart.toString().padStart(decimals, "0");
  const trimmedFractional = fractionalStr.slice(0, 4);

  if (trimmedFractional === "0000" || trimmedFractional === "") {
    return integerPart.toString();
  }

  // Remove trailing zeros
  const cleanFractional = trimmedFractional.replace(/0+$/, "");
  return cleanFractional
    ? `${integerPart}.${cleanFractional}`
    : integerPart.toString();
}
