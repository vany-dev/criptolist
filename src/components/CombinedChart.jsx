import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const coins = ["bitcoin", "ethereum", "binancecoin", "cardano"];
const colors = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"]; // colores por moneda

function CombinedChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["combinedChart"],
    queryFn: async () => {
      // Traemos precios de 7 días de cada coin
      const results = await Promise.all(
        coins.map(async (coin) => {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
            { params: { vs_currency: "usd", days: 7 } }
          );
          return res.data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            [coin]: price,
          }));
        })
      );

      // Combinar los datos: asumimos mismo número de puntos y mismo timestamp
      return results[0].map((_, index) => ({
        date: results[0][index].date,
        bitcoin: results[0][index].bitcoin,
        ethereum: results[1][index].ethereum,
        binancecoin: results[2][index].binancecoin,
        cardano: results[3][index].cardano,
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando gráfico combinado...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar gráfico</p>;

  return (
    <section className="max-w-5xl mx-auto mt-12 p-4 bg-gray-100/35 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Tendencia últimas 7 días (Top 4)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          {coins.map((coin, i) => (
            <Line
              key={coin}
              type="monotone"
              dataKey={coin}
              stroke={colors[i]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default CombinedChart;
