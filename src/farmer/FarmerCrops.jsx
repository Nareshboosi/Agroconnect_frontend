import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const FarmerCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await api.get("/crops/my-crops");
      setCrops(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch crops", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await api.delete(`/crops/${id}`);
      fetchCrops();
    } catch {
      alert("Failed to delete crop");
    }
  };

  /* ================= FILTER ================= */

  const filteredCrops = crops.filter(crop =>
    crop.cropName.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            🌾 My Crops
          </h1>
          <p className="text-sm text-gray-500">
            Manage your listed crops and stock
          </p>
        </div>

        <button
          onClick={() => navigate("/crops/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          + Add Crop
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by crop name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">
          Loading crops...
        </p>
      ) : filteredCrops.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No crops found</p>
          <p className="text-sm mt-1">
            Try adding a new crop or adjust your search
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Crop</th>
                <th className="px-4 py-3 text-center">Type</th>
                <th className="px-4 py-3 text-center">Available Qty</th>
                <th className="px-4 py-3 text-center">Price (₹)</th>
                <th className="px-4 py-3 text-center">Season</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCrops.map((crop) => (
                <tr
                  key={crop.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {crop.cropName}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">
                    {crop.cropType || "-"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        crop.availableQuantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {crop.availableQuantity} kg
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center font-medium">
                    ₹{crop.price}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">
                    {crop.season}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/farmer/edit-crop/${crop.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(crop.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default FarmerCrops;
