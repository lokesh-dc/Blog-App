import { useEffect, useState } from "react";
import { Grid, Text} from "@chakra-ui/react"
import io from "socket.io-client";

import CommentsDiv from "./CommentsDiv";
import style from "../Styles/CommentSection.module.css"
import CommentInput from "./CommentInput";

export const socket = io.connect('http://localhost:8080');


export default function CommentSection({blogid,comments, show, length}) {

    const [state, setState] = useState(comments);

    const [message, setMessage ] = useState("");

    function handleInput(e){
        setMessage(e.target.value);
    }

    useState(()=>{
        setState(comments);
    },[])   

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
                <Grid m={30} display={show ? "grid" : "none"} className={style.comment_div} >
                    <p>Responses({length})</p>
                    <CommentInput handleInput={handleInput} message={message} handleSend={handleSend}/>
                    {
                        state?.map((c, index)=>(
                            <CommentsDiv key={index} socket={socket} comment={c} />
                        ))
                    }

                </Grid>
            ) :
            <Text> Not Connected </Text>
        }
       </>
    )
}