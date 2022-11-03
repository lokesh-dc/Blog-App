import { Flex, Grid, Text } from "@chakra-ui/react";

import { IoShareOutline } from "react-icons/io5"
import { BsBookmarkPlus , BsHeart , BsHeartFill , BsChatRight } from "react-icons/bs"

export default function Interact({handleLike, isLiked,blogLikes, toggleComments,length}) {
    return (
        <Grid templateColumns="100px 100px" gap={10} className="like" my={30} justifyContent="space-between">
            <Flex>
                <Flex onClick={handleLike} >
                    {isLiked ?  <BsHeartFill color="red" /> : <BsHeart  />}
                    <Text>{blogLikes}</Text>
                </Flex>
                <Flex onClick={toggleComments}>
                    <BsChatRight />
                    <Text>{length}</Text>
                </Flex>
            </Flex>
            <Flex >
                <IoShareOutline />
                <BsBookmarkPlus/>
            </Flex>
        </Grid>
    )
}