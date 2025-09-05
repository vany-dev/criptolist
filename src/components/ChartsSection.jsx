import { useTopCoinsQuery } from "../hooks/useTopCoinsQuery";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ChartsSection() {
  const { data, isLoading, error } = useTopCoinsQuery();

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando gráficos...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar gráficos</p>;

  // 🛡️ Blindaje: aseguramos que siempre sea un array
  const coins = Array.isArray(data) ? data : data?.data || [];

  if (!coins.length) {
    return <p className="text-center text-gray-500">⚠️ No hay datos para graficar</p>;
  }

  // Tomamos solo las 4 primeras
  const topCoins = coins.slice(0, 4);

  // Creamos datos falsos para los últimos 7 días (ejemplo)
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const day = `Día ${i + 1}`;
    const entry = { name: day };

    topCoins.forEach((coin) => {
      // 🛡️ Si no existe current_price, forzamos a 0
      const price = coin.current_price || 0;
      entry[coin.symbol.toUpperCase()] = price + Math.random() * 100 - 50; // variación simulada
    });

    return entry;
  });

  return (
    <section className="max-w-5xl mx-auto mt-12 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Evolución últimos 7 días (Top 4)
      </h2>
      <div className="w-full h-96 bg-white rounded-2xl shadow-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {topCoins.map((coin, index) => (
              <Line
                key={coin.id}
                type="monotone"
                dataKey={coin.symbol.toUpperCase()}
                strokeWidth={2}
                stroke={
                  ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"][index % 4]
                }
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ChartsSection;
