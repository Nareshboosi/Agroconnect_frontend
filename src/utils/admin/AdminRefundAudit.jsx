import { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminRefundAudit = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    try {
      const res = await api.get("/admin/refund-audit");
      setLogs(res.data || []);
    } catch (err) {
      console.error("Failed to load refund audit", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading refund audit...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Refund Audit Log</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Payment ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Approved By</th>
            <th className="p-2 border">Approved At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="p-2 border">{log.orderId}</td>
              <td className="p-2 border">{log.paymentId}</td>
              <td className="p-2 border">₹{log.amount}</td>
              <td className="p-2 border">{log.approvedBy}</td>
              <td className="p-2 border">
                {new Date(log.approvedAt).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRefundAudit;
