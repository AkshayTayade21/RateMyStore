import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

export default function AdminUserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `https://ratemystore-liwu.onrender.com/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">User Details</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-3">
          {error}
        </div>
      )}

      {!user && !error && (
        <div className="bg-white p-6 rounded shadow">Loading...</div>
      )}

      {user && (
        <div className="bg-white p-6 rounded shadow max-w-xl border border-gray-200">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address:</span> {user.address}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role:</span> {user.role}
          </p>

          {user.role === "owner" && (
            <p className="mb-2">
              <span className="font-semibold">Store Rating:</span> ⭐{" "}
              {user.rating || 0}
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
}