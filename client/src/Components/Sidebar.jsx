import { Box, Button, Divider, Flex, Grid, Img, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../Styles/Sidebar.module.css"

import { TfiHome } from "react-icons/tfi"
import { BsBookmarks, BsBell, BsFileRichtext } from "react-icons/bs"
import { RiEditBoxLine } from "react-icons/ri"
import { useEffect } from "react";
import { verifyToken } from "../Utils";
import { useState } from "react";
import { logout, userDetails } from "../Store/auth/auth.action";
import { useDispatch } from "react-redux";
export default function Sidebar() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false);

    const [ user, setUser] = useState({});
    useEffect(()=>{
        let token = localStorage.getItem("x_set") || false;
        let refresh = localStorage.getItem("y_set") || false;

        if(!token){
            return setIsLogged(false);
        }
        verifyToken(token,refresh).then((res)=>{
            if(res.verified){
                let token = localStorage.getItem("x_set") || false;
                setIsLogged(true);
                userDetails(token).then((res)=>{
                    setUser(res)
                })
            }
        })
    },[])


    const handleLogout = () =>{
            dispatch(logout());
            setIsLogged(false);
            navigate("/");       
    }

    return(
        <Grid className={style.sidebar}>
            <NavLink to="/blogs" title="Home" >
                <Img src={require("../Resources/icons/logo.png")} />
            </NavLink>
            <Flex flexDirection="column">
                <NavLink to="/blogs" title="Home" className={({ isActive }) => (isActive ? style.active : style.inactive)}><TfiHome /></NavLink>
                <NavLink title="Bookmarks" to="/saved" className={({ isActive }) => (isActive ? style.active : style.inactive)}> <BsBookmarks /> </NavLink>
                <NavLink title="Notifications" to="/notifications" className={({ isActive }) => (isActive ? style.active : style.inactive)}> <BsBell /> </NavLink>
                <NavLink title="Stories" to="/stories" className={({ isActive }) => (isActive ? style.active : style.inactive)}><BsFileRichtext /></NavLink>
                <Divider />
                <NavLink title="Write Story" to="/write_story" className={({ isActive }) => (isActive ? style.active : style.inactive)}><RiEditBoxLine /></NavLink>
            </Flex>
            {
                isLogged &&
                <Box>
                    <Menu >
                        <MenuButton>
                            <Img src={require("../Resources/icons/avatar.png")} />
                        </MenuButton>
                        <MenuList className={style.user}>
                            <MenuItem>Become a Writer</MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <Divider />
                            <MenuItem><Text>{user?.email}</Text></MenuItem>
                            <MenuItem><Button className="secondary_button" display="block" margin="auto" colorScheme="trasnsparent" color="black">View Profile</Button></MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            }
           
        </Grid>
    )
}