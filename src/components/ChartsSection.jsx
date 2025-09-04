import { useCoinChartQuery } from "../hooks/useCoinChartQuery";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const coins = ["bitcoin", "ethereum", "binancecoin", "cardano"];

function ChartsSection() {
  const { data, isLoading, error } = useCoinChartQuery(coins);

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando gráficos...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar gráficos</p>;

  return (
    <section className="max-w-5xl mx-auto mt-12 p-4 bg-gray-100/35 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Tendencia últimos 7 días</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coins.map((coinId) => (
          <div key={coinId} className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold mb-2">
              {coinId.charAt(0).toUpperCase() + coinId.slice(1)}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line 
                  type="monotone" 
                  dataKey={coinId} 
                  stroke="#7c3aed" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChartsSection;