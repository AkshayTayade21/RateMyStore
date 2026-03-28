import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminStores from "./pages/admin/AdminStores";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import Stores from "./pages/user/Stores";
import AdminCreateUser from "./pages/admin/AdminCreateUser";
import Dashboard from "./pages/user/Dashboard";
import AdminCreateStore from "./pages/admin/AdminCreateStore";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import UpdatePassword from "./pages/auth/UpdatePassword";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/stores" element={<AdminStores />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
        <Route path="/admin/create-store" element={<AdminCreateStore />} />
        <Route path="/admin/users/:id" element={<AdminUserDetails />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
