import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { toast } from "react-toastify";


const AdminRoute = ({children}) => {
    const { user,loading, isAuthenticated } = useSelector((state) => state.user);

    if(loading === false && isAuthenticated)
    {
        if(!user.isAdmin)
        {
            toast.error("You are not an admin")
            return <Navigate to="/login" replace={true} />
            
        }
        return <Outlet/>
    }
}

export default AdminRoute;

