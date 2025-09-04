import { useQuery } from "@tanstack/react-query";
import { fetchFromCoinGecko } from "../services/api";

/**
 * Obtiene datos de precios de los últimos 7 días para varias monedas.
 * Devuelve un array con 7 puntos (1 por día) listo para Recharts.
 * @param {string[]} coinIds - IDs de las monedas
 */
export const useCoinChartQuery = (coinIds) => {
  return useQuery({
    queryKey: ["chartData", coinIds],
    queryFn: async () => {
      if (!coinIds || coinIds.length === 0) return [];

      // Obtener datos de sparkline de varias monedas en una sola llamada
      const data = await fetchFromCoinGecko("coins/markets", {
        vs_currency: "usd",
        ids: coinIds.join(","),
        sparkline: true,
      });

      const numPoints = data[0]?.sparkline_in_7d?.price.length || 0;
      if (numPoints === 0) return [];

      const now = Date.now();
      const oneDayMs = 1000 * 60 * 60 * 24;
      const startTime = now - 7 * oneDayMs;

      const pointsPerDay = Math.floor(numPoints / 7); // cuántos puntos corresponden a 1 día
      const chartData = [];

      for (let i = 0; i < 7; i++) {
        const idx = i * pointsPerDay; // tomar un punto representativo por día
        const timestamp = startTime + i * oneDayMs;

        const point = {
          date: new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        };

        data.forEach((coin) => {
          point[coin.id] = coin.sparkline_in_7d.price[idx];
        });

        chartData.push(point);
      }

      return chartData;
    },
    enabled: coinIds.length > 0,
    refetchInterval: 35000,
  });
};
