import {  Box, Button,  FormLabel, Grid,  Input, InputGroup, InputRightElement, Text,  Icon } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs"
import React, { useEffect, useState } from "react";
import SocialButtons from "../Components/SocialButtons";

import { useDispatch, useSelector} from "react-redux";
import useForm from "../Hooks/useform";
import { login } from "../Store/auth/auth.action";
import Nav from "../Components/UserNav";


export default function Login() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    // form input error
    const { loading, error, data } = useSelector((store)=> store.auth);

    // form input error
    const [formError, setFormError] = useState("")

    // form crdentails
    const {creds, execute} = useForm();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    // function to capture changes in form input
    function handleChange(e) {
        setFormError("")
        const {name, value} = e.target;
        execute(name, value);
    }

    // function to handle form submnit
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
            dispatch(login(creds))
        }                                       
    }

    useEffect(()=>{
        if(data.message==="Verify your Email Id first"){
            navigate("/verify")
        }
    },[data.message, navigate])

    useEffect(()=>{
        if(data.token){
            navigate("/blogs");
        }
    },[data.token, navigate])

    useEffect(()=>{
        if(error!==""){
            setFormError(error);
        }
    },[error])

    console.log(data)

    return (
        <>
        <Nav />
        <Grid h="93vh" bgImage={require("../Resources/background.jpg")} bgSize="100%">
                <Grid gap="30px" p="30px" width="600px" margin="auto" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" bgColor="white"> 
                    <Text fontSize='3xl'>Sign In</Text>
                    <Box>
                        <FormLabel>Enter Email</FormLabel>
                        <Input name="email" onChange={handleChange} />
                    </Box>
                    <Box>
                        <FormLabel>Enter Password</FormLabel>
                        <InputGroup>
                            <Input type={ show ? "text" : "password"} name="password" onChange={handleChange} />
                            <InputRightElement width='4.5rem'>
                                <Icon as={show ? BsEyeSlashFill : BsEyeFill}  onClick={handleClick} />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    {
                        formError && 
                        <Text color="red" bg="red.100" p="8px 10px">{formError}</Text>
                    }
                    <Button id="signin" onClick={handleSubmit} isLoading={loading} loadingText="Signing in..">Sign In</Button>
                    <Link to="/reset-password/getotp">Forgot Password?</Link>
                    <Text>or</Text>
                    <SocialButtons />
                    <Text>Don't have an account? <Link to="/signup"> Sign Up </Link></Text>
            </Grid>
        </Grid>
        </>
    )
} 