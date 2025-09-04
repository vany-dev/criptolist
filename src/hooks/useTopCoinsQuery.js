import { useQuery } from "@tanstack/react-query";
import { fetchFromCoinGecko } from "../services/api";

export const useTopCoinsQuery = () => {
  return useQuery({
    queryKey: ["topCoins"],
    queryFn: () =>
      fetchFromCoinGecko("coins/markets", {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
      }),
    refetchInterval: 35000,
    staleTime: 30000,
  });
};
