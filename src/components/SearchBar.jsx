import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CryptoSearch() {
  const [query, setQuery] = useState(""); // lo que escribe el usuario
  const [search, setSearch] = useState(""); // lo que se busca al dar click

  // función para traer datos de la cripto
  const fetchCoin = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          ids: search.toLowerCase(), // CoinGecko requiere el id en minúsculas
        },
      }
    );
    return res.data;
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["coin", search],
    queryFn: fetchCoin,
    enabled: !!search, // 🚀 solo ejecuta si hay búsqueda
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query.trim()); // activa la búsqueda
  };

  return (
    <section className="max-w-5xl mx-auto p-6 mt-10 bg-gray-100/35 rounded-2xl shadow-md">
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar criptomoneda (ej: bitcoin, ethereum)"
          className="p-2 w-64 bg-white border-2 border-purple-400 rounded-2xl"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-2xl hover:bg-purple-700 transition"
        >
          Buscar
        </button>
      </form>

      {/* Estado de carga */}
      {isFetching && <p className="text-center">⏳ Buscando...</p>}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">
          ❌ Ocurrió un error en la búsqueda
        </p>
      )}

      {/* Resultado */}
      {data && data.length > 0 && (
        <div className="flex justify-center">
          <div className="w-64 p-4 bg-white rounded-2xl shadow-md text-center">
            <img
              src={data[0].image}
              alt={data[0].name}
              className="w-12 h-12 mx-auto mb-2"
            />
            <h2 className="text-lg font-bold">
              {data[0].name} ({data[0].symbol.toUpperCase()})
            </h2>
            <p className="text-gray-700 text-lg">
              💲 {data[0].current_price.toLocaleString()}
            </p>
            <span
              className={`block mt-2 font-semibold ${
                data[0].price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data[0].price_change_percentage_24h.toFixed(2)}% (24h)
            </span>
          </div>
        </div>
      )}

      {/* Si no encuentra nada */}
      {data && data.length === 0 && (
        <p className="text-center text-gray-500">
          ⚠️ No se encontró la criptomoneda "{search}"
        </p>
      )}
    </section>
  );
}

export default CryptoSearch;
