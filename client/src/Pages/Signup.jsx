import {  Box, Button,  FormLabel, Grid,  Input, InputGroup, InputRightElement, Text,  Icon} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs"
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";

import SocialButtons from "../Components/SocialButtons";
import useForm from "../Hooks/useform";
import { signup } from "../Store/auth/auth.action";

export default function Signup() {
    // password show / hide
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

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
            dispatch(signup(creds))
        }                                       
    }
    useEffect(()=>{
        if(data.message){
            navigate("/verify")
        }
    },[data.message, navigate])

    useEffect(()=>{
        if(error!==""){
            setFormError(error);
        }
    },[error])

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
                    {
                        formError && 
                        <Text color="red" bg="red.100" p="8px 10px">{formError}</Text>
                    }
                    <Button id="signin" onClick={handleSubmit} isLoading={loading} loadingText="Signing up..">Sign Up</Button>
                    <Text>or</Text>
                    <SocialButtons />

                    <Text>Already have an account ?<Link to="/login"> Sign In </Link></Text>
            </Grid>
        </Grid>
    )
}