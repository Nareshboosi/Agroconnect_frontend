import { useEffect, useState } from "react";
import axios from "axios";

const CropStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/crops/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return <p className="text-gray-500">Loading crop statistics...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">🌾 Total Crops</h3>
        <p className="text-2xl font-bold">{stats.totalCrops}</p>
      </div>

      <div className="bg-blue-100 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">📦 Total Quantity</h3>
        <p className="text-2xl font-bold">{stats.totalQuantity}</p>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">💰 Estimated Value</h3>
        <p className="text-2xl font-bold">₹ {stats.totalValue}</p>
      </div>
    </div>
  );
};

export default CropStats;
