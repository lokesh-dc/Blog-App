import { useEffect, useState } from "react";
import {Box, Button, Grid, Input, Text} from "@chakra-ui/react"

import io from "socket.io-client";
// import CommentInput from "./CommentInput";
import CommentsDiv from "./CommentsDiv";

const socket = io.connect('http://localhost:8080');


export default function CommentSection({blogid,comments}) {

    const [ res, setRes ] = useState(false);

    const [state, setState] = useState(comments);

    const [message, setMessage ] = useState("");

    function handleInput(e){
        setMessage(e.target.value);
    }


    function handleSend(e){
        e.preventDefault();
        const id = blogid;
        socket.emit('comment', {id,message});

        
        // socket.on("blogComments", ({id, blogComments})=>{
        //     if(id===blogid){
        //         setState(blogComments);
        //     }
        // })
    }

    useEffect(()=>{
       socket.on('connect', ()=> setRes(true))
    },[])


    socket.on("blogComments", ({id, blogComments})=>{
        if(id===blogid){
            setState(blogComments);
        }
    })

    return(
        <>
        
        {
            socket ?
            (
                <Box>
                    <Text>Comment</Text>
                    <Grid templateColumns="2fr 1fr">
                        <Input placeholder="What are your thoughts?" onChange={handleInput}></Input>
                        <Button onClick={handleSend} colorScheme="red">Send</Button>
                    </Grid>
                    {
                        state.map((c, index)=>(
                            <CommentsDiv key={index} socket={socket} comment={c} />
                        ))
                    }
                </Box>
            ) :
            <Text> Not Connected </Text>
        }
       </>
    )
}