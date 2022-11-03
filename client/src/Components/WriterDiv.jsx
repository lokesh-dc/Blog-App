import { Box, Flex, Img, Text } from "@chakra-ui/react";

export default function WriterDiv({email, createdOn}) {
    return (
        <Flex justifyContent="space-between">
                    <Box textAlign="left">
                        <Flex className="writer">
                            <Img src={require("../Resources/icons/avatar.png")} />
                            <Box>
                                <Text>{email}</Text>
                                <Text fontSize="1rem">{createdOn}</Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Img src={require("../Resources/icons/Sidebar/save.png")} w="25px" h="25px" />
                </Flex>
    )
}