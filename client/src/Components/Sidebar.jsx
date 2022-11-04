import { Divider, Flex, Grid, Img } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import style from "../Styles/Sidebar.module.css"

import { TfiHome } from "react-icons/tfi"
import { BsBookmarks, BsBell, BsFileRichtext } from "react-icons/bs"
import { RiEditBoxLine } from "react-icons/ri"
export default function Sidebar() {
    return(
        <Grid className={style.sidebar}>
            <NavLink to="/blogs" title="Home" >
                <Img src={require("../Resources/icons/logo.png")} />
                </NavLink>
            <Flex flexDirection="column">
                <NavLink to="/blogs" title="Home" className={({ isActive }) => (isActive ? style.active : style.inactive)}><TfiHome /></NavLink>
                <NavLink title="Notifications" to="/saved" className={({ isActive }) => (isActive ? style.active : style.inactive)}> <BsBookmarks /> </NavLink>
                <NavLink title="Bookmarks" to="/notifications" className={({ isActive }) => (isActive ? style.active : style.inactive)}> <BsBell /> </NavLink>
                <NavLink title="Bookmarks" to="/stories" className={({ isActive }) => (isActive ? style.active : style.inactive)}><BsFileRichtext /></NavLink>
                <Divider />
                <NavLink title="Bookmarks" to="/write" className={({ isActive }) => (isActive ? style.active : style.inactive)}><RiEditBoxLine /></NavLink>
            </Flex>
        </Grid>
    )
}