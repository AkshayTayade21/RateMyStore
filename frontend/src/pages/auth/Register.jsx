import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password validation
  const validateForm = (form) => {
  if (form.name.length < 20 || form.name.length > 60) {
    return "Name must be between 20 and 60 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    return "Please enter a valid email";
  }

  if (form.address.length > 400) {
    return "Address must be less than 400 characters";
  }

  if (form.password.length < 8 || form.password.length > 16) {
    return "Password must be 8-16 characters long";
  }

  if (!/[A-Z]/.test(form.password)) {
    return "Password must include at least one uppercase letter";
  }

  if (!/[!@#$%^&*]/.test(form.password)) {
    return "Password must include at least one special character";
  }

  return null;
};

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    
    const validationError = validateForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await registerUser(form);

      setMessage("Registered successfully 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-3">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-3">
            {message}
          </div>
        )}

        <input
          name="name"
          placeholder="Full Name"
          className="w-full mb-3 p-3 border rounded-lg"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded-lg"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="w-full mb-3 p-3 border rounded-lg"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
          value={form.password}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}