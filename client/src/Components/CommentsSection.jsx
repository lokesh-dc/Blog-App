import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function CommentSection({comments}) {

    const [ res, setRes ] = useState(false);

    useEffect(()=>{
       const socket = io.connect('http://localhost:8080');

       socket.on('connect', ()=> setRes(true))
    },[])


    return(
        <>
        <div>{res ? "true" : "false"}</div>
        {/* {
            socket ?
            (
                <Box>
                    <Text>Comment</Text>
                    <CommentInput socket={socket} />
                    {
                        comments?.map((c, index)=>(
                            <CommentsDiv key={index} socket={socket} comment={c} />
                        ))
                    }
                </Box>
            ) :
            <Text> Not Connected </Text>
        } */}
       </>
    )
}