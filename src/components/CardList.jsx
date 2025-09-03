import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CardList() {
  const fetchTopCoins = async () => {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,binancecoin,cardano",
      },
    });
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchTopCoins,
    refetchInterval: 30000,
  });

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando criptos...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar criptos</p>;

  return (
    <section className="max-w-5xl mx-auto p-4 bg-gray-100/35 text-gray-900 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">Criptomonedas</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((coin) => (
          <div
            key={coin.id}
            className="w-32 p-4 bg-white text-gray-900 flex flex-col items-center justify-evenly rounded-2xl shadow-md"
          >
            <img src={coin.image} alt={coin.name} className="w-8 h-8 mb-2" />
            <h2 className="font-bold">{coin.symbol.toUpperCase()}</h2>
            <p>${coin.current_price.toLocaleString()}</p>
            <span
              className={`font-semibold ${
                coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardList;
