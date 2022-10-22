import { Box, Button, Flex, FormLabel, Grid, HStack,  PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../Store/auth/auth.action"

export default function VerifyEmail() {

    const { loading, error, data } = useSelector((store)=> store.auth);
    const email = data.message.split(":")[1];
    const [otp, setOtp] = useState(0);
    const dispatch = useDispatch();


    function handleChange(e){
        let value = otp;
        let inp = +e.target.value;
        value = (value * 10 ) + inp;
        setOtp(value);
    }

    console.log(otp)
    function handleSubmit(e) {
        e.preventDefault();
        if(otp!==0){
            dispatch(verifyUser({email,otp}));
            setOtp(0)
        }
    }


    return (
        <Grid h="93vh" bgImage={require("../Resources/background.jpg")} bgSize="100%" >
            <Grid gap="30x" p="30px" width="600px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" bgColor="white" justifyContent="center">
                <Text fontSize="3xl" >Verify your Email ID </Text>
                <Flex flexDir="column" gap="20px" mt={20}>
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
                   <Text fontSize="sm" color="grey">Email has been successfully sent to: {email}</Text>
                    </Box>
                    {
                        error &&
                        <Text color="red" bg="red.100" p="8px 10px">{ error }</Text>
                    }
                    <Button id="signin" onClick={handleSubmit} isLoading={loading} loadingText="Verifying..">Verify</Button>

                </Flex>
            </Grid>
        </Grid>
    )
}