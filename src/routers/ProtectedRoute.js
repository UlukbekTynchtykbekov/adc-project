import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({role}) => {
    const {data, isAuthenticated} = useSelector(state => state.auth)


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role && !data.role.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet/>;
};

export default ProtectedRoute;