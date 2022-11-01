import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Grid } from "@chakra-ui/react"

import { BlogsFetch } from "../Store/blogs/blogs.action";
import BlogDiv from "../Components/BlogDiv";

export default function Homepage() {

    const { data } = useSelector((store)=> store.blogs);
    const dispatch = useDispatch()    

    function getData() {
        dispatch(BlogsFetch());
    }

    useEffect(()=>{
        getData()
    },[])


    return (
        <Grid templateColumns="1fr 1fr 1fr" gap="10"  w="75%" m="auto" id="blogs-div">
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
        </Grid>
    )
}