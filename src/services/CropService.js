import api from "../api/axios";

export const getAllCrops = async () => {
  const response = await api.get("/crops");
  return response.data;
};
