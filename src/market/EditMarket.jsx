import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditMarket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);
  const [cropId, setCropId] = useState("");
  const [marketName, setMarketName] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cropRes, marketRes] = await Promise.all([
        api.get("/crops/all"),
        api.get(`/market-prices/${id}`)
      ]);

      setCrops(cropRes.data);

      const market = marketRes.data;

      // 🔥 IMPORTANT: convert to string for dropdown matching
      setCropId(String(market.crop.id));
      setMarketName(market.marketName);
      setPrice(market.pricePerQuintal);
      console.log("MARKET API RESPONSE 👉", marketRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load market data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/market-prices/${id}`, {
        cropId,
        marketName,
        pricePerQuintal: price
      });

      alert("✅ Market price updated successfully");
      navigate("/market");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update market price");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg font-semibold text-gray-600">
          Loading market details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Market Price
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Crop Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop
            </label>
            <select
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop</option>
              {crops.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.cropName}
                </option>
              ))}
            </select>
          </div>

          {/* Market Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Market Name
            </label>
            <input
              type="text"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
              placeholder="Enter market name"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Quintal (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate("/market")}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMarket;

