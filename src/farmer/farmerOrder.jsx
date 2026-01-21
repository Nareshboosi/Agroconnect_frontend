import { useEffect, useState } from "react";
import api from "../utils/api";
import "./farmerOrders.css";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/farmer");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching farmer orders", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await api.put(`/orders/${orderId}/status?status=${status}`);
      await fetchOrders();
    } catch (err) {
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <p className="loading">Loading orders...</p>;
  }

  return (
    <div className="farmer-orders">
      <h2>🌾 Farmer Orders</h2>

      {orders.length === 0 ? (
        <p className="empty">No orders received yet</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            {/* HEADER */}
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="date">📅 {formatDate(order.orderDate)}</p>
              </div>

              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <table className="items-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Quantity (kg)</th>
                  <th>Price / kg</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(order.items) &&
                  order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.crop?.cropName || "-"}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.crop?.price}</td>
                      <td>₹{item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="order-footer">
              <strong>Total Amount: ₹{order.totalPrice}</strong>

              {/* ACTIONS */}
              {order.status === "PENDING" && (
                <div className="actions">
                  <button
                    className="accept"
                    disabled={updatingId === order.id}
                    onClick={() => updateStatus(order.id, "CONFIRMED")}
                  >
                    ✅ Accept
                  </button>

                  <button
                    className="reject"
                    disabled={updatingId === order.id}
                    onClick={() => updateStatus(order.id, "CANCELLED")}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}

              {order.status === "CONFIRMED" && (
                <button
                  className="deliver"
                  disabled={updatingId === order.id}
                  onClick={() => updateStatus(order.id, "DELIVERED")}
                >
                  🚚 Mark as Delivered
                </button>
              )}

              {order.status === "DELIVERED" && (
                <span className="completed">✅ Order Completed</span>
              )}

              {order.status === "CANCELLED" && (
                <span className="cancelled-text">❌ Order Cancelled</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FarmerOrders;
