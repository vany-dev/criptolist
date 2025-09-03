import { useEffect, useState } from "react";
import axios from "axios";

function CardList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 4, // solo mostramos 4 en las cards
          page: 1,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-5xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Criptomonedas</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="w-full p-4 bg-white/80 backdrop-blur-md text-gray-900 flex flex-col items-center rounded-2xl shadow-md hover:scale-105 transition-transform"
          >
            <img src={coin.image} alt={coin.name} className="w-10 h-10 mb-2" />
            <h2 className="font-bold">{coin.symbol.toUpperCase()}</h2>
            <p className="text-lg">${coin.current_price.toLocaleString()}</p>
            <span
              className={
                coin.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
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
