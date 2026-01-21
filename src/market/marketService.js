import axios from "../api/axios";

// GET all market prices
export const getMarketPrices = async () => {
  const res = await axios.get("/market-prices");
  return res.data;
};

// ADD market price (ADMIN)
export const addMarketPrice = async (data) => {
  return axios.post("/market-prices", data);
};

// UPDATE market price (ADMIN)
export const updateMarketPrice = async (id, data) => {
  return axios.put(`/market-prices/${id}`, data);
};

// DELETE market price (ADMIN)
export const deleteMarketPrice = async (id) => {
  return axios.delete(`/market-prices/${id}`);
};
