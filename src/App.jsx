import Header from "./components/Header";
import CardList from "./components/CardList";
import SearchBar from "./components/SearchBar";
import CryptoTable from "./components/CryptoTable";
import CombinedChart from "./components/CombinedChart";

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <CardList />
        <SearchBar />
        <CryptoTable />
        <CombinedChart /> {/* 🚀 Gráfico combinado */}
      </main>
    </>
  );
}

export default App;
