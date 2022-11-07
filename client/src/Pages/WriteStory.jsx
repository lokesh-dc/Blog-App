import { Box, Grid, Input, Text } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";

import style from "../Styles/WriteStory.module.css"

export default function WriteStory() {
    
    
    return (
        <Grid templateColumns= "100px 5fr">
            <Sidebar />
            <Box textAlign="left" className={style.writeStory} >
                <Text fontSize="3rem">Write your Story</Text>
                <form>
                    <Input type="text" placeholder="title"  />
                </form>
            </Box>
        </Grid>
    )
} 