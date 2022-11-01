import {Box, Button, Grid} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
 

export default function Navbar() {
    return (
        <Grid templateColumns="3fr 1fr" px={10} justifyContent="space-between"  boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" h="7vh" alignItems="center" mb={50}> 
            <Box textAlign="left">
                <NavLink to="/" id="logo">Lokesh-dc</NavLink>
            </Box>
           <Grid templateColumns="repeat(2,1fr)" alignItems="center">
                <NavLink to="/login">Sign In</NavLink>
                <NavLink to="/blogs">
                    <Button className="primary-button" colorScheme="transparent"> Start Writing </Button>
                    </NavLink>
           </Grid>
        </Grid>
    )
}