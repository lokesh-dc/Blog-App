import {  Button, Flex } from "@chakra-ui/react";

import {FaFacebook, FaGoogle, FaGithub} from "react-icons/fa"


export default function SocialButtons() {

    return (
        <Flex id="Social-buttons">
            <Button leftIcon={<FaFacebook />}>
                Facebook
            </Button>
            <Button  leftIcon={<FaGoogle />}>
                Google
            </Button>
            <a href="https://github.com/login/oauth/authorize?client_id=2bc9e0737c50f22d2780" >
                <Button leftIcon={<FaGithub />}> GitHub </Button>
            </a>
                    
        </Flex>
    )
}