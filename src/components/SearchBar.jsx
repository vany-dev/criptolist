import { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!query.trim()) {
      setError("Por favor escribe el nombre de una criptomoneda.");
      return;
    }

    try {
      // 1. Buscar por nombre
      const searchRes = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      if (searchRes.data.coins.length === 0) {
        setError("No se encontró esa criptomoneda.");
        return;
      }

      // 2. Tomar el primer resultado
      const coinId = searchRes.data.coins[0].id;

      // 3. Obtener datos completos
      const coinRes = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      setResult({
        name: coinRes.data.name,
        symbol: coinRes.data.symbol,
        image: coinRes.data.image.small,
        price: coinRes.data.market_data.current_price.usd,
        change: coinRes.data.market_data.price_change_percentage_24h,
        marketCap: coinRes.data.market_data.market_cap.usd,
      });
    } catch (err) {
      console.error(err);
      setError("Error al buscar la criptomoneda.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto mt-10 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md text-center">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-72 p-2 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Buscar Criptomoneda"
        />
        <button
          id="bt-buscar"
          className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Errores */}
      {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* Resultado */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl shadow-md flex flex-col items-center">
          <img src={result.image} alt={result.name} className="w-12 h-12 mb-2" />
          <h2 className="font-bold text-lg">
            {result.name} ({result.symbol.toUpperCase()})
          </h2>
          <p className="text-xl">${result.price.toLocaleString()}</p>
          <p
            className={
              result.change >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
            }
          >
            {result.change.toFixed(2)}% (24h)
          </p>
          <span className="text-gray-700">
            Market Cap: ${result.marketCap.toLocaleString()}
          </span>
        </div>
      )}
    </section>
  );
}

export default SearchBar;
