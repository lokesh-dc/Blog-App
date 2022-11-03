import { Divider, Flex, Grid, Img } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import style from "../Styles/Sidebar.module.css"

import { TfiHome } from "react-icons/tfi"
import { BsBookmarks, BsBell, BsFileRichtext } from "react-icons/bs"
import { RiEditBoxLine } from "react-icons/ri"
export default function Sidebar() {
    return(
        <Grid className={style.sidebar}>
            <NavLink to="/" title="Home" >
                <Img src={require("../Resources/icons/logo.png")} />
                </NavLink>
            <Flex flexDirection="column">
                <NavLink title="Home" color="pink">
                    {/* <Img src={require("../Resources/icons/Sidebar/home.png")} alt="Home" /> */}
                    <TfiHome />
                </NavLink>
                <NavLink title="Notifications">
                    <BsBell />
                    {/* <Img src={require("../Resources/icons/Sidebar/noti.png")} alt="Notifications" /> */}
                </NavLink>
                <NavLink title="Bookmarks">
                    <BsBookmarks />
                    {/* <Img src={require("../Resources/icons/Sidebar/bookmarks.png")} alt="Bookmarks" /> */}
                </NavLink>
                <NavLink title="Bookmarks">
                    <BsFileRichtext />
                </NavLink>
                <Divider />
                <NavLink title="Bookmarks">
                    <RiEditBoxLine />
                </NavLink>
            </Flex>
        </Grid>
    )
}