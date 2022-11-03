import { Flex, Grid, Img } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import style from "../Styles/Sidebar.module.css"

export default function Sidebar() {
    return(
        <Grid>
            <NavLink to="/">
                <Img src={require("../Resources/icons/logo.png")}/>
                </NavLink>
            <Flex alignItems="center" className={style.sidebar} flexDirection="column">
                <NavLink>
                    <Img src={require("../Resources/icons/Sidebar/home.png")} alt="home" />
                </NavLink>
                <Img src={require("../Resources/icons/Sidebar/noti.png")} alt="home" />
            </Flex>
        </Grid>
    )
}