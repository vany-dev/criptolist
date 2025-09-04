import { useTopCoinsQuery } from "../hooks/useTopCoinsQuery";

function CardList() {
  const { data, isLoading, error } = useTopCoinsQuery();

  if (isLoading) return <p className="text-center mt-6">⏳ Cargando criptos...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar criptos</p>;

  const top4 = data.slice(0, 4);

  return (
    <section className="max-w-5xl mx-auto p-4 bg-gray-50 text-gray-900 rounded-2xl shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">Criptomonedas</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {top4.map((coin) => (
          <div
            key={coin.id}
            className={`w-40 p-4 bg-white flex flex-col items-center justify-evenly rounded-2xl shadow-md
                        transform transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <img src={coin.image} alt={coin.name} className="w-10 h-10 mb-2" />
            <h2 className="font-bold">{coin.symbol.toUpperCase()}</h2>
            <p
              className={`text-lg font-bold transition-colors duration-500 ${
                coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${coin.current_price.toLocaleString()}
            </p>
            <span
              className={`font-semibold transition-colors duration-500 ${
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
