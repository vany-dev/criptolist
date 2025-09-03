import Header from "./components/Header";
import CardList from "./components/CardList";
import SearchBar from "./components/SearchBar";
import CryptoTable from "./components/CryptoTable";

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <CardList />
        <SearchBar />
        <CryptoTable />
      </main>
    </>
  );
}

export default App;
