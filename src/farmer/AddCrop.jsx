// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddCrop = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     cropName: "",
//     cropType: "",
//     quantity: "",
//     price: "",
//     season: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:8080/api/crops/add",
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("✅ Crop added successfully");
//       navigate("/my-crops");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to add crop");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-green-700">
//           🌾 Add New Crop
//         </h2>

//         <input
//           type="text"
//           name="cropName"
//           placeholder="Crop Name"
//           value={form.cropName}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="text"
//           name="cropType"
//           placeholder="Crop Type (Grain / Vegetable)"
//           value={form.cropType}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity (kg/quintal)"
//           value={form.quantity}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Expected Price"
//           value={form.price}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <input
//           type="text"
//           name="season"
//           placeholder="Season (Rabi / Kharif)"
//           value={form.season}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
//         >
//           Add Crop
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCrop;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/crops/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Crop added successfully");
      navigate("/my-crops");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add crop");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-4
                   animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          🌾 Add New Crop
        </h2>

        {[
          { name: "cropName", placeholder: "Crop Name" },
          { name: "cropType", placeholder: "Crop Type (Grain / Vegetable)" },
          { name: "quantity", placeholder: "Quantity (kg/quintal)", type: "number" },
          { name: "price", placeholder: "Expected Price", type: "number" },
          { name: "season", placeholder: "Season (Rabi / Kharif)" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2
                       focus:ring-2 focus:ring-green-400 outline-none"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg
                     hover:bg-green-800 transition transform hover:scale-105"
        >
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrop;
