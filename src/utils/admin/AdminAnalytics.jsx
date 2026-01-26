import { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/analytics").then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-green-600 text-white p-4 rounded">
        <h3>Total Revenue</h3>
        <p className="text-xl">₹{data.revenue}</p>
      </div>

      <div className="bg-red-600 text-white p-4 rounded">
        <h3>Refunded</h3>
        <p className="text-xl">₹{data.refunds}</p>
      </div>

      <div className="bg-blue-600 text-white p-4 rounded">
        <h3>Net Revenue</h3>
        <p className="text-xl">₹{data.netRevenue}</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
