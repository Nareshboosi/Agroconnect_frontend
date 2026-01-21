import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMarket = () => {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);

  const [form, setForm] = useState({
    cropId: "",
    marketName: "",
    pricePerQuintal: "",
  });

  // =========================
  // FETCH CROPS
  // =========================
  useEffect(() => {
    const role = localStorage.getItem("role");

    const url =
      role === "ADMIN"
        ? "http://localhost:8080/api/crops/all"
        : "http://localhost:8080/api/crops/my-crops";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("CROPS:", res.data);
        setCrops(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cropId) {
      alert("❌ Please select a crop");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/market-prices",
        {
          cropId: Number(form.cropId), // ✅ IMPORTANT
          marketName: form.marketName,
          pricePerQuintal: Number(form.pricePerQuintal),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Market price added successfully");

      // ✅ REDIRECT TO TABLE PAGE
      navigate("/market");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Failed to add market price");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 pt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-green-700">
          Add Market Price
        </h2>

        {/* CROP SELECT */}
        <select
          name="cropId"
          value={form.cropId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"
          required
        >
          <option value="">Select Crop</option>
          {crops.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.cropName}
            </option>
          ))}
        </select>

        {/* MARKET NAME */}
        <input
          type="text"
          name="marketName"
          placeholder="Market Name"
          value={form.marketName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"
          required
        />

        {/* PRICE */}
        <input
          type="number"
          name="pricePerQuintal"
          placeholder="Price per Quintal"
          value={form.pricePerQuintal}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"
          required
        />

        {/* BUTTONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            Add Price
          </button>

          <button
            type="button"
            onClick={() => navigate("/market")}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMarket;
