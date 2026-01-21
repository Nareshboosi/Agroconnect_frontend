import api from "../../utils/api";

function OrderCard({ order }) {

  const updateStatus = async (status) => {
    try {
      await api.put(`/orders/${order.id}/status?status=${status}`);
      window.location.reload(); // simple + safe for now
    } catch (err) {
      alert("Failed to update order");
    }
  };

  return (
    <div className="fo-card">
      <div className="fo-header">
        <div>
          <strong>Order #{order.id}</strong>
          <p>{order.orderDate}</p>
        </div>

        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <table className="fo-table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Qty (kg)</th>
            <th>Price / kg</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id}>
              <td>{item.crop.cropName}</td>
              <td>{item.quantity}</td>
              <td>₹{item.crop.price}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fo-footer">
        <strong>Total: ₹{order.totalPrice}</strong>

        {order.status === "PLACED" && (
          <div className="actions">
            <button
              className="accept"
              onClick={() => updateStatus("CONFIRMED")}
            >
              Accept
            </button>

            <button
              className="reject"
              onClick={() => updateStatus("CANCELLED")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { OrderCard };
