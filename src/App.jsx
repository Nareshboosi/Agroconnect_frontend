import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./auth/Login";
import Register from "./auth/Register";

/* ROLE REDIRECT */
import RoleDirect from "./RoleDirect";

/* LAYOUTS */
import FarmerLayout from "./layouts/FarmerLayout";
import BuyerLayout from "./layouts/BuyerLayout";
import AdminLayout from "./layouts/AdminLayout";

/* DASHBOARDS */
import FarmerDashboard from "./farmer/FarmerDashboard";
import BuyerDashboard from "./buyers/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

/* FARMER */
import AddCrop from "./farmer/AddCrop";
import MyCrops from "./farmer/FarmerCrops";
import FarmerOrders from "./farmer/FarmerOrder";

/* BUYER */
import BrowseCrops from "./buyers/BrowseCrops";
import BuyerOrders from "./buyers/BuyerOrders";
import Cart from "./cart/Cart";

/* ADMIN */
import AllUsers from "./utils/admin/AllUsers";
import Crops from "./crop/CropList";
import MarketList from "./market/MarketList";
import EditMarket from "./market/EditMarket";
import AddMarket from "./market/AddMarket";
import ViewCrop from "./crop/ViewCrop";
import EditCrop from "./crop/EditCrop";
import CropList from "./crop/CropList";
import EditFarmerCrop from "./farmer/EditFarmerCrop";


function App() {
  return (

    
    <Routes>

  {/* PUBLIC */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* AUTO REDIRECT */}
  <Route path="/" element={<RoleDirect />} />

  {/* FARMER */}
  <Route path="/farmer" element={<FarmerLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<FarmerDashboard />} />
    <Route path="add-crop" element={<AddCrop />} />
    <Route path="my-crops" element={<MyCrops />} />
    <Route path="orders" element={<FarmerOrders />} />
    <Route path="/farmer/edit-crop/:id" element={<EditFarmerCrop />} />

  </Route>

  {/* BUYER */}
  <Route path="/buyer" element={<BuyerLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<BuyerDashboard />} />
    <Route path="browse" element={<BrowseCrops />} />
    <Route path="orders" element={<BuyerOrders />} />
    <Route path="cart" element={<Cart />} />
  </Route>

  {/* ADMIN */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<AdminDashboard />} />

    {/* USERS */}
    <Route path="users" element={<AllUsers />} />

    {/* CROPS */}
    <Route path="crops" element={<CropList />} />
    <Route path="crops/view/:id" element={<ViewCrop />} />
    <Route path="crops/edit/:id" element={<EditCrop />} />

    {/* MARKET */}
    <Route path="market" element={<MarketList />} />
    <Route path="market/add" element={<AddMarket />} />
    <Route path="market/edit/:id" element={<EditMarket />} />
  </Route>

  {/* FALLBACK */}
  <Route path="*" element={<Navigate to="/" replace />} />

</Routes>


  );
}

export default App;
