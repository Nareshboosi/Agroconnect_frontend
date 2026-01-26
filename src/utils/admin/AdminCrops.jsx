import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get("/admin/crops");
      setCrops(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch crops", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCrop = async (id) => {
    if (!window.confirm("Delete this crop?")) return;
    try {
      await axios.delete(`/admin/crops/${id}`);
      fetchCrops();
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading crops…</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🌾 All Crops</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Crop</th>
              <th className="p-3 text-left">Farmer</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {crops.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No crops found
                </td>
              </tr>
            ) : (
              crops.map((crop) => (
                <tr
                  key={crop.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{crop.id}</td>
                  <td className="p-3 font-medium">{crop.cropName}</td>
                  <td className="p-3">{crop.farmer?.email || "-"}</td>
                  <td className="p-3 text-center">
                    {crop.availableQuantity} kg
                  </td>
                  <td className="p-3 text-right font-medium">
                    ₹{crop.price}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteCrop(crop.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCrops;
