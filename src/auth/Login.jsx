import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";
import PublicNavbar from "../components/PublicNavbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(formData);
    navigate("/", { replace: true }); // 🔥 ONLY THIS
  } catch {
    setError("Invalid email or password");
  }
};

  return (
      <>

    <PublicNavbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Login to AgroConnect
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
          />

          <button
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>

    </>
  );
};

export default Login;
