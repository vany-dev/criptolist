# CriptoList

**CriptoList** es una aplicación web que permite visualizar información en tiempo real de las principales criptomonedas, incluyendo sus precios actuales, cambios en 24 horas y evolución histórica de los últimos 7 días.

---

## 📌 Características

* Visualización de **Top 10 criptomonedas** en tabla.
* Tarjetas con las **Top 4 criptomonedas** más importantes.
* **Búsqueda de cualquier criptomoneda** por nombre, símbolo o id.
* Gráficas de líneas con la **evolución de los últimos 7 días** del top 4.
* Indicadores de **tendencia** con colores verde/rojo según suba o baje el precio.
* Actualización automática de datos cada 30-35 segundos.
* Diseño responsive con **TailwindCSS**.

---

## 🛠 Tecnologías utilizadas

* **React 18** – Biblioteca principal de la interfaz.
* **React Query** – Para manejo eficiente de peticiones y caching.
* **Axios** – Para realizar solicitudes HTTP.
* **Recharts** – Librería de gráficas para mostrar evolución de precios.
* **TailwindCSS** – Para diseño rápido y responsivo.
* **AllOrigins** – Proxy para evitar errores CORS al consumir la API de CoinGecko.
* **CoinGecko API** – Fuente de datos de criptomonedas.

---

## 💻 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/criptolist.git
cd criptolist
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre la app en tu navegador en `http://localhost:5173`.

---

## 📂 Estructura del proyecto

```
src/
│
├─ components/
│  ├─ Header.jsx
│  ├─ CardList.jsx
│  ├─ SearchBar.jsx
│  ├─ CryptoTable.jsx
│  ├─ CombinedChart.jsx
│
├─ hooks/
│  ├─ useTopCoinsQuery.js
│  ├─ useSearchCoinQuery.js
│  ├─ useCoinChartQuery.js
│
├─ services/
│  └─ api.js
│
├─ App.jsx
└─ index.jsx
```

---

## 🔗 Uso de la API

La app consume la **API de CoinGecko** para obtener información sobre:

* Listado de criptomonedas.
* Datos de mercado (precio, market cap, cambio 24h).
* Precios históricos para graficar la evolución de los últimos 7 días.

Para evitar problemas de **CORS**, todas las llamadas pasan por **AllOrigins**.

---

## 🎨 Diseño

* Uso de **TailwindCSS** para estilo rápido y moderno.
* Indicadores de tendencia en verde/rojo en tarjetas, tabla y gráficos.
* Diseño responsive para desktop y móvil.

---

## 🚀 Funcionalidad destacada

* Tooltip personalizado en gráficos mostrando:

  * Precio actual.
  * Cambio respecto al día anterior.
  * Flechas ↑↓ según suba o baje.

* Colores dinámicos en la gráfica para cada punto según tendencia diaria.

---

## 📄 Licencia

MIT License
