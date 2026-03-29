import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import StoreSearchBar from "../../components/admin/StoreSearchBar";
import StoresTable from "../../components/admin/StoreTable";

const API_BASE_URL = "https://ratemystore-liwu.onrender.com/api";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStores = async () => {
    try {
      const query = new URLSearchParams();

      if (search.trim()) {
        query.set("search", search);
      }

      const url = `${API_BASE_URL}/admin/stores${
        query.toString() ? `?${query}` : ""
      }`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStores(res.data.stores || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Stores</h1>

      <StoreSearchBar
        search={search}
        setSearch={setSearch}
        onSearch={fetchStores}
      />

      <StoresTable stores={stores} />
    </MainLayout>
  );
}