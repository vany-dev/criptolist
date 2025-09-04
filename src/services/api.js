import axios from "axios";

// Función para envolver llamadas a CoinGecko con proxy AllOrigins
export const fetchFromCoinGecko = async (endpoint, params = {}) => {
  // URL base de CoinGecko
  let url = `https://api.coingecko.com/api/v3/${endpoint}`;

  // Convertimos params a query string si existen
  if (Object.keys(params).length > 0) {
    const query = new URLSearchParams(params).toString();
    url += `?${query}`;
  }

  // Usar proxy AllOrigins para evitar CORS
  const proxyUrl = new URL("https://api.allorigins.win/get");
  proxyUrl.searchParams.set("url", url);

  const res = await axios.get(proxyUrl.toString());
  return JSON.parse(res.data.contents);
};
