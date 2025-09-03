import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTopCoinsQuery = () => {
  return useQuery({
    queryKey: ["topCoins"],
    queryFn: async () => {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      });
      return res.data;
    },
    refetchInterval: 35000, // se actualiza cada 35 segundos
    staleTime: 30000,       // evita refetch innecesario mientras los datos siguen siendo recientes
  });
};
