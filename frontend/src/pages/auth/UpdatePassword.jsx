import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

export default function UpdatePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (form) => {
    if (!form.currentPassword) {
      return "Current password is required";
    }

    if (form.newPassword.length < 8 || form.newPassword.length > 16) {
      return "New password must be 8-16 characters";
    }

    if (!/[A-Z]/.test(form.newPassword)) {
      return "New password must include at least one uppercase letter";
    }

    if (!/[!@#$%^&*]/.test(form.newPassword)) {
      return "New password must include at least one special character";
    }

    return null;
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    const validationError = validateForm(form);

    if (validationError) {
      setError(validationError);

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/auth/update-password",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Password updated successfully 🎉");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <MainLayout>
      {/* Success Toast */}
      {message && (
        <div className="fixed top-20 right-5 bg-green-500/10 border border-green-500 text-green-600 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 animate-[slideIn_0.5s_ease]">
          {message}
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-20 right-5 bg-red-500/10 border border-red-500 text-red-600 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 animate-[slideIn_0.5s_ease]">
          {error}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Update Password</h1>

      <div className="bg-white p-6 rounded-xl shadow w-96 border border-gray-200">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </div>
    </MainLayout>
  );
}