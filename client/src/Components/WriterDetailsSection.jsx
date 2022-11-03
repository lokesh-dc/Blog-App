import { Box, Button, Flex, Grid, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { MdVerified } from "react-icons/md"
export default function Writer({writer}){
    const [user, setUser] = useState({});
    useEffect(()=>{
        setUser(writer);
    },[writer])

    return (
        <Grid border="1px solid" p={30} gap="10px" justifyContent="center" alignItems="center" textAlign="center">
            <Text fontSize="2rem" fontWeight="bold">Author</Text>
            <Img src={require("../Resources/icons/avatar.png")} alt="author-profile" w="30%" m="auto" />
            <Flex alignItems="center" justifyContent="center" gap="5px">
                { user?.verified && <MdVerified />}
                <Text>{user?.email}</Text>
            </Flex>
            {/* <Text>{user?.folloers} </Text> */}
            <Text fontWeight="bold"> 0 Followers </Text>
            <Box>
                <Button className="primary-button" colorScheme="transparent" borderRadius={0}>Follow</Button>
            </Box>
        </Grid>
    )
}