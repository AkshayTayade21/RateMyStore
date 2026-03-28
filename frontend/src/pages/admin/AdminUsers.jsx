import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import UserSearchFilters from "../../components/admin/UserSearchFilters";
import UsersTable from "../../components/admin/UserTable";

const API_BASE_URL = "http://localhost:3000/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      const query = new URLSearchParams();

      if (search.trim()) {
        query.set("search", search);
      }

      if (role) {
        query.set("role", role);
      }

      const url = `${API_BASE_URL}/admin/users${
        query.toString() ? `?${query}` : ""
      }`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <UserSearchFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        onSearch={fetchUsers}
      />

      <UsersTable users={users} />
    </MainLayout>
  );
}