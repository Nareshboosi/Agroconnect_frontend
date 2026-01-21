import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cropName: "",
    cropType: "",
    quantity: "",
    price: "",
    season: "",
  });

  // 🔹 Fetch crop by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/crops/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setForm(res.data); // ⭐ PREFILL FORM
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 🔹 Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Update crop
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/crops/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Crop updated successfully");
      navigate("/my-crops");
    } catch (err) {
      alert("❌ Update failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-green-700">
          Edit Crop
        </h2>

        <input
          name="cropName"
          value={form.cropName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Crop Name"
        />

        <input
          name="cropType"
          value={form.cropType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Crop Type"
        />

        <input
          type="number"
          name="quantity"
          value={form.availableQuantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Quantity"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Price"
        />

        <input
          name="season"
          value={form.season}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Season"
        />

        <button className="w-full bg-green-700 text-white py-2 rounded">
          Update Crop
        </button>
      </form>
    </div>
  );
};

export default EditCrop;
