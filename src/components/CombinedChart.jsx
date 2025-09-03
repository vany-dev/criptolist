/* eslint-disable no-unused-vars */
import { useTopCoinsQuery } from "../hooks/useTopCoinsQuery";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CombinedChart() {
  const { data: topCoins, isLoading, error } = useTopCoinsQuery();

  const coinIds = topCoins?.slice(0, 4).map((c) => c.id) || [];
  const { data: chartData } = useQuery({
    queryKey: ["chart", coinIds],
    queryFn: async () => {
      const results = await Promise.all(
        coinIds.map(async (coin) => {
          const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
            params: { vs_currency: "usd", days: 7 },
          });
          return res.data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            [coin]: price,
          }));
        })
      );

      return results[0].map((_, idx) => ({
        date: results[0][idx].date,
        ...results.reduce((acc, r, i) => ({ ...acc, [coinIds[i]]: r[idx][coinIds[i]] }), {}),
      }));
    },
    enabled: coinIds.length > 0,
    refetchInterval: 35000,
  });

  // eslint-disable-next-line no-unused-vars
  const colors = ["#16a34a", "#dc2626", "#3b82f6", "#f59e0b"];

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando gráfico combinado...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar gráfico</p>;

  return (
    <section className="max-w-5xl mx-auto mt-12 p-4 bg-gray-100/35 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Tendencia últimas 7 días (Top 4)</h2>
      {chartData && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            {coinIds.map((coin, i) => (
              <Line
                key={coin}
                type="monotone"
                dataKey={coin}
                stroke={
                  topCoins.find(c => c.id === coin).price_change_percentage_24h >= 0
                    ? "#16a34a"
                    : "#dc2626"
                }
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default CombinedChart;
