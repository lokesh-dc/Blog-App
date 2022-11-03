import { Grid } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
 

export default function Nav() {
    return (
        <Grid  px={10}  position="sticky" top={0} bg="white" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" h="7vh" alignItems="center"> 
            <NavLink to="/" id="logo">Lokesh-dc</NavLink>
        </Grid>
    )
}