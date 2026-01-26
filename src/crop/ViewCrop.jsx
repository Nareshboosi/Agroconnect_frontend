import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./ViewCrop.css";

const ViewCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await api.get(`/crops/${id}`);
        setCrop(res.data);
      } catch (err) {
        if (err.response?.status === 403) setError("Access Denied");
        else if (err.response?.status === 404) setError("Crop not found");
        else setError("Failed to load crop details");
      } finally {
        setLoading(false);
      }
    };
    fetchCrop();
  }, [id]);

  if (loading) return <div className="viewcrop-loading">Loading...</div>;
  if (error)
    return (
      <div className="viewcrop-error">
        <h2>{error}</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );

  return (
    <div className="viewcrop-container">
      <h2 className="viewcrop-title">Crop Details</h2>
      <div className="viewcrop-card">
        {[
          ["Crop Name", crop.cropName],
          ["Crop Type", crop.cropType],
          ["Season", crop.season],
          ["Quantity", `${crop.availableQuantity} Kg`],
          ["Price", `₹ ${crop.price}`],
        ].map(([label, value]) => (
          <div className="row" key={label}>
            <span>{label}</span>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div className="viewcrop-actions">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewCrop;
