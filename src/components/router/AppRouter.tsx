import React, {JSX} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Main from "../pages/main/Main";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";



interface PrivateRouteProps {
    children: JSX.Element;
}

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Main />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};

export default AppRouter;