import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // 👈 filename unchanged

const AddCrop = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cropName: "",
    cropType: "",
    quantity: "",
    price: "",
    season: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/crops/add", form);

      alert("✅ Crop added successfully");
      navigate("/my-crops");
    } catch (error) {
      console.error("Add crop error:", error);
      alert("❌ Failed to add crop");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          🌾 Add New Crop
        </h2>

        <input
          type="text"
          name="cropName"
          placeholder="Crop Name"
          value={form.cropName}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          type="text"
          name="cropType"
          placeholder="Crop Type (Grain / Vegetable)"
          value={form.cropType}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg / quintal)"
          value={form.quantity}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          type="number"
          name="price"
          placeholder="Expected Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          type="text"
          name="season"
          placeholder="Season (Rabi / Kharif)"
          value={form.season}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
        >
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrop;
