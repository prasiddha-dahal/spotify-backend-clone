import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", form);

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-lg w-80"
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="border w-full mb-2 p-2"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full mb-2 p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full mb-2 p-2"
        />

        <select
          name="role"
          onChange={handleChange}
          className="border w-full mb-3 p-2"
        >
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>

        <button className="bg-black text-white w-full p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
