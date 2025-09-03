function Header() {
  return (
    <header className="top-0 z-10 max-w-5xl mx-auto p-5 bg-gradient-to-r from-gray-600 to-purple-400 text-white flex flex-row items-center justify-between rounded-b-2xl shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">
        <span className="text-yellow-300">C</span>ripto
        <span className="text-yellow-300">L</span>ist
      </h1>
      <h2 className="text-sm font-semibold">
        by <span className="text-yellow-300">Vany-dev</span>
      </h2>
    </header>
  );
}

export default Header;
