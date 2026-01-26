import { useEffect, useState } from "react";
import api from "../utils/api";

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
      fetchOrders();
    } catch {
      alert("Failed to update order");
    } finally {
      setUpdatingId(null);
    }
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
        🌾 Farmer Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders received yet</p>
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
              </div>

              <div className="flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : order.status === "CONFIRMED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {order.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.paid
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {order.paid ? "💰 PAID" : "⏳ NOT PAID"}
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Crop</th>
                    <th className="px-3 py-2 text-left">Qty (kg)</th>
                    <th className="px-3 py-2 text-left">Price/kg</th>
                    <th className="px-3 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-3 py-2">
                        {item.crop?.cropName}
                      </td>
                      <td className="px-3 py-2">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-2">
                        ₹{item.crop?.price}
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
                {!order.paid && (
                  <span className="text-sm text-gray-500">
                    Waiting for buyer payment
                  </span>
                )}

                {order.status === "PENDING" && (
                  <>
                    <button
                      disabled={updatingId === order.id}
                      onClick={() =>
                        updateStatus(order.id, "CONFIRMED")
                      }
                      className="px-4 py-1.5 rounded bg-green-600 text-white text-sm disabled:opacity-60"
                    >
                      ✅ Accept
                    </button>

                    <button
                      disabled={updatingId === order.id}
                      onClick={() =>
                        updateStatus(order.id, "CANCELLED")
                      }
                      className="px-4 py-1.5 rounded bg-red-100 text-red-700 text-sm disabled:opacity-60"
                    >
                      ❌ Cancel
                    </button>
                  </>
                )}

                {order.status === "CONFIRMED" &&
                  order.paymentStatus === "PAID" && (
                    <button
                      disabled={updatingId === order.id}
                      onClick={() =>
                        updateStatus(order.id, "DELIVERED")
                      }
                      className="px-4 py-1.5 rounded bg-blue-600 text-white text-sm disabled:opacity-60"
                    >
                      🚚 Mark as Delivered
                    </button>
                  )}

                {order.status === "DELIVERED" && (
                  <span className="text-sm font-semibold text-green-600">
                    ✅ Order Completed
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

export default FarmerOrders;
