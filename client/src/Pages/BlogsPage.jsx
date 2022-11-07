import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Grid } from "@chakra-ui/react"

import { BlogsFetch } from "../Store/blogs/blogs.action";
import BlogDiv from "../Components/BlogDiv";
import Sidebar from "../Components/Sidebar";
 
import style from "../Styles/Blog.module.css"

export default function BlogsPage() {

    const { data } = useSelector((store)=> store.blogs);
    const dispatch = useDispatch()    


    useEffect(()=>{
        dispatch(BlogsFetch());
    },[dispatch])

    

    return (
        <Grid className={style.blog} templateColumns= "100px 5fr">
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