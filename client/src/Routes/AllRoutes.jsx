import React from "react";

import {Routes, Route} from "react-router-dom";
import BlogsPage from "../Pages/Blogs";
import Homepage from "../Pages/Homepage";

export const AllRoutes = ()=> {
    return(
    <Routes>
        <Route path="/" exact element={<Homepage />}/>
        <Route path="/blogs" element={<BlogsPage />}/>
    </Routes>
    )
}