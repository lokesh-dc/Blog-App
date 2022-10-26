import { Box, Grid,  Text } from "@chakra-ui/react"
import CommentSection from "./CommentsSection"

export default function BlogDiv({blogDetails}) {
    return (
        <Box border="1px solid red" p="30px">
            <Text>{blogDetails.title}</Text>
            <Text>{blogDetails.description}</Text>

            <Grid templateColumns="repeat(2,1fr)" justifyContent="space-evenly" p="30px" border="1px solid">
                <Text>Like: {blogDetails.likes}</Text>
                <Text>Share</Text>
            </Grid>
            <CommentSection comments={blogDetails?.comments} />
        </Box>
    )
}