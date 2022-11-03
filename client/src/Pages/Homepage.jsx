import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Grid } from "@chakra-ui/react"

import { BlogsFetch } from "../Store/blogs/blogs.action";
import BlogDiv from "../Components/BlogDiv";
import Navbar from "../Components/Navbar";
import Intro from "../Components/Intro";

export default function Homepage() {

    const { data } = useSelector((store)=> store.blogs);
    const dispatch = useDispatch()    

    function getData() {
        dispatch(BlogsFetch());
    }

    useEffect(()=>{
        getData()
    },[])

    return (<Grid>
        <Navbar />
        <Intro />
        <Grid templateColumns="repeat(2,1fr)" gap="10"  w="80%" m="auto" id="blogs-div" pt={10}>
            {
                data?.map((b,index)=> (
                    <BlogDiv key={index} blogDetails={b} />
                ))
            }
        </Grid>
        </Grid>
    )
}