import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";

const PAGE_SIZE = 8;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "refunds" ? "REFUND" : "ALL";
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/admin");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const approveRefund = async (id) => {
    if (!window.confirm("Approve refund?")) return;
    await api.post(`/admin/refunds/${id}/approve`);
    fetchOrders();
  };

  const cancelRefund = async (id) => {
    if (!window.confirm("Cancel refund request?")) return;
    await api.put(`/admin/refunds/${id}/cancel`);
    fetchOrders();
  };

  const filtered =
    tab === "REFUND"
      ? orders.filter((o) => o.refundStatus === "REQUESTED")
      : orders;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <p className="text-gray-500">Loading orders…</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📦 Orders</h2>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-2 rounded ${
            tab === "ALL"
              ? "bg-green-700 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          All Orders
        </button>

        <button
          onClick={() => setSearchParams({ tab: "refunds" })}
          className={`px-4 py-2 rounded ${
            tab === "REFUND"
              ? "bg-green-700 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          Refund Requests
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Buyer</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Payment</th>
              <th className="p-3 text-center">Refund</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((o) => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="p-3">#{o.id}</td>
                <td className="p-3">{o.buyer?.email}</td>
                <td className="p-3 text-right font-medium">
                  ₹{o.totalPrice}
                </td>

                <td className="p-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs
                    ${o.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}
                  `}>
                    {o.paymentStatus}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {o.refundStatus || "-"}
                </td>

                <td className="p-3 text-center">
                  {o.refundStatus === "REQUESTED" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => approveRefund(o.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => cancelRefund(o.id)}
                        className="px-3 py-1 bg-gray-200 rounded text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-green-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
