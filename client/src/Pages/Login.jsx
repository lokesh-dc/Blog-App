import {  Box, Button,  FormLabel, Grid,  Input, InputGroup, InputRightElement, Text,  Icon, Flex } from "@chakra-ui/react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs"
import React from "react";
import SocialButtons from "../Components/SocialButtons";



export default function Login() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <Grid h="90vh">
            <Grid templateColumns="1fr 1fr" w="1000px" m="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                <Flex flexFlow="column" bgColor="grey" color="white" justifyContent="center">
                    <Text fontSize='2xl'>Nice to See you again</Text>
                    <Text fontSize='6xl'>Welcome Back</Text>
                    <Text>Enter your credentials to enter into system</Text>
                    <Text m="20px">or</Text>
                    <Box >
                        <Button colorScheme="transparent" border="1px solid white" px="20px" size="lg" _hover={{backgroundColor:"black", border:"1px solid black"}}>Create an Account</Button>
                    </Box>
                </Flex>
                <Grid gap="30px" p="30px"> 
                    <Text fontSize='3xl'>Sign In</Text>
                    <Box>
                        <FormLabel>Enter Email</FormLabel>
                        <Input />
                    </Box>
                    <Box>
                        <FormLabel>Enter Password</FormLabel>
                        <InputGroup>
                            <Input type={ show ? "text" : "password"} />
                            <InputRightElement width='4.5rem'>
                                <Icon as={show ? BsEyeSlashFill : BsEyeFill}  onClick={handleClick} />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Button id="signin">Sign In</Button>
                    <Text>or</Text>
                    <SocialButtons />
                </Grid>
            </Grid>
        </Grid>
    )
}