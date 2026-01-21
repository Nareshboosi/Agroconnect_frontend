import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [selectedIds, setSelectedIds] = useState([]);

  // ✅ Select / Unselect single item
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  // ✅ Select All
  const toggleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map(item => item.id));
    }
  };

  // ✅ Total of selected items
  const selectedTotal = cartItems
    .filter(item => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // ✅ BUY SELECTED ITEMS
  const handleBuySelected = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one item");
      return;
    }

    const payload = cartItems
      .filter(item => selectedIds.includes(item.id))
      .map(item => ({
        cropId: item.id,
        quantity: item.quantity || 1
      }));

    try {
      await axios.post(
        "http://localhost:8080/api/orders/place",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Order placed successfully");

      // 🧹 Remove only purchased items
      selectedIds.forEach(id => removeFromCart(id));
      setSelectedIds([]);

    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert("Failed to place order");
    }
  };
return (
  <div style={styles.page}>
    <h2 style={styles.title}>🛒 Your Cart</h2>

    {cartItems.length === 0 ? (
      <p style={styles.empty}>Your cart is empty</p>
    ) : (
      <>
        {/* Select All */}
        <div style={styles.selectAll}>
          <input
            type="checkbox"
            checked={selectedIds.length === cartItems.length}
            onChange={toggleSelectAll}
          />
          <span>Select all items</span>
        </div>

        {/* Cart Items */}
        <div style={styles.list}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.card}>
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
              />

              <div style={styles.details}>
                <h4 style={styles.cropName}>{item.cropName}</h4>
                <p style={styles.meta}>
                  ₹{item.price} × {item.quantity} kg
                </p>
              </div>

              <button
                style={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={styles.summary}>
          <div>
            <p style={styles.totalLabel}>Total</p>
            <h3 style={styles.totalAmount}>₹{selectedTotal}</h3>
          </div>

          <button style={styles.buyBtn} onClick={handleBuySelected}>
            ✅ Buy Selected
          </button>
        </div>
      </>
    )}
  </div>
);
};

/* ---------- STYLES ---------- */

const styles = {
  page: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 20px",
  },

  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },

  empty: {
    color: "#777",
    fontSize: "16px",
  },

  selectAll: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    fontWeight: "500",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  card: {
    display: "grid",
    gridTemplateColumns: "30px 1fr auto",
    alignItems: "center",
    padding: "18px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  details: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  cropName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },

  meta: {
    margin: 0,
    color: "#555",
    fontSize: "14px",
  },

  removeBtn: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  summary: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "14px",
    background: "#f7f7f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },

  totalAmount: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
  },

  buyBtn: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "14px 30px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Cart;
