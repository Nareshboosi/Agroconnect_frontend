import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO SECTION */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to AgroConnect 🌾
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          A smart platform connecting farmers, market prices, and agriculture
          data in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-white px-6 py-2 rounded font-semibold hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              📊 Market Prices
            </h3>
            <p className="text-gray-600">
              View real-time crop market prices updated by admins.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              👨‍🌾 Farmer Management
            </h3>
            <p className="text-gray-600">
              Farmers can securely register, login, and manage data.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              🔐 Secure Access
            </h3>
            <p className="text-gray-600">
              JWT-based authentication with role-based authorization.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 AgroConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
