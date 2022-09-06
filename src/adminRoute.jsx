import { getUser } from "./services/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";


const AdminRoute = () => {
    const location = useLocation();
    return(
            getUser() ? 
            (<Outlet/>) : 
            (<Navigate 
                to="/login"
                replace
                state={{ from: location }}
                />
            )
    )
};

export default AdminRoute;