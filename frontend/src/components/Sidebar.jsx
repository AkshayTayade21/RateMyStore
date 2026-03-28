import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const linkStyle =
    "px-3 py-2 rounded-lg transition duration-200 hover:bg-white/20 hover:text-white";

  return (
    <div className="w-64 bg-gray-400 text-white p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>

      <nav className="flex flex-col gap-2 text-sm">

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <Link to="/admin" className={linkStyle}>Dashboard</Link>
            <Link to="/admin/users" className={linkStyle}>Users</Link>
            <Link to="/admin/create-user" className={linkStyle}>Create User</Link>
            <Link to="/admin/stores" className={linkStyle}>Stores</Link>
            <Link to="/admin/create-store" className={linkStyle}>Create Store</Link>
          </>
        )}

        {/* USER */}
        {role === "user" && (
          <>
            <Link to="/dashboard" className={linkStyle}>Dashboard</Link>
            <Link to="/stores" className={linkStyle}>Stores</Link>
          </>
        )}

        {/* OWNER */}
        {role === "owner" && (
          <Link to="/owner" className={linkStyle}>Owner Dashboard</Link>
        )}

        {/* PASSWORD */}
        <Link
          to="/update-password"
          className="px-3 py-2 rounded-lg text-black font-medium hover:bg-white/20 transition"
        >
          Update Password
        </Link>

      </nav>
    </div>
  );
}