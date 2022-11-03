import { Flex, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogsFetch } from "../Store/blogs/blogs.action";
import Writer from "./WriterDetailsSection";

import { MdVerified } from "react-icons/md"
import { NavLink } from "react-router-dom";


export default function SideBlog({writer}){

    const { data } = useSelector((store)=> store.blogs);
    const dispatch = useDispatch()    

    const [author, setAuthor] = useState({});
    function getData() {
        dispatch(BlogsFetch());
    }

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        setAuthor(writer);
    },[writer])
    return (
        <Grid position="sticky" right="0" top="0" height="100vh" textAlign="left" gap={5} templateRows="2fr 3fr" py={10}>
            <Writer writer={author}/>
            <Text fontSize="1.5rem" borderTop="1px solid rgba(128, 128, 128, 0.199)" pt="30px">More blogs to read: </Text>
            {
                    data?.map((b,index)=> (
                            <Grid key={index} border="1px solid rgba(128, 128, 128, 0.199)" gap="10px" padding="10px" >
                                <Flex alignItems="center" gap="5px">
                                    {
                                        b?.user.verified && <MdVerified />
                                    }
                                    <Text fontSize="0.8rem">{b?.user?.email}</Text>
                                </Flex>
                                <NavLink to={`/blogs/${b?._id}`}>
                                    <Text fontSize="lg" fontWeight="bold">{b.title}</Text>
                                </NavLink>
                            </Grid>
                    ))
            }
        </Grid>
    )
}