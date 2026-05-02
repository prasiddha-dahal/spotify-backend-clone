import API from "../services/api";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await API.post("/auth/logout"); // clears cookie on backend
        logout();                       // clears Zustand + localStorage
        navigate("/login");
    };

    const { logout } = useAuthStore(); //use auth store is a react hook so always keep it inside the component
    return (
        <div className="mt-4">
            <button className="p-2 bg-red-500 rounded-lg text-white cursor-pointer hover:bg-red-800 transition-all hover:scale-105  " onClick={handleLogout}>Logout</button>
        </div>
    )
}
