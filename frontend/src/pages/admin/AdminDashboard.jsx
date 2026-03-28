import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState({});

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

     <div className="grid grid-cols-3 gap-4">
  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-xl">
    <h2 className="text-lg font-semibold">Users 👤</h2>
    <p className="text-2xl">{data.users}</p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-xl">
    <h2 className="text-lg font-semibold">Stores 🏪</h2>
    <p className="text-2xl">{data.stores}</p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/10 hover:border-green-500 hover:shadow-xl">
    <h2 className="text-lg font-semibold">Ratings 🌟</h2>
    <p className="text-2xl">{data.ratings}</p>
  </div>
</div>
    </MainLayout>
  );
}