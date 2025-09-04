import { useQuery } from "@tanstack/react-query";
import { fetchFromCoinGecko } from "../services/api";

export const useSearchCoinQuery = (query) => {
  return useQuery({
    queryKey: ["searchCoin", query],
    queryFn: async () => {
      if (!query) return [];

      // Traemos solo monedas que coincidan con el query usando 'coins/list'
      const allCoins = await fetchFromCoinGecko("coins/list");
      return allCoins.filter(
        (c) =>
          c.id.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase()) ||
          c.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    enabled: !!query,
  });
};
