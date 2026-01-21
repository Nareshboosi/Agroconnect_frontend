import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-green-700 text-white px-6 py-3 flex justify-between items-center shadow">
      {/* LEFT */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/login")}
      >
        AgroConnect
      </h1>

      {/* RIGHT */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="hover:underline"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-white text-green-700 px-4 py-1 rounded font-semibold hover:bg-gray-100"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
