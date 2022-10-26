import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Grid } from "@chakra-ui/react"

import { BlogsFetch } from "../Store/blogs/blogs.action";
import BlogDiv from "../Components/BlogDiv";

export default function BlogsPage() {

    const { data } = useSelector((store)=> store.blogs);
    const dispatch = useDispatch()    

    function getData() {
        dispatch(BlogsFetch());
    }

    useEffect(()=>{
        getData()
    },[])


    return (
        <Grid templateColumns="repeat(3,1fr)">
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
        </Grid>
    )
}