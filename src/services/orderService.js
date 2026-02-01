import api from "../api/axios"; // adjust path if needed

export const placeOrder = (orderData) => {
  return api.post("/orders/place", orderData);
};
