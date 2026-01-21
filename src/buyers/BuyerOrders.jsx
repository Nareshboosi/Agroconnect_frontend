import { useEffect, useState } from "react";
import api from "../utils/api";
import "./buyerOrders.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reordered, setReordered] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ================= */

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/buyer");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */

  const statusClass = (status) => status.toLowerCase();

  const itemStatusLabel = (status) => {
    switch (status) {
      case "PENDING": return "Order Placed";
      case "CONFIRMED": return "Packed";
      case "DELIVERED": return "Delivered";
      case "CANCELLED": return "Cancelled";
      default: return "Processing";
    }
  };

  /* ================= CANCEL ================= */

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await api.put(`/orders/${orderId}/status?status=CANCELLED`);
      fetchOrders();
    } catch {
      alert("❌ Cancel failed");
    }
  };

  /* ================= REORDER ================= */

  const reorder = async (order) => {
    if (reordered[order.id]) return;

    try {
      const payload = order.items.map(i => ({
        cropId: i.crop.id,
        quantity: i.quantity
      }));

      await api.post("/orders/place", payload);
      setReordered(prev => ({ ...prev, [order.id]: true }));
      alert("✅ Reorder successful");
    } catch {
      alert("❌ Reorder failed");
    }
  };

  /* ================= INVOICE ================= */

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Invoice - Order #${order.id}`, 14, 15);

    const tableRows = order.items.map(i => [
      i.crop.cropName,
      `${i.quantity} kg`,
      `₹${i.crop.price}`,
      `₹${i.price}`,
      itemStatusLabel(order.status),
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["Crop", "Quantity", "Price/kg", "Total", "Status"]],
      body: tableRows,
      theme: "grid",
    });

    doc.text(
      `Total Amount: ₹${order.totalPrice}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`Order_${order.id}.pdf`);
  };

  /* ================= UI ================= */

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <div className="buyer-orders">
      <h2>🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty">No orders found</p>
      ) : (
        orders.map(order => (
          <div className="order-card" key={order.id}>

            {/* HEADER */}
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="date">📅 {order.orderDate}</p>
              </div>
              <span className={`status ${statusClass(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* TRACKER */}
            <div className="tracker">
              <div className={`step active`}>Placed</div>
              <div className={`step ${["CONFIRMED","DELIVERED"].includes(order.status) ? "active" : ""}`}>Packed</div>
              <div className={`step ${order.status === "DELIVERED" ? "active" : ""}`}>Delivered</div>
            </div>

            {/* ITEMS */}
            <table className="items-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Price/kg</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.crop.cropName}</td>
                    <td>{item.quantity} kg</td>
                    <td>₹{item.crop.price}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <span className={`item-status ${statusClass(order.status)}`}>
                        {itemStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="order-footer">
              <strong>Total: ₹{order.totalPrice}</strong>

              <div className="actions">
                {order.status === "PENDING" && (
                  <button className="cancel" onClick={() => cancelOrder(order.id)}>
                    ❌ Cancel
                  </button>
                )}

                {order.status === "CANCELLED" && (
                  <button
                    className="reorder"
                    disabled={reordered[order.id]}
                    onClick={() => reorder(order)}
                  >
                    🔁 {reordered[order.id] ? "Reordered" : "Reorder"}
                  </button>
                )}

                <button className="invoice" onClick={() => downloadInvoice(order)}>
                  🧾 Invoice
                </button>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default BuyerOrders;
