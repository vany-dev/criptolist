import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  // Traer la lista de todas las monedas para convertir symbol → id
  const { data: allCoins } = useQuery({
    queryKey: ["allCoins"],
    queryFn: async () => {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
      return res.data;
    },
  });

  // Obtener datos de la cripto
  const { data, isFetching, error } = useQuery({
    queryKey: ["coin", search],
    queryFn: async () => {
      if (!allCoins) return null;
      const coinObj =
        allCoins.find(
          (c) =>
            c.id.toLowerCase() === search.toLowerCase() ||
            c.symbol.toLowerCase() === search.toLowerCase() ||
            c.name.toLowerCase() === search.toLowerCase()
        ) || null;

      if (!coinObj) throw new Error("No se encontró la cripto");

      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinObj.id}`
      );
      return res.data;
    },
    enabled: !!search && !!allCoins, // solo activa si hay búsqueda y lista de monedas cargada
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query.trim());
  };

  return (
    <section className="max-w-5xl mx-auto p-6 mt-10 bg-gray-50 rounded-2xl shadow-md">
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar criptomoneda (ej: btc, doge, bitcoin)"
          className="p-2 w-64 bg-white border-2 border-purple-400 rounded-2xl"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-2xl hover:bg-purple-700 transition"
        >
          Buscar
        </button>
      </form>

      {isFetching && <p className="text-center">⏳ Buscando...</p>}
      {error && <p className="text-center text-red-500">❌ {error.message}</p>}

      {data && (
        <div className="flex justify-center">
          <div className="w-64 p-4 bg-white rounded-2xl shadow-md text-center">
            <img src={data.image.small} alt={data.name} className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-lg font-bold">
              {data.name} ({data.symbol.toUpperCase()})
            </h2>
            <p className="text-gray-700 text-lg">
              💲 {data.market_data.current_price.usd.toLocaleString()}
            </p>
            <span
              className={`block mt-2 font-semibold ${
                data.market_data.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchBar;
