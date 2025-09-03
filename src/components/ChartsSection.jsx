import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const coins = ["bitcoin", "ethereum", "binancecoin", "cardano"];

function ChartsSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      // Traemos los precios de los últimos 7 días para cada coin
      const results = await Promise.all(
        coins.map(async (coin) => {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
            { params: { vs_currency: "usd", days: 7 } }
          );
          // Convertimos en {date, price}
          return {
            id: coin,
            data: res.data.prices.map(([timestamp, price]) => ({
              date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              price,
            })),
          };
        })
      );
      return results;
    },
    refetchInterval: 30000,
  });

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando gráficos...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar gráficos</p>;

  return (
    <section className="max-w-5xl mx-auto mt-12 p-4 bg-gray-100/35 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Tendencia últimos 7 días</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((coin) => (
          <div key={coin.id} className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold mb-2">{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={coin.data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line type="monotone" dataKey="price" stroke="#7c3aed" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChartsSection;
