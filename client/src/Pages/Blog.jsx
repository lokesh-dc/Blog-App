import { Box, Flex, Grid, Img, Text } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import {  getBlog } from "../Store/blogs/blogs.action";

import style from "../Styles/Blog.module.css"

import CommentSection, { socket } from "../Components/CommentsSection"
import Sidebar from "../Components/Sidebar";
import Interact from "../Components/Interact";
import WriterDiv from "../Components/WriterDiv";
export default function Blog() {

    const params = useParams();
    const id = params.id;
    const [blog, setBlog] = useState({});

    const [blogLikes, setBlogLikes] = useState(0);

    const [ isLiked, setLiked ] = useState(false);
    const [ show, setShow] = useState(false);

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
    function handleLike(){
        socket.emit("liked", {id});
    }
    function toggleComments(){
        setShow(!show);
    }
    return (
        <Grid templateColumns="100px 4fr 1fr" w="90%" m="auto" className={style.blog}>
            <Sidebar />
            <Grid p={30} height="auto">
                <WriterDiv email={blog?.user?.email} createdOn={blog?.createdOn}/>
                <Text fontSize="4xl" fontWeight="bold"> " {blog?.title} "</Text>
                <Text>{blog?.short_desc}</Text>
                <Img src={blog?.src} alt="blog-hero-img" margin="auto" my={30} />
                <div id="content">{blog?.content}</div>
                <Interact handleLike={handleLike} toggleComments={toggleComments} blogLikes={blogLikes} isLiked={isLiked} length={blog?.comments?.length}/>
            </Grid>
            {
                blog.comments && 
                <CommentSection blogid={blog?._id} show={show} comments={blog?.comments} />
            }
        </Grid>
    )
}