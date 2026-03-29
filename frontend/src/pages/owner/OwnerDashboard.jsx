import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import OwnerStatCard from "../../components/owner/OwnerStatCard";
import UsersRatedTable from "../../components/owner/UserRatedTable";
import StoreRatingsList from "../../components/owner/StoreRatingsList";

const API_BASE_URL = "https://ratemystore-liwu.onrender.com/api";

export default function OwnerDashboard() {
  const [data, setData] = useState({
    averageRatings: [],
    ratedUsers: [],
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/owner/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data.data || { averageRatings: [], ratedUsers: [] });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalUsersRated = data.ratedUsers.length;
  const averageStoreRating =
    data.averageRatings.length > 0
      ? data.averageRatings[0].average_rating
      : 0;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Owner Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <OwnerStatCard
          title="Average Store Rating"
          value={averageStoreRating}
          icon="⭐"
          borderClass="border-yellow-400"
          bgClass="bg-yellow-400/10"
          hoverClass="hover:bg-yellow-400/20"
          textClass="text-yellow-800"
          labelClass="text-yellow-700"
          description="Rating received from all users"
        />

        <OwnerStatCard
          title="Users Who Rated"
          value={totalUsersRated}
          icon="👤"
          borderClass="border-green-400"
          bgClass="bg-green-400/10"
          hoverClass="hover:bg-green-400/20"
          textClass="text-green-800"
          labelClass="text-green-700"
          description="Total users who rated your store"
        />
      </div>

      <StoreRatingsList averageRatings={data.averageRatings} />

      <UsersRatedTable ratedUsers={data.ratedUsers} />
    </MainLayout>
  );
}