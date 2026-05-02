import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthStore();

    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", form);
        setUser(res.data.user);
        navigate(res.data.user.role === "artist" ? "/artist-dashboard" : "/");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="border p-6 rounded-lg w-80"
            >
                <h1 className="text-xl font-bold mb-4">Login</h1>

                <input
                    name="identifier"
                    placeholder="Email or Username"
                    onChange={handleChange}
                    className="border w-full mb-2 p-2"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border w-full mb-3 p-2"
                />

                <button className="bg-black text-white w-full p-2">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
