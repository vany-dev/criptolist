import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTopCoinsQuery } from "../hooks/useTopCoinsQuery";
import { useCoinChartQuery } from "../hooks/useCoinChartQuery";

const CombinedChart = () => {
  const { data: topCoins, isLoading, error } = useTopCoinsQuery();
  const coinIds = topCoins?.slice(0, 4).map((c) => c.id) || [];

  const { data: chartData, isLoading: chartLoading } = useCoinChartQuery(coinIds);

  if (isLoading || chartLoading) return <p className="text-center mt-6">⏳ Cargando gráfica...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar datos</p>;
  if (!chartData || chartData.length === 0) return <p className="text-center text-gray-500">No hay datos para graficar</p>;

  // Función para obtener color del punto según tendencia
  const getDotColor = (coin, index) => {
    if (index === 0) return "#16a34a"; // primer punto verde
    return chartData[index][coin] >= chartData[index - 1][coin] ? "#16a34a" : "#dc2626";
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-bold mb-1">Fecha: {label}</p>
          {payload.map((p) => {
            const coinData = topCoins.find(c => c.id === p.dataKey);
            const today = p.value;
            const index = chartData.findIndex(d => d.date === label);
            const prev = index > 0 ? chartData[index - 1][p.dataKey] : today;
            const change = today - prev;
            return (
              <p key={p.dataKey} className="font-semibold" style={{ color: change >= 0 ? "#16a34a" : "#dc2626" }}>
                {coinData.symbol.toUpperCase()}: ${today.toFixed(2)} ({change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(2)})
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Evolución últimos 7 días (Top 4)</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {coinIds.map((coin) => (
            <Line
              key={coin}
              type="monotone"
              dataKey={coin}
              stroke="#7c3aed"      // línea base en morado
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, index } = props;
                const color = getDotColor(coin, index);
                // ⚡ Agregamos key único para cada punto
                return <circle key={`${coin}-${index}`} cx={cx} cy={cy} r={4} fill={color} stroke="#fff" strokeWidth={1} />;
              }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CombinedChart;
