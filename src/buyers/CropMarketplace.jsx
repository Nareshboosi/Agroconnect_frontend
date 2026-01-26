import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import axiosInstance from "../utils/axiosInstances";

function CropMarketplace() {
  const [crops, setCrops] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axiosInstance.get("/api/crops")
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Crop Marketplace</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "10px" }}>
        {crops.map(crop => (
          <div key={crop.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h4>{crop.name}</h4>
            <p>Price: ₹{crop.price}</p>
            <p>Farmer: {crop.farmer.name}</p>

            <button onClick={() => addToCart(crop)}>
              Add to Cart++++
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropMarketplace;
