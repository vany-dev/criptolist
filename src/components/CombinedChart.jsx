import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTopCoinsQuery } from "../hooks/useTopCoinsQuery";
import { useCoinChartQuery } from "../hooks/useCoinChartQuery";

// 📌 Datos de respaldo (fallback)
const fallbackCoins = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "tether", symbol: "USDT", name: "Tether" },
];

const fallbackChartData = [
  { date: "Ago 28", bitcoin: 110000, ethereum: 4300, ripple: 2.8, tether: 1 },
  { date: "Ago 29", bitcoin: 112000, ethereum: 4400, ripple: 2.85, tether: 1 },
  { date: "Ago 30", bitcoin: 111500, ethereum: 4380, ripple: 2.82, tether: 1 },
  { date: "Ago 31", bitcoin: 113000, ethereum: 4450, ripple: 2.9, tether: 1 },
  { date: "Sep 1",  bitcoin: 114200, ethereum: 4500, ripple: 2.95, tether: 1 },
  { date: "Sep 2",  bitcoin: 113500, ethereum: 4470, ripple: 2.92, tether: 1 },
  { date: "Sep 3",  bitcoin: 115000, ethereum: 4520, ripple: 2.97, tether: 1 },
];

const CombinedChart = () => {
  const { data: topCoins, isLoading, error } = useTopCoinsQuery();

  // 🛡️ Blindaje para asegurar que siempre haya datos
  const coins = Array.isArray(topCoins) ? topCoins : topCoins?.data || fallbackCoins;
  const coinIds = coins.slice(0, 4).map((c) => c.id);

  // Hook para datos reales de gráfica
  const { data: chartData, isLoading: chartLoading } = useCoinChartQuery(coinIds);

  // Si no hay datos, usa fallback
  const safeChartData = chartData && chartData.length > 0 ? chartData : fallbackChartData;

  if (isLoading || chartLoading) return <p className="text-center mt-6">⏳ Cargando gráfica...</p>;
  if (error) console.warn("⚠️ Error en API, usando datos de fallback...");

  // Función para obtener color del punto según tendencia
  const getDotColor = (coin, index) => {
    if (index === 0) return "#16a34a"; // primer punto verde
    return safeChartData[index][coin] >= safeChartData[index - 1][coin] ? "#16a34a" : "#dc2626";
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-bold mb-1">Fecha: {label}</p>
          {payload.map((p) => {
            const coinData = coins.find((c) => c.id === p.dataKey) || {};
            const today = p.value;
            const index = safeChartData.findIndex((d) => d.date === label);
            const prev = index > 0 ? safeChartData[index - 1][p.dataKey] : today;
            const change = today - prev;
            return (
              <p
                key={p.dataKey}
                className="font-semibold"
                style={{ color: change >= 0 ? "#16a34a" : "#dc2626" }}
              >
                {coinData?.symbol?.toUpperCase() || p.dataKey}: ${today.toFixed(2)} (
                {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(2)})
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
        <LineChart data={safeChartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {coinIds.map((coin) => (
            <Line
              key={coin}
              type="monotone"
              dataKey={coin}
              stroke="#7c3aed"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, index } = props;
                const color = getDotColor(coin, index);
                return (
                  <circle
                    key={`${coin}-${index}`}
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                );
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
