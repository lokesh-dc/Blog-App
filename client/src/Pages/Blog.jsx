import { Flex, Grid, Img, Text } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import {  getBlog } from "../Store/blogs/blogs.action";
import CommentSection, { socket } from "../Components/CommentsSection"
export default function Blog() {

    const params = useParams();
    const id = params.id;
    const [blog, setBlog] = useState({});

    const [blogLikes, setBlogLikes] = useState(0);

    const [ isLiked, setLiked ] = useState(false);

    useEffect(()=>{
        getBlog(id).then((res)=>{
            setBlog(res);
            setBlogLikes(res.likes);
        })
    },[id])

    useEffect(()=>{
        socket.on('connect', ()=> console.log("connected"))

        socket.on("liked",({id, likes})=>{
            if(id===blog._id){
                setBlogLikes(likes);
                setLiked(true)
            }
        })
    },[blog._id])

    function handleClick(){
        socket.emit("liked", {id});
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
                        <Img src={isLiked ? require("../Resources/icons/like.png") : require("../Resources/icons/not_liked.png")} />
                        {blogLikes}
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
            {/* <CommentSection blogid={blog?._id} comments={blog?.comments} /> */}
        </Grid>
    )
}