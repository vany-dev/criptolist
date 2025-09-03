function CryptoTable() {
  const cryptos = [
    { name: "Bitcoin (BTC)", price: "$43,299", change: "+2.3%", cap: "$813.4B" },
    { name: "Ethereum (ETH)", price: "$3,299", change: "+1.3%", cap: "$381.2B" },
    { name: "Binance Coin (BNB)", price: "$499", change: "+0.3%", cap: "$83.1B" },
    { name: "Cardano (ADA)", price: "$2.30", change: "+5.3%", cap: "$73.5B" },
    { name: "Solana (SOL)", price: "$150", change: "-1.2%", cap: "$45.3B" },
    { name: "XRP (XRP)", price: "$0.85", change: "+0.8%", cap: "$40.2B" },
    { name: "Polkadot (DOT)", price: "$30", change: "+3.1%", cap: "$35.6B" },
    { name: "Dogecoin (DOGE)", price: "$0.25", change: "-0.5%", cap: "$32.1B" },
    { name: "USD Coin (USDC)", price: "$1.00", change: "+0.0%", cap: "$28.4B" },
    { name: "Terra (LUNA)", price: "$85", change: "+4.2%", cap: "$25.7B" },
  ];

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
            {cryptos.map((coin, idx) => (
              <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                <td className="p-3">{coin.name}</td>
                <td>{coin.price}</td>
                <td
                  className={
                    coin.change.startsWith("-") ? "text-red-500" : "text-green-500"
                  }
                >
                  {coin.change}
                </td>
                <td>{coin.cap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CryptoTable;
