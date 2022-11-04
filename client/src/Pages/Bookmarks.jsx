import { Grid } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogDiv from "../Components/BlogDiv";
import Sidebar from "../Components/Sidebar";

import { bookmarksFetch } from "../Store/bookmarks/bookmark.acion";


export default function Bookmarks() {
    
    const dispatch = useDispatch();

    const { data } = useSelector((store)=> store.bookmarks);

    const [ bookmarks, setBookmarks] = useState([]) ;

    useEffect(()=>{
        let token = localStorage.getItem("x_set") || false;
        dispatch(bookmarksFetch({token}))
    },[dispatch]);

    useEffect(()=>{
        setBookmarks(data);
    },[dispatch, data])

    return (
        <Grid  templateColumns= "100px 5fr">
            <Sidebar />
            <Grid px="100px" pt="50px" height="auto" templateColumns="repeat(3,1fr)" gap={5} borderLeft="1px solid">
                {
                    bookmarks?.map((b,index)=> (
                        <BlogDiv key={index} blogDetails={b.blog} />
                    ))
                }
            </Grid>
        </Grid>
    )
}