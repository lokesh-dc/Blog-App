import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

import { verifyToken } from "../Utils";
import { UserBlogsFetch } from "../Store/blogs/blogs.action"
import BlogDiv from "../Components/BlogDiv";


export default function Stories() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data} = useSelector(store=> store.blogs);

    useEffect(()=>{
        let token = localStorage.getItem("x_set") || false;
        let refresh = localStorage.getItem("y_set") || false;
        if(!token && !refresh){
            return navigate("/login");
        }
        verifyToken(token,refresh).then((res)=>{
            if(res.verified){
                let token = localStorage.getItem("x_set") || false;
                dispatch(UserBlogsFetch(token));
            }
        })
    },[dispatch, navigate])

    console.log(data)

    return(
        <Grid templateColumns= "100px 5fr">
            <Sidebar />
            <Grid px="100px" pt="50px" height="auto" templateColumns="repeat(3,1fr)" gap={5} borderLeft="1px solid">
            {
                    data?.map((b,index)=> (
                        <BlogDiv key={index} blogDetails={b} />
                    ))
                }
            </Grid>
        </Grid>
    )
}