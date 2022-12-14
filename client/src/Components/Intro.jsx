import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Intro() {
    return (
        <Grid height="75vh" bgImage={require("../Resources/intro_bg.jpg")} bgSize="cover" bgPosition="center" bgAttachment="fixed" justifyContent="center" alignItems="center">
            <Text fontSize="10rem" m={0} p={0} textTransform="uppercase" fontWeight="bold" color="#353a4a" >Stay Curious.</Text>
            <Text fontSize="2rem" color="white" className="quote"><q>Write it. Shoot it. Publish it. Crochet it.<br /> Sauté it. Whatever. Make.</q> <br/> — Joss Whedon</Text>
            <Flex justifyContent="center">
            <NavLink to="/blogs">
                <Button w="fit-content" borderRadius={0} padding="10px 20px" zIndex={0} >Start Writting</Button>
            </NavLink>
            </Flex>
        </Grid>
    )
}