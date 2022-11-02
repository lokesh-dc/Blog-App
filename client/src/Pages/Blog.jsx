import { Flex, Grid, Img, Text } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BlogLike, getBlog } from "../Store/blogs/blogs.action";

export default function Blog() {

    const params = useParams();
    const id = params.id;
    const [blog, setBlog] = useState({});

    const dispatch = useDispatch();

    useEffect(()=>{
        getBlog(id).then((res)=>{
            setBlog(res);
        })
    },[id])

    function handleClick(){
        dispatch(BlogLike(blog._id));
    }
    return (
        <Grid w="50%" m="auto" mt={50} border="1px solid" textAlign="left" p={30}>
            <Grid justifyContent="space-between" templateColumns="1fr 1fr">
                    <Text fontSize="1rem">{blog?.createdOn}</Text>
                    <Text>Save for Later</Text>
            </Grid>
            <Text fontSize="2xl" fontWeight="bold">{blog?.title}</Text>
            <Text>{blog?.short_desc}</Text>
            <Img src={blog?.src} alt="blog-hero-img" margin="auto" my={30} />
            <div id="content">
                {
                    blog?.content
                }
            </div>
            <Grid templateColumns="repeat(3,1fr)"  gap={10} className="like" >
                    <Flex onClick={handleClick}>
                        <Img src={require("../Resources/icons/like.png")} />
                        {blog?.likes}
                    </Flex>
                    <Flex>
                        <Img src={require("../Resources/icons/comments.png")} />
                        <Text>{blog?.comments?.length}</Text>
                    </Flex>
                    <Flex>
                        <Img src={require("../Resources/icons/share.png")} />
                        <Text>Share</Text>
                    </Flex>
            </Grid>
            {/* <CommentSection blogid={blogDetails._id} comments={blogDetails?.comments} /> */}
        </Grid>
    )
}