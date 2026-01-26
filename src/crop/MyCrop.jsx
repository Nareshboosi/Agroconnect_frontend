import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const MyCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    const res = await api.get("/crops/my-crops");
    setCrops(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this crop?")) return;
    await api.delete(`/crops/${id}`);
    fetchCrops();
  };

  const filtered = crops.filter((c) =>
    c.cropName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">My Crops</h2>
        <button
          onClick={() => navigate("/crops/add")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Crop
        </button>
      </div>

      <input
        placeholder="Search crop..."
        className="border p-2 rounded mb-4 w-full sm:w-1/2 md:w-1/3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Season</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b text-center hover:bg-gray-50">
                <td className="p-2">{c.cropName}</td>
                <td className="p-2">{c.cropType}</td>
                <td className="p-2">{c.quantity}</td>
                <td className="p-2">₹ {c.price}</td>
                <td className="p-2">{c.season}</td>
                <td className="p-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => navigate(`/edit-crop/${c.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
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
    </div>
  );
};

export default MyCrops;
