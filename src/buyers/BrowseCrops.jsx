// import { useEffect, useRef, useState } from "react";
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import "./browse.css";

// const LOAD_COUNT = 6;

// const Browse = () => {
//   const [crops, setCrops] = useState([]);
//   const [visible, setVisible] = useState(LOAD_COUNT);
//   const loaderRef = useRef(null);

//   const { cartItems, addToCart } = useCart();

//   /* ================= FETCH CROPS ================= */

//   useEffect(() => {
//     fetchCrops();
//   }, []);

//   const fetchCrops = async () => {
//     try {
//       const res = await api.get("/crops/all");
//       setCrops(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("❌ Failed to fetch crops", err);
//     }
//   };

//   /* ================= CART SAFETY ================= */

//   const isInCart = (cropId) => {
//     return cartItems.some(
//       item => String(item.id) === String(cropId)
//     );
//   };

//   /* ================= PRICE ALERT ================= */

//   const checkPriceAlert = (crop) => {
//     const key = `price_${crop.id}`;
//     const oldPrice = localStorage.getItem(key);

//     if (oldPrice && Number(oldPrice) < crop.price) {
//       alert(
//         `⚠️ Price Alert!\n\n"${crop.cropName}" price increased\nOld: ₹${oldPrice}\nNow: ₹${crop.price}`
//       );
//     }

//     localStorage.setItem(key, crop.price);
//   };

//   /* ================= ADD TO CART ================= */

//   const handleAddToCart = (crop) => {
//     if (isInCart(crop.id)) return;

//     checkPriceAlert(crop);

//     addToCart({
//       id: crop.id,                // 🔥 SAME ID EVERYWHERE
//       cropName: crop.cropName,
//       price: crop.price,
//       quantity: 1
//     });

//     alert("✅ Added to cart");
//   };

//   /* ================= INFINITE SCROLL ================= */

//   useEffect(() => {
//     const observer = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting) {
//         setVisible(prev => prev + LOAD_COUNT);
//       }
//     });

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, []);

//   /* ================= FILTER LOGIC =================
//      Only ONE reliable rule without backend change:
//      quantity > 0
//   ================================================== */

//   const visibleCrops = crops
//     .filter(crop => crop.quantity > 0)
//     .slice(0, visible);

//   /* ================= UI ================= */

//   return (
//     <div className="browse">
//       <h2>🌾 Browse Crops</h2>

//       {visibleCrops.length === 0 ? (
//         <p className="empty">No crops available</p>
//       ) : (
//         <div className="grid">
//           {visibleCrops.map(crop => {
//             const disabled = isInCart(crop.id);

//             return (
//               <div className="card" key={crop.id}>
//                 <h3>{crop.cropName}</h3>

//                 <p><b>Price:</b> ₹{crop.price}</p>
//                 <p><b>Available:</b> {crop.quantity} kg</p>

//                 {crop.farmerName && (
//                   <p><b>Farmer:</b> {crop.farmerName}</p>
//                 )}

//                 <button
//                   className={disabled ? "btn disabled" : "btn"}
//                   disabled={disabled}
//                   onClick={() => handleAddToCart(crop)}
//                 >
//                   {disabled ? "✔ In Cart" : "➕ Add to Cart"}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* 👇 Infinite scroll trigger */}
//       <div ref={loaderRef} style={{ height: "30px" }} />
//     </div>
//   );
// };

// export default Browse;


import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import "./browse.css";

const LOAD_COUNT = 6;

const Browse = () => {
  const [crops, setCrops] = useState([]);
  const [visible, setVisible] = useState(LOAD_COUNT);
  const loaderRef = useRef(null);

  const { cartItems, addToCart } = useCart();

  /* ---------- FETCH CROPS ---------- */
  useEffect(() => {
    api.get("/crops/all")
      .then(res => setCrops(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Fetch crops failed", err));
  }, []);

  /* ---------- CART CHECK ---------- */
  const isInCart = (cropId) =>
    cartItems.some(item => String(item.id) === String(cropId));

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = (crop) => {
    if (isInCart(crop.id)) return;

    addToCart({
      id: crop.id,
      cropName: crop.cropName,
      price: crop.price,
      quantity: crop.availableQuantity,
    });

    alert("✅ Added to cart");
  };

  /* ---------- INFINITE SCROLL ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(v => v + LOAD_COUNT);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- ONLY SAFE FILTER ---------- */
  const visibleCrops = crops
    .filter(crop => crop.availableQuantity > 0)
    .slice(0, visible);

  return (
    <div className="browse">
      <h2>🌾 Browse Crops</h2>

      {visibleCrops.length === 0 ? (
        <p className="empty">No crops available</p>
      ) : (
        <div className="grid">
          {visibleCrops.map(crop => {
            const disabled = isInCart(crop.id);

            return (
              <div className="card" key={crop.id}>
                <h3>{crop.cropName}</h3>

                <p><b>Price:</b> ₹{crop.price}</p>
                <p><b>Available:</b> {crop.availableQuantity} kg</p>

                <button
                  className={`btn ${disabled ? "disabled" : ""}`}
                  disabled={disabled}
                  onClick={() => handleAddToCart(crop)}
                >
                  {disabled ? "✔ In Cart" : "➕ Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div ref={loaderRef} className="loader" />
    </div>
  );
};

export default Browse;
