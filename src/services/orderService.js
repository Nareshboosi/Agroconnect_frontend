import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const placeOrder = (orderData, token) => {
  return axios.post(`${API_URL}/place`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
