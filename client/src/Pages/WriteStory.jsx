import { Box, Button, Flex, Grid, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { userDetails } from "../Store/auth/auth.action";
import { addBlog } from "../Store/blogs/blogs.action";

import style from "../Styles/WriteStory.module.css"
import { verifyToken } from "../Utils";

const initState = {
    title : "",
    short_desc : "",
    description : ""
}
export default function WriteStory() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [state, setState] = useState(initState);
    const [user, setUser] = useState({});
    const [imgfile, uploading] = useState([])

    const [formError, setFormError] = useState("")

    function  handleData(e){
        const {name, value} = e.target;
        setFormError("");
        setState({...state, [name] : value})
    }



    const imgFilehandler = (e) => {
        if (e.target.files.length !== 0) {
          uploading(imgfile => [...imgfile, URL.createObjectURL(e.target.files[0])])
        }
    }

    const saveImage = (e) =>{
        e.preventDefault();
        setState({
            ...state,
            src : imgfile[0]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(state.title===""){
            return setFormError("Title fields can't be empty !");
        }
        let token = localStorage.getItem("x_set") || false;
        let refresh = localStorage.getItem("y_set") || false;
        verifyToken(token,refresh)
        .then((res)=>{
            if(res.verified){
                let token = localStorage.getItem("x_set") || false;
                dispatch(addBlog({blog: state, token}))        
                navigate("/stories");
            }
        })
    }


    useEffect(()=>{
        let token = localStorage.getItem("x_set") || false;
        let refresh = localStorage.getItem("y_set") || false;

        if(!token){
            return navigate("/");
        }
        verifyToken(token,refresh).then((res)=>{
            if(res.verified){
                let token = localStorage.getItem("x_set") || false;
                userDetails(token).then((res)=>{
                    setUser(res)
                })
            }
        })
    },[navigate])

    console.log("blog", state);


    return (
        <Grid templateColumns= "100px 5fr">
            <Sidebar />
            <Box textAlign="left" className={style.writeStory} >
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="3rem">Write your Story</Text>
                    <Flex border="1px solid black" alignItems="center" borderRadius="10px" padding="10px 20px" gap="10px">
                        <Img src={require("../Resources/icons/avatar.png")} w="30px" height="30px" />
                        <Text fontSize="md" fontWeight="bold">{user?.email}</Text>
                    </Flex>
                </Flex>
                <form>
                    <input type="text" placeholder="title" name="title" autoFocus value={state.title} onChange={handleData} />
                    <input type="text" placeholder="Summary" name="short_desc" value={state.short_desc} onChange={handleData} />
                    <Flex alignItems="center" gap="10px" >
                        <label>Upload Cover photo : </label>
                        <input type="file" onChange={imgFilehandler} name="src" />
                        <Button className="secondary_button" width="fit-content" onClick={saveImage} disabled={imgfile[0]=== undefined ? true : false}>Save</Button>
                    </Flex>
                    <textarea type="text" placeholder="Tell your Story..." name="description" rows="14" value={state.description} onChange={handleData} />
                    {
                        formError && <Text className={style.error}>{formError}</Text>
                    }
                    <Flex gap="10px" >
                        <Button className="secondary_button" colorScheme="transparent" color="black" borderRadius="20px" onClick={()=> {setState(initState); }}>Clear</Button>
                        <Button colorScheme="transparent" onClick={handleSubmit} >Publish</Button>
                    </Flex>
                </form>
            </Box>
        </Grid>
    )
} 