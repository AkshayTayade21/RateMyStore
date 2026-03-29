import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

export default function AdminCreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = (form) => {
    if (form.name.length < 20 || form.name.length > 60) {
      return "Name must be between 20 and 60 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Enter valid email";
    }

    if (form.address.length > 400) {
      return "Address must be less than 400 characters";
    }

    if (form.password.length < 8 || form.password.length > 16) {
      return "Password must be 8-16 characters";
    }

    if (!/[A-Z]/.test(form.password)) {
      return "Password must include uppercase letter";
    }

    if (!/[!@#$%^&*]/.test(form.password)) {
      return "Password must include special character";
    }

    return null;
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    const validationError = validateForm(form);

    if (validationError) {
      setError(validationError);
      setTimeout(()=>{
        setError("");
      },2000);
      return;
    }

    try {
      await axios.post(
        "https://ratemystore-liwu.onrender.com/api/admin/users",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("User created successfully 🎉");

      setTimeout(()=>{
        setMessage("");
      },2000);

      setForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "user",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Error");
      setTimeout(()=>{
        setError("");
      },2000)
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Create User</h1>

      {message && (
        <div className="fixed top-20 right-5 bg-green-500/10 border border-green-500 text-green-600 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 animate-[slideIn_0.5s_ease]">
          {message}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="fixed top-20 right-5 bg-red-500/10 border border-red-500 text-red-600 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 animate-[slideIn_0.5s_ease]">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow w-96">
        <input name="name" value={form.name} placeholder="Name" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>
        <input name="email" value={form.email} placeholder="Email" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>
        <input name="address" value={form.address} placeholder="Address" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>
        <input type="password" name="password" value={form.password} placeholder="Password" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>

        <select name="role" value={form.role} className="w-full mb-4 p-2 border rounded" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>

        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded">
          Create User
        </button>
      </div>
    </MainLayout>
  );
}