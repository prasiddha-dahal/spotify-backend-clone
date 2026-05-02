import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute({children, allowedRole}){
    const {user} = useAuthStore();

    if(!user){
        return <Navigate to ='/login' />
    }

    if(allowedRole && user.role!=="artist"){
        return <Navigate to ='/' />
    }

    return children;
}
