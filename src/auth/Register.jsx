import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "FARMER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form);
      alert(`${form.role} registered successfully`);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Register – AgroConnect
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-center mb-4 text-sm">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FULL NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-green-700"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* ADDRESS */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="FARMER">Farmer</option>
            <option value="BUYER">Buyer</option>
            <option value="ADMIN">Admin</option> 
          </select>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;
