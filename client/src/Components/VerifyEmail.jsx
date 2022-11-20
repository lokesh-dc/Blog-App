import { Box, Button, Flex, FormLabel, Grid, HStack,  Input,  PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

import { verifyUser } from "../Store/auth/auth.action"
import Nav from "./UserNav";

export default function VerifyEmail() {

    const { loading, error, data } = useSelector((store)=> store.auth);
    const [email,setEmail] = useState("");
    const [otp, setOtp] = useState(0);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    function handleChange(e){
        let value = otp;
        let inp = +e.target.value;
        value = (value * 10 ) + inp;
        setOtp(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(otp!==0){
            dispatch(verifyUser({email,otp}));
            setOtp(0)
        }
    }

    function handleInput(e){
        setEmail(e.target.value);
    }

    useEffect(()=>{
        if(data.token){
            navigate("/login");
        }
    },[data.token, navigate])

    console.log(data);

    return (
        <>
        <Nav />
        <Grid h="93vh" bgImage={require("../Resources/background.jpg")} bgSize="100%" >
            <Grid gap="30x" p="30px" width="600px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" bgColor="white" justifyContent="center">
                <Text fontSize="3xl" >Verify your Email ID </Text>
                <Flex flexDir="column" gap="20px" mt={20}>
                    <Box>
                        <FormLabel>Enter your Email Id:</FormLabel>
                        <Input onChange={handleInput}/>
                    </Box>
                    <Box>
                    <FormLabel>Enter your OTP:</FormLabel>
                    <HStack justifyContent="center" mb={10}>
                        <PinInput placeholder='-'  type='number' otp>
                            <PinInputField onChange={handleChange}/>
                            <PinInputField onChange={handleChange}/>
                            <PinInputField onChange={handleChange}/>
                            <PinInputField onChange={handleChange}/>
                            <PinInputField onChange={handleChange}/>
                        </PinInput>
                    </HStack>
                   <Text fontSize="sm" color="grey">Email has been successfully sent.</Text>
                    </Box>
                    {
                        error &&
                        <Text color="red" bg="red.100" p="8px 10px">{ error }</Text>
                    }
                    <Button id="signin" onClick={handleSubmit} isLoading={loading} loadingText="Verifying..">Verify</Button>

                </Flex>
            </Grid>
        </Grid>
        </>
    )
}