import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import StoreSearchBar from "../../components/users/StoreSearchBar";
import StoreCard from "../../components/users/StoreCard";
import ToastMessage from "../../components/users/ToastMessage";

const API_BASE_URL = "http://localhost:3000/api";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ type: "", message: "" });
  const toastTimerRef = useRef(null);

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const showToast = (type, message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ type, message });

    toastTimerRef.current = setTimeout(() => {
      setToast({ type: "", message: "" });
    }, 3000);
  };

  const fetchStores = useCallback(async () => {
    try {
      const query = new URLSearchParams();

      if (search.trim()) {
        query.set("name", search);
        query.set("address", search);
      }
    
      const url = `${API_BASE_URL}/stores${query.toString() ? `?${query}` : ""}`;

      const res = await axios.get(url, {
        headers: getHeaders(),
      });

      setStores(res.data.stores || []);
    } catch (err) {
      console.log(err);
      showToast(
        "error",
        err.response?.data?.message || "Failed to load stores"
      );
    }
  }, [search]);

  useEffect(() => {
    fetchStores();

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [fetchStores]);

  const submitRating = async (storeId, rating, currentRating) => {
    try {
      await axios.post(
        `${API_BASE_URL}/ratings`,
        { store_id: storeId, rating },
        {
          headers: getHeaders(),
        }
      );

      showToast(
        "success",
        currentRating && currentRating !== "Not rated"
          ? "Rating updated successfully"
          : "New rating added successfully"
      );

      fetchStores();
    } catch (err) {
      console.log(err);
      showToast(
        "error",
        err.response?.data?.message || "Failed to submit rating"
      );
    }
  };

  return (
    <MainLayout>
    
      <ToastMessage toast={toast} />

      <h1 className="text-2xl font-bold mb-4">Stores</h1>
    
      <StoreSearchBar
        search={search}
        setSearch={setSearch}
        onSearch={fetchStores}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onRate={submitRating}
          />
        ))}
      </div>
    </MainLayout>
  );
}