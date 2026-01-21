import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const EditFarmerCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cropName: "",
    cropType: "",
    availableQuantity: "",
    price: "",
    season: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH FARMER CROP ================= */

  useEffect(() => {
    api
      .get(`/crops/my-crops/${id}`)   // 🔥 FARMER SAFE ENDPOINT
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert("Failed to load crop");
        navigate("/farmer/crops");
      });
  }, [id, navigate]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/crops/my-crops/${id}`, form);
      alert("✅ Crop updated successfully");
      navigate("/farmer/crops");
    } catch {
      alert("❌ Update failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading crop...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
        🌾 Edit Crop
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="cropName"
          value={form.cropName}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Crop Name"
          required
        />

        <input
          name="cropType"
          value={form.cropType}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Crop Type"
        />

        <input
          type="number"
          name="availableQuantity"
          value={form.availableQuantity}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Available Quantity (kg)"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Price per kg"
          required
        />

        <input
          name="season"
          value={form.season}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Season"
        />

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-semibold transition"
        >
          Update Crop
        </button>
      </form>
    </div>
  );
};

export default EditFarmerCrop;
