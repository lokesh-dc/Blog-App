import {  Box, Button,  FormLabel, Grid,  Input, InputGroup, InputRightElement, Text,  Icon} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs"
import { useState} from "react";
import { useDispatch} from "react-redux";

import SocialButtons from "../Components/SocialButtons";
import useForm from "../Hooks/useform";
import { signup } from "../../Store/auth/auth.action";

export default function Signup() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [formError, setFormError] = useState("")

    const {creds, execute} = useForm()
    const dispath = useDispatch()
    function handleChange(e) {
        const {name, value} = e.target;
        execute(name, value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(creds.email==="" && creds.password===""){
            setFormError("Please enter your Email id & Password")
        }
        else if(creds.email===""){
            setFormError("Please enter your Email Id");
        }
        else if(creds.password===""){
            setFormError("Please provide your Password");
        }
        else{
            dispatch(signup(creds));
        }
    }
    return (
        <Grid h="93vh" bgImage={require("../Resources/background.jpg")} bgSize="100%" >
                <Grid gap="30px" p="30px" width="600px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" bgColor="white"> 
                    <Text fontSize='3xl'>Sign Up</Text>
                    <Box>
                        <FormLabel>Enter Email</FormLabel>
                        <Input name="email" onChange={handleChange}/>
                    </Box>
                    <Box>
                        <FormLabel>Enter Password</FormLabel>
                        <InputGroup>
                            <Input type={ show ? "text" : "password"} name="password" onChange={handleChange}/>
                            <InputRightElement width='4.5rem'>
                                <Icon as={show ? BsEyeSlashFill : BsEyeFill}  onClick={handleClick} />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Button id="signin">Sign Up</Button>
                    <Text>or</Text>
                    <SocialButtons />

                    <Text>Already have an account ?<Link to="/login"> Sign In </Link></Text>
            </Grid>
        </Grid>
    )
}