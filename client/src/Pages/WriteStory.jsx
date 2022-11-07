import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";

import style from "../Styles/WriteStory.module.css"

export default function WriteStory() {
    
    
    return (
        <Grid templateColumns= "100px 5fr">
            <Sidebar />
            <Box textAlign="left" className={style.writeStory} >
                <Text fontSize="3rem">Write your Story</Text>
                <form >
                    <input type="text" placeholder="title"  />
                    <input type="text" placeholder="Summary"  />
                    <textarea type="text" placeholder="Tell your Story..." rows="20" />
                    <Flex gap="10px" >
                        <Button className="secondary_button" colorScheme="transparent" color="black" borderRadius="20px">Clear</Button>
                        <Button colorScheme="transparent" >Publish</Button>
                    </Flex>
                </form>
            </Box>
        </Grid>
    )
} 