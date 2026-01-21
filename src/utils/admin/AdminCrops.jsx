import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./table.css"

const AdminCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get("/admin/crops");
      setCrops(res.data);
    } catch (err) {
      console.error("Failed to fetch crops", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCrop = async (id) => {
    if (!window.confirm("Delete this crop?")) return;

    try {
      await axios.delete(`/admin/crops/${id}`);
      fetchCrops();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p>Loading crops...</p>;

  return (
    <div>
      <h2 className="page-title">All Crops</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Crop Name</th>
            <th>Farmer</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {crops.length === 0 ? (
            <tr>
              <td colSpan="6">No crops found</td>
            </tr>
          ) : (
            crops.map((crop) => (
              <tr key={crop.id}>
                <td>{crop.id}</td>
                <td>{crop.name}</td>
                <td>{crop.farmerName}</td>
                <td>{crop.quantity}</td>
                <td>₹{crop.price}</td>
                <td>
                  <button className="btn danger" onClick={() => deleteCrop(crop.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCrops;
