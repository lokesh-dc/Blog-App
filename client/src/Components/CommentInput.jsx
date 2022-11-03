import { Button, Flex, Grid } from "@chakra-ui/react";

import { FiSend } from "react-icons/fi"

export default function CommentInput({handleInput, handleSend, message}) {

    function handleClear(){
        document.getElementById("textarea").value = "";
        message = ""
    }

    return (
        <Grid mt="30px" gap="10px">
            <textarea placeholder="What are your thoughts?" onChange={handleInput} rows="5" id="textarea"></textarea>
            <Grid templateColumns="2fr 1fr" gap="5px">
                <Button colorScheme="transparent" color="black" border="1px solid" onClick={handleClear}>Cancel</Button>
                <Button onClick={handleSend} colorScheme="transparent" className="primary-button" disabled={message===""} > <FiSend /></Button>
            </Grid>
        </Grid>
    )
}