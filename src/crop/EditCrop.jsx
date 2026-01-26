
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/crops/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/crops/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("✅ Crop updated successfully");
      navigate("/my-crops");
    } catch (err) {
      alert("❌ Update failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-start mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4 animate-fadeIn"
      >
        <h2 className="text-xl font-bold text-center text-green-700">
          Edit Crop
        </h2>

        {["cropName", "cropType", "season"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-green-400"
            placeholder={field.replace(/([A-Z])/g, " $1")}
          />
        ))}

        <input
          type="number"
          name="availableQuantity"
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

        <button className="w-full bg-green-700 text-white py-2 rounded
                           hover:bg-green-800 transition transform hover:scale-105">
          Update Crop
        </button>
      </form>
    </div>
  );
};

export default EditCrop;
