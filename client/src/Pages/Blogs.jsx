import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Box, Flex, Grid, Text } from "@chakra-ui/react"

import { BlogsFetch } from "../Store/blogs/blogs.action";

export default function BlogsPage() {

    const {loading, error, data} = useSelector((store)=> store.blogs);
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
                data?.map((b)=> (
                    <Box border="1px solid red">
                        <Text>{b.title}</Text>
                        <Text>{b.description}</Text>

                        <Flex justifyContent="space-evenly">
                            <Text>Like</Text>
                            <Text>Comment</Text>
                            <Text>Share</Text>
                        </Flex>
                    </Box>
                ))
            }
        </Grid>
    )
}