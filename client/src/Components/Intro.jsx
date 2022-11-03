import { Button, Flex, Grid, Text } from "@chakra-ui/react";

export default function Intro() {
    return (
        <Grid height="80vh" bgImage={require("../Resources/intro_bg.jpg")} bgSize="cover" bgPosition="center" bgAttachment="fixed" justifyContent="center" alignItems="center">
            <Text fontSize="10rem" m={0} p={0} >Stay Curious.</Text>
            <Text fontSize="2rem" color="white" className="quote"><q>Write it. Shoot it. Publish it. Crochet it.<br /> Sauté it. Whatever. Make.</q> <br/> — Joss Whedon</Text>
            <Flex justifyContent="center">
                <Button w="fit-content" borderRadius={0} padding="10px 20px" >Start Writting</Button>
            </Flex>
            <Text color="white" letterSpacing="2px">Scroll down</Text>
        </Grid>
    )
}