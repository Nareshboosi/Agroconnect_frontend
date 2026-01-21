import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await api.get("/admin/crops", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCrops(res.data || []);
      } catch (err) {
        console.error("Failed to load crops", err);
      }
    };

    fetchCrops();
  }, []);

  // 🔍 Search filter (safe)
  const filteredCrops = crops.filter((c) => {
    const name = c?.cropName?.toLowerCase() || "";
    const category = c?.cropType?.toLowerCase() || "";
    return (
      name.includes(search.toLowerCase()) ||
      category.includes(search.toLowerCase())
    );
  });

  // 🧠 Button handlers
  const handleEdit = (id) => {
    navigate(`/admin/crops/edit/${id}`);
  };

const handleView = (id) => {
  navigate(`/admin/crops/view/${id}`);
};

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await api.delete(`/crops/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCrops(crops.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🌾 All Crops</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by crop name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm
                   focus:ring-2 focus:ring-purple-500"
      />

      {/* 📋 Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price (₹)</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCrops.length > 0 ? (
              filteredCrops.map((c, index) => (
                <tr
                  key={c.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-purple-50`}
                >
                  <td className="p-3">{c.id}</td>
                  <td className="p-3 capitalize">{c.cropName}</td>
                  <td className="p-3">{c.cropType}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ₹{c.price}
                  </td>
                  <td className="p-3">{c.availableQuantity}</td>

                  {/* 🔘 Buttons */}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleView(c.id)}
                      className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(c.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No crops found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropList;
