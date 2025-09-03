import { useEffect, useState } from "react";
import axios from "axios";

function CryptoTable() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      })
      .then((res) => setCryptos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-5xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        Top 10 Criptomonedas
      </h2>
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full border border-gray-200 text-center">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">Criptomoneda</th>
              <th className="p-3">Precio</th>
              <th className="p-3">24h</th>
              <th className="p-3">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cryptos.map((coin) => (
              <tr key={coin.id} className="odd:bg-gray-50 even:bg-white">
                <td className="p-3 flex items-center gap-2 justify-center">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CryptoTable;
