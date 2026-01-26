import { useEffect, useState } from "react";
import api from "../utils/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reordered, setReordered] = useState({});

  /* ================= FETCH ORDERS ================= */
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

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= PAYMENT ================= */
  const payNow = async (orderId) => {
    try {
      const res = await api.post(`/orders/${orderId}/pay`);
      const { orderId: rpOrderId, amount, key } = res.data;

      const options = {
        key,
        amount: amount * 100,
        currency: "INR",
        name: "AgroConnect",
        description: "Crop Purchase",
        order_id: rpOrderId,

        handler: async (response) => {
          try {
            await api.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("✅ Payment Successful");
            fetchOrders();
          } catch {
            alert("⚠️ Payment verification failed");
          }
        },

        prefill: { email: localStorage.getItem("email") },
        theme: { color: "#2e7d32" },
      };

      new window.Razorpay(options).open();
    } catch {
      alert("❌ Payment failed");
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
      const payload = order.items.map((i) => ({
        cropId: i.crop.id,
        quantity: i.quantity,
      }));

      await api.post("/orders/place", payload);
      setReordered((p) => ({ ...p, [order.id]: true }));
      alert("✅ Reorder successful");
    } catch {
      alert("❌ Reorder failed");
    }
  };

  /* ================= INVOICE ================= */
  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`AgroConnect - Order #${order.id}`, 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Crop", "Qty", "Price/kg", "Total", "Status"]],
      body: order.items.map((i) => [
        i.crop.cropName,
        `${i.quantity} kg`,
        `₹${i.crop.price}`,
        `₹${i.price}`,
        order.status,
      ]),
    });

    doc.text(
      `Total Amount: ₹${order.totalPrice}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`Order_${order.id}.pdf`);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow">
            <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
            <div className="h-10 w-full bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        🛒 My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
          >
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-500">
                  📅 {order.orderDate}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold self-start
                  ${
                    order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Crop</th>
                    <th className="px-3 py-2 text-left">Qty</th>
                    <th className="px-3 py-2 text-left">Price/kg</th>
                    <th className="px-3 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-3 py-2">
                        {item.crop.cropName}
                      </td>
                      <td className="px-3 py-2">
                        {item.quantity} kg
                      </td>
                      <td className="px-3 py-2">
                        ₹{item.crop.price}
                      </td>
                      <td className="px-3 py-2 font-medium">
                        ₹{item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <strong className="text-gray-800">
                Total: ₹{order.totalPrice}
              </strong>

              <div className="flex flex-wrap gap-2">

  {/* CANCEL */}
  {order.status === "PENDING" && (
    <button
      onClick={() => cancelOrder(order.id)}
      className="px-4 py-1.5 rounded bg-red-100 text-red-700 text-sm"
    >
      ❌ Cancel
    </button>
  )}

  {/* REORDER */}
  {order.status === "CANCELLED" && (
    <button
      disabled={reordered[order.id]}
      onClick={() => reorder(order)}
      className="px-4 py-1.5 rounded bg-blue-100 text-blue-700 text-sm"
    >
      🔁 {reordered[order.id] ? "Reordered" : "Reorder"}
    </button>
  )}

  {/* INVOICE */}
  <button
    onClick={() => downloadInvoice(order)}
    className="px-4 py-1.5 rounded bg-gray-100 text-gray-700 text-sm"
  >
    🧾 Invoice
  </button>

  {/* PAY NOW */}
  {order.status === "CONFIRMED" &&
    order.paymentStatus === "UNPAID" && (
      <button
        onClick={() => payNow(order.id)}
        className="px-4 py-1.5 rounded bg-green-600 text-white text-sm"
      >
        💳 Pay Now
      </button>
    )}

  {/* 🔴 REQUEST REFUND */}
  {order.paymentStatus === "PAID" &&
    order.refundStatus === "NONE" &&
    order.status == "DELIVERED" && (
      <button
        onClick={async () => {
          try {
            await api.put(`/orders/${order.id}/refund-request`);
            alert("🟡 Refund requested");
            fetchOrders();
          } catch (e) {
            alert(e.response?.data || "Refund failed");
          }
        }}
        className="px-4 py-1.5 rounded bg-orange-100 text-orange-700 text-sm"
      >
        🔄 Request Refund
      </button>
    )}

  {/* REFUND STATUS CHIPS */}
  {order.refundStatus === "REQUESTED" && (
    <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
      🟡 Refund Requested
    </span>
  )}

  {order.refundStatus === "APPROVED" && (
    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
      🟢 Refund Approved
    </span>
  )}

  {order.refundStatus === "COMPLETED" && (
    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
      ✅ Refunded
    </span>
  )}

</div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BuyerOrders;
