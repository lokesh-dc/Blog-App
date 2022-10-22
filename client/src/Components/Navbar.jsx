import {Grid, Text} from "@chakra-ui/react"

export default function Navbar() {
    return (
        <Grid templateColumns="2fr 1fr 1fr" justifyContent="start" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" h="7vh" alignItems="center"> 
            <Text>Lokesh-dc</Text>
            <Text>Account</Text>
            <Text>Blogs</Text>
        </Grid>
    )
}