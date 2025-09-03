function CardList() {
  const coins = [
    { id: 1, name: "BTC", price: "$43,299", change: "+2.3%" },
    { id: 2, name: "ETH", price: "$3,299", change: "+1.3%" },
    { id: 3, name: "BNB", price: "$499", change: "+0.3%" },
    { id: 4, name: "ADA", price: "$2.30", change: "+5.3%" },
  ];

  return (
    <section className="max-w-5xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Criptomonedas</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="w-full p-4 bg-white/80 backdrop-blur-md text-gray-900 flex flex-col items-center rounded-2xl shadow-md hover:scale-105 transition-transform"
          >
            <h2 className="font-bold">{coin.name}</h2>
            <p className="text-lg">{coin.price}</p>
            <span className="text-green-600">{coin.change}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardList;
