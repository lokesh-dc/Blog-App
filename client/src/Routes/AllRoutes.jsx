import React from "react";

import {Routes, Route} from "react-router-dom";
import VerifyEmail from "../Components/VerifyEmail";
import Blog from "../Pages/Blog";
import BlogsPage from "../Pages/BlogsPage";
import Bookmarks from "../Pages/Bookmarks";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Stories from "../Pages/Stories";
import WriteStory from "../Pages/WriteStory";
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
        <Route path="/saved" element={ <PrivateRoutes> <Bookmarks /> </PrivateRoutes>} />
        <Route path="/stories" element={ <PrivateRoutes> <Stories /> </PrivateRoutes>} />
        <Route path="/write_story" element={ <PrivateRoutes> <WriteStory /> </PrivateRoutes>} />
    </Routes>
    )
}