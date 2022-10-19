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
            <Button leftIcon={<FaGithub />}>
                GitHub
            </Button>
                    
        </Flex>
    )
}