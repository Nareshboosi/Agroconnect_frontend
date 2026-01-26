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
  const filteredCrops = crops.filter((crop) =>
    crop.cropName.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow">
            <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
            <div className="h-10 w-full bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          className="bg-green-600 hover:bg-green-700
                     text-white px-5 py-2 rounded-lg transition"
        >
          + Add Crop
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by crop name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/3 border rounded-lg px-4 py-2
                   focus:ring-2 focus:ring-green-500 outline-none"
      />

      {/* CONTENT */}
      {filteredCrops.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No crops found
        </p>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    Crop
                  </th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">
                    Type
                  </th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">
                    Price
                  </th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">
                    Season
                  </th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCrops.map((crop) => (
                  <tr
                    key={crop.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {crop.cropName}
                    </td>

                    <td className="px-4 py-3 text-center text-gray-600">
                      {crop.cropType || "-"}
                    </td>

                    <td className="px-4 py-3 text-center">
                       <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            crop.availableQuantity > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      > 
                        {crop.availableQuantity}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center font-medium">
                      ₹{crop.price}
                    </td>

                    <td className="px-4 py-3 text-center text-gray-600">
                      {crop.season}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            navigate(`/farmer/edit-crop/${crop.id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700
                                     text-white px-3 py-1 rounded text-xs"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(crop.id)}
                          className="bg-red-600 hover:bg-red-700
                                     text-white px-3 py-1 rounded text-xs"
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

          {/* MOBILE HINT */}
          <div className="sm:hidden text-xs text-gray-400 px-4 py-3 border-t">
            ⬅️ Swipe horizontally to view full table
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerCrops;
