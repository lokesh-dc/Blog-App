import { Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogsFetch } from "../Store/blogs/blogs.action";

export default function SideBlog(){

    const { data } = useSelector((store)=> store.blogs);
    const dispatch = useDispatch()    

    function getData() {
        dispatch(BlogsFetch());
    }

    useEffect(()=>{
        getData()
    },[])


    return (
        <Grid position="fixed" right="0" top="0" width="280px" textAlign="left" gap={5}>
            <Text fontSize="xl">Related Blogs:</Text>
            {
                    data?.map((b,index)=> (
                       <Grid border="1px solid" padding="5px 10px">
                            <Text fontSize="0.8rem">{b?.user?.email}</Text>
                            <Text fontSize="lg" fontWeight="bold">{b.title}</Text>
                        </Grid>
                    ))
            }
        </Grid>
    )
}