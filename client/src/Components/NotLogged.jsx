import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import style from "../Styles/NotLOgged.module.css"

export default function NotLogged() {

    return(
        <Flex className={style.notLogged} gap="20px" justifyContent="space-between">
            <Text>Read the rest of the story with free account</Text>
            <Link to="/signup">
                <Button className="primary-button" colorScheme="transparent" borderRadius={0}>Sign up</Button>
            </Link>
            {/* <Text>Already have an account?<Link>Sign in</Link></?Text> */}
        </Flex>
    )
}