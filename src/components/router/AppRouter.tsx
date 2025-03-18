import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signin" element={<Signup/>}/>
            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};

export default AppRouter;