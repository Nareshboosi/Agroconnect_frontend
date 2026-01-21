import { useEffect, useState } from "react";
import api from "../api/axios";
import { getRole } from "../auth/authService";
import { useNavigate } from "react-router-dom";

const MarketList = () => {
  const [markets, setMarkets] = useState([]);
  const [search, setSearch] = useState("");
  const role = getRole();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    const res = await api.get("/market-prices");
    setMarkets(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this price?")) return;
    await api.delete(`/market-prices/${id}`);
    fetchMarkets();
  };

  const handleEdit = (market) => {
   navigate("/add-market", { state: market });
};

 const filteredMarkets = markets.filter((m) => {
  const cropName = m.cropName?.toLowerCase() || "";
  const marketName = m.marketName?.toLowerCase() || "";

  return (
    cropName.includes(search.toLowerCase()) ||
    marketName.includes(search.toLowerCase())
  );
});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Market Prices</h2>

        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/admin/market/add")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Market Price
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search by crop name..."
        className="border p-2 w-full md:w-1/3 mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

     {/* DESKTOP TABLE */}
<div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
  <table className="w-full border-collapse">
    <thead className="bg-slate-700 text-white">
      <tr>
        <th className="p-3 text-left w-[30%]">Crop</th>
        <th className="p-3 text-left w-[30%]">Market</th>
        <th className="p-3 text-center w-[20%]">Price / Quintal</th>
        {role === "ADMIN" && (
          <th className="p-3 text-center w-[20%]">Actions</th>
        )}
      </tr>
    </thead>

    <tbody>
      {filteredMarkets.map((market) => (
        <tr key={market.id} className="border-b hover:bg-gray-50">
          <td className="p-3">{market.cropName}</td>
          <td className="p-3">{market.marketName}</td>
          <td className="p-3 text-center font-semibold text-green-700">
            ₹ {market.pricePerQuintal}
          </td>

          {role === "ADMIN" && (
            <td className="p-3">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => navigate(`/admin/market/edit/${market.id}`)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(market.id)}
                  className="bg-red-600 text-white px-4 py-1.5 rounded"
                >
                  Delete
                </button>
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* MOBILE VIEW */}
<div className="md:hidden space-y-4">
  {filteredMarkets.map((market) => (
    <div
      key={market.id}
      className="bg-white p-4 rounded-lg shadow border"
    >
      <p className="text-sm text-gray-500">Crop</p>
      <p className="font-semibold">{market.cropName}</p>

      <p className="text-sm text-gray-500 mt-2">Market</p>
      <p>{market.marketName}</p>

      <p className="text-sm text-gray-500 mt-2">Price</p>
      <p className="font-semibold text-green-700">
        ₹ {market.pricePerQuintal}
      </p>

      {role === "ADMIN" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/edit-market/${market.id}`)}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(market.id)}
            className="flex-1 bg-red-600 text-white py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ))}
</div>


    </div>
  );
};

export default MarketList;

