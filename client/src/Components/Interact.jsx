import { Flex, Img, Text } from "@chakra-ui/react";

export default function Interact({handleLike, isLiked,blogLikes, toggleComments,length}) {
    return (
        <Flex  gap={10} className="like" >
        <Flex onClick={handleLike}>
            <Img src={isLiked ? require("../Resources/icons/like.png") : require("../Resources/icons/not_liked.png")} />
            {blogLikes}
        </Flex>
        <Flex onClick={toggleComments}>
            <Img src={require("../Resources/icons/comments.png")} />
            <Text>{length}</Text>
        </Flex>
        <Flex>
            <Img src={require("../Resources/icons/share.png")} />
            <Text>Share</Text>
        </Flex>
</Flex>
    )
}