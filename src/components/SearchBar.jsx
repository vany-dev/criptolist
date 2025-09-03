function SearchBar() {
  return (
    <section className="max-w-5xl mx-auto mt-10 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md text-center">
      <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="text"
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
    </section>
  );
}

export default SearchBar;
