import { useEffect, useState } from "react";
import api from "../utils/api";

const BuyerRefunds = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => {
      const refunded = res.data.filter(
        (o) => o.refundStatus && o.refundStatus !== "NONE"
      );
      setOrders(refunded);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Refunds</h2>

      {orders.length === 0 ? (
        <p>No refund requests</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Order</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>₹{o.totalPrice}</td>
                <td>{o.refundStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BuyerRefunds;
