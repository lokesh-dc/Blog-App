import { Box,  Img,  Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"


// import CommentSection from "./CommentsSection"

// "https://blog.ishandeveloper.com/static/ece63e3378de41355064a473e3c8d794/0acdf/thumb4.webp"

export default function BlogDiv({blogDetails}) {
    return (
        <Link to={`/blogs/${blogDetails._id}`}>
            <Box textAlign="left" border="1px solid rgba(0,0,0,0.1)" p="20px">
                <Img className="blog-img" src={blogDetails.src}  width="100%" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" mb="10px" />
                <Text fontSize="2xl" fontWeight="bold">{blogDetails?.title}</Text>
                <Text fontSize="sm" fontWeight="400">{blogDetails?.short_desc?.substring(0, 80)}..</Text>

                {/* <Grid templateColumns="repeat(2,1fr)" justifyContent="space-evenly" w="fit-content" gap={10}>
                    
                    <Flex className="like">
                        <Img src={require("../Resources/icons/like.png")} />
                        {blogDetails.likes}
                    </Flex>
                    <Text>Share</Text>
                </Grid> */}
                {/* <CommentSection blogid={blogDetails._id} comments={blogDetails?.comments} /> */}
            </Box>
        </Link> 
    )
}
