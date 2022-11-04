import React from "react";

import {Routes, Route} from "react-router-dom";
import VerifyEmail from "../Components/VerifyEmail";
import Blog from "../Pages/Blog";
import BlogsPage from "../Pages/BlogsPage";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoutes from "./PrivateRoutes";


export const AllRoutes = ()=> {
    return(
    <Routes>
        <Route path="/" exact element={<Homepage />}/>
        <Route path="/blogs" element={ <PrivateRoutes> <BlogsPage /> </PrivateRoutes>}/>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={< Signup/>}/>
        <Route path="/verify" element={<VerifyEmail />} />
    </Routes>
    )
}