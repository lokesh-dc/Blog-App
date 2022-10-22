import {  Box, Button,  FormLabel, Grid,  Input, InputGroup, InputRightElement, Text,  Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom"
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs"
import React from "react";
import SocialButtons from "../Components/SocialButtons";



export default function Login() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <Grid h="93vh" bgImage={require("../Resources/background.jpg")} bgSize="100%">
                <Grid gap="30px" p="30px" width="600px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" bgColor="white"> 
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
                    <Text>Forgot Password?</Text>
                    <Text>or</Text>
                    <SocialButtons />
                    <Text>Don't have an account? <Link to="/signup"> Sign Up </Link></Text>
            </Grid>
        </Grid>
    )
}