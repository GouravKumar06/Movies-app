import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"


const PrivateRoute = ({children}) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    console.log("loading",loading,"isAuthenticated",isAuthenticated)
    if(loading === false)
    {
        if(!isAuthenticated)
        {
            return <Navigate to="/login" replace/>
        }
        return children
    }
}

export default PrivateRoute;