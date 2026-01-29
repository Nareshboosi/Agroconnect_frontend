import axios from "../api/axios";



// REGISTER
export const register = (data) => {
  if (data.role === "FARMER")
    return axios.post("/auth/register/farmer", data);

  if (data.role === "BUYER")
    return axios.post("/auth/register/buyer", data);

  if (data.role === "ADMIN")
    return axios.post("/auth/register/admin", data);
};


// LOGIN
export const login = async (data) => {
  const response = await axios.post("/auth/login", data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role); // ✅ FIX
  }

  return response.data;
};

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");

export const logout = () => {
  localStorage.clear();
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

