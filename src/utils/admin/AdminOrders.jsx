import React, { useEffect, useState } from "react";
import api from "../utils/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/admin").then(res => {
      setOrders(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status?status=${status}`);
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, status } : o)
    );
  };

  return (
    <div style={styles.page}>
      <h2>🛠 Admin Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={styles.card}>
          <h4>Order #{order.id}</h4>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalPrice}</p>

          <button onClick={() => updateStatus(order.id, "CONFIRMED")}>
            Confirm
          </button>
          <button onClick={() => updateStatus(order.id, "CANCELLED")}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  page: { padding: "30px", maxWidth: "900px", margin: "auto" },
  card: {
    background: "#fff",
    padding: "18px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.1)"
  }
};

export default AdminOrders;
