import React from "react";

import {Routes, Route} from "react-router-dom";
import VerifyEmail from "../Components/VerifyEmail";
import BlogsPage from "../Pages/BlogsPage";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";


export const AllRoutes = ()=> {
    return(
    <Routes>
        <Route path="/" exact element={<Homepage />}/>
        <Route path="/blogs" element={<BlogsPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={< Signup/>}/>
        <Route path="/verify" element={<VerifyEmail />} />
    </Routes>
    )
}