import { useEffect, useState } from "react";
import {Box, Button, Grid, Input, Text} from "@chakra-ui/react"

import io from "socket.io-client";
// import CommentInput from "./CommentInput";
import CommentsDiv from "./CommentsDiv";
import style from "../Styles/CommentSection.module.css"

export const socket = io.connect('http://localhost:8080');


export default function CommentSection({blogid,comments, show}) {


    const [state, setState] = useState([]);

    const [message, setMessage ] = useState("");

    function handleInput(e){
        setMessage(e.target.value);
    }

    useState(()=>{
        setState(comments);
    },[])   

    console.log(state)

    function handleSend(e){
        e.preventDefault();
        const id = blogid;
        socket.emit('comment', {id,message});
    }

    useEffect(()=>{
       socket.on('connect', ()=> console.log("connected"))

       socket.on("blogComments", ({id, blogComments})=>{
        if(id===blogid){
            setState(blogComments);
        }
    })
    },[blogid])

    return(
        <>
        {
            socket ?
            (
                <Box m={30} display={show ? "grid" : "none"} className={style.comment_div} >
                    <Text fontSize="xl">Resopnses</Text>
                    <Grid templateColumns="3fr 1fr">
                        <Input placeholder="What are your thoughts?" onChange={handleInput}></Input>
                        <Button onClick={handleSend} colorScheme="transparent" className="primary-button">Send</Button>
                    </Grid>
                    {
                        state?.map((c, index)=>(
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