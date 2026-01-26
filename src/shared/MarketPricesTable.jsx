import { useEffect, useState, useMemo } from "react";
import api from "../utils/api";

const MarketPricesTable = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/market-prices")
      .then((res) => setPrices(res.data))
      .catch(() => alert("Failed to load market prices"))
      .finally(() => setLoading(false));
  }, []);

  /* =======================
     FILTER LOGIC
  ======================= */
  const filteredPrices = useMemo(() => {
    if (!search.trim()) return prices;

    const q = search.toLowerCase();

    return prices.filter(
      (p) =>
        p.cropName?.toLowerCase().includes(q) ||
        p.marketName?.toLowerCase().includes(q)
    );
  }, [search, prices]);

  /* =======================
     LOADING STATE
  ======================= */
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-5 w-48 bg-gray-200 rounded mb-3" />
        <div className="h-3 w-64 bg-gray-200 rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-full bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  /* =======================
     MAIN UI
  ======================= */
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* HEADER */}
      <div className="px-4 sm:px-6 py-4 border-b space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            📊 Today’s Market Prices
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Reference prices to help with buying & selling decisions
          </p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by crop or market..."
          className="w-full sm:max-w-sm border rounded-lg px-3 py-2 text-sm
                     focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Crop
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Market
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Price / Quintal
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPrices.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-500"
                >
                  No matching results
                </td>
              </tr>
            ) : (
              filteredPrices.map((price) => (
                <tr
                  key={price.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {price.cropName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {price.marketName}
                  </td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹ {price.pricePerQuintal}
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {price.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE HINT */}
      <div className="sm:hidden text-xs text-gray-400 px-4 py-3 border-t">
        ⬅️ Swipe horizontally to view full table
      </div>
    </div>
  );
};

export default MarketPricesTable;
