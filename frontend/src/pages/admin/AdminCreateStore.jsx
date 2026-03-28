import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

export default function AdminCreateStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (form) => {
    if (!form.name) return "Store name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Enter valid email";
    }

    if (form.address.length > 400) {
      return "Address must be less than 400 characters";
    }

    if (!form.owner_id || isNaN(form.owner_id)) {
      return "Owner ID must be a valid number";
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
      },2000)

      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/stores",
        {
          ...form,
          owner_id: Number(form.owner_id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Store created successfully 🎉");
        
      setError(validationError);
      setTimeout(()=>{
        setMessage("");
      },2000)

      setForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Error");
      setTimeout(()=>{
        setError("")
      },2000);
      
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Create Store</h1>

      {message && (
        <div className="fixed top-20 right-5 bg-green-500/10 border border-green-500 text-green-600 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 animate-[slideIn_0.5s_ease]">
          {message}
        </div>
      )}

      {error && (
        <div className="fixed top-20 right-5 bg-red-500/10 border border-red-500 text-red-600 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 animate-[slideIn_0.5s_ease]">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow w-96">
        <input name="name" value={form.name} placeholder="Store Name" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>
        <input name="email" value={form.email} placeholder="Store Email" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>
        <input name="address" value={form.address} placeholder="Address" className="w-full mb-3 p-2 border rounded" onChange={handleChange}/>
        <input name="owner_id" value={form.owner_id} placeholder="Owner ID" className="w-full mb-4 p-2 border rounded" onChange={handleChange}/>

        <button onClick={handleSubmit} className="w-full bg-green-500 text-white p-2 rounded">
          Create Store
        </button>
      </div>
    </MainLayout>
  );
}