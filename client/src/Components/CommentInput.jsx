
import { Button, Grid, Input } from "@chakra-ui/react";
import { useState } from "react";


export default function CommentInput({socket}) {

    const [message, setMessage ] = useState("");

    function handleInput(e){
        setMessage(e.target.value);
    }

    function handleSend(e){
        e.preventDefault();
        socket.emit('comment', message);
    }

    return (
        <Grid templateColumns="2fr 1fr">
        <Input placeholder="What are your thoughts?" onChange={handleInput}></Input>
        <Button onClick={handleSend} colorScheme="red">Send</Button>
    </Grid>
    )
}