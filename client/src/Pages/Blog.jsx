import { Box, Grid, Img, Text } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import {  getBlog } from "../Store/blogs/blogs.action";

import style from "../Styles/Blog.module.css"

import CommentSection, { socket } from "../Components/CommentsSection"
import Sidebar from "../Components/Sidebar";
import Interact from "../Components/Interact";
import WriterDiv from "../Components/WriterDiv";
import SideBlog from "../Components/SideBlogs";
import { verifyToken } from "../Utils";
import NotLogged from "../Components/NotLogged";
import { useDispatch } from "react-redux";
import { bookmarksFetch } from "../Store/bookmarks/bookmark.acion";


export default function Blog() {

    const params = useParams();
    const dispatch = useDispatch();


    const id = params.id;
    const [blog, setBlog] = useState({});

    const [blogLikes, setBlogLikes] = useState(0);

    const [ isLiked, setLiked ] = useState(false);
    const [ show, setShow] = useState(false);

    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        getBlog(id).then((res)=>{
            setBlog(res);
            setBlogLikes(res.likes);
        })
    },[id])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [id])

    useEffect(()=>{
        let token = localStorage.getItem("x_set") || false;
        let refresh = localStorage.getItem("y_set") || false;
        if(!token){
            return setIsLogged(false);
        }
        verifyToken(token,refresh).then((res)=>{
            if(res.verified){
                setIsLogged(true);
                let token = localStorage.getItem("x_set") || false;
                dispatch(bookmarksFetch({token}))
            }
        })
    },[dispatch])


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
        <Grid className={style.blog} templateColumns= "50px 5fr 1fr">
            <Sidebar />
            <Grid px="100px" pt="50px" height="auto">
                {
                    !isLogged && <NotLogged />
                }
                <WriterDiv email={blog?.user?.email} createdOn={blog?.createdOn}/>
                <Text className="heading">{blog?.title}</Text>
                <Text fontSize="1.5rem">{blog?.short_desc}</Text>
                <Img src={blog?.src} alt="blog-hero-img" w="100%" margin="auto" my={30} />
                <Box id="content" textAlign="justify">
                    {/* {blog?.content} */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Venenatis urna cursus eget nunc scelerisque viverra mauris. Elementum nisi quis eleifend quam. Mattis aliquam faucibus purus in massa. Semper quis lectus nulla at volutpat diam ut. Ornare quam viverra orci sagittis eu. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Et magnis dis parturient montes nascetur ridiculus mus mauris. Odio euismod lacinia at quis risus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Faucibus nisl tincidunt eget nullam non nisi. Eget mi proin sed libero enim sed faucibus turpis in. In hac habitasse platea dictumst vestibulum rhoncus est. Sed risus ultricies tristique nulla aliquet enim tortor.

                    Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Urna nec tincidunt praesent semper feugiat nibh. Sed libero enim sed faucibus. Turpis egestas sed tempus urna et pharetra. Sit amet dictum sit amet justo. Vel orci porta non pulvinar neque. Id porta nibh venenatis cras. Faucibus turpis in eu mi bibendum neque egestas. Imperdiet proin fermentum leo vel orci porta. Leo vel fringilla est ullamcorper. Senectus et netus et malesuada fames ac turpis egestas sed. Purus in mollis nunc sed id semper risus in hendrerit. Nisi scelerisque eu ultrices vitae auctor eu. Velit sed ullamcorper morbi tincidunt ornare massa. Id consectetur purus ut faucibus. Feugiat nibh sed pulvinar proin gravida hendrerit. Vulputate mi sit amet mauris commodo quis imperdiet. In eu mi bibendum neque egestas. Tristique sollicitudin nibh sit amet commodo nulla facilisi.

                    Senectus et netus et malesuada fames. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Integer vitae justo eget magna fermentum iaculis eu. Non odio euismod lacinia at. Nunc sed id semper risus. Suspendisse in est ante in nibh mauris cursus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Velit egestas dui id ornare arcu odio ut sem. Nibh ipsum consequat nisl vel. Luctus accumsan tortor posuere ac ut consequat semper. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Orci eu lobortis elementum nibh. Ut venenatis tellus in metus vulputate eu scelerisque felis. Lacus viverra vitae congue eu consequat. Cursus turpis massa tincidunt dui ut. In nibh mauris cursus mattis molestie a iaculis. Sed arcu non odio euismod. Mi quis hendrerit dolor magna eget est lorem. Pellentesque eu tincidunt tortor aliquam.

                    Aliquet porttitor lacus luctus accumsan tortor posuere ac. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Cursus euismod quis viverra nibh cras pulvinar. Massa eget egestas purus viverra. At tellus at urna condimentum mattis pellentesque id nibh. Libero id faucibus nisl tincidunt eget nullam non nisi est. Sit amet facilisis magna etiam tempor orci eu lobortis elementum. Nulla aliquet enim tortor at auctor urna nunc. Ante in nibh mauris cursus mattis molestie a. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Non odio euismod lacinia at quis risus. Quisque id diam vel quam elementum pulvinar etiam. Faucibus a pellentesque sit amet. Sed risus ultricies tristique nulla aliquet enim tortor at auctor.

                    Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Iaculis nunc sed augue lacus viverra vitae. Orci a scelerisque purus semper eget. At lectus urna duis convallis convallis tellus id interdum velit. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Nam libero justo laoreet sit amet cursus sit amet. Etiam erat velit scelerisque in dictum non. Scelerisque varius morbi enim nunc. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Integer vitae justo eget magna fermentum. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Sapien faucibus et molestie ac feugiat.

                    Volutpat consequat mauris nunc congue. Habitasse platea dictumst vestibulum rhoncus est. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Velit ut tortor pretium viverra. Porta nibh venenatis cras sed felis eget velit. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Amet est placerat in egestas erat. Facilisis sed odio morbi quis commodo odio aenean sed. Ut tellus elementum sagittis vitae. Purus sit amet volutpat consequat mauris nunc congue. Netus et malesuada fames ac turpis egestas integer eget. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Velit scelerisque in dictum non consectetur a erat nam at. Velit sed ullamcorper morbi tincidunt ornare. Felis bibendum ut tristique et egestas. Cursus in hac habitasse platea dictumst quisque sagittis purus. Ultrices gravida dictum fusce ut placerat orci. At elementum eu facilisis sed odio morbi quis. Sagittis orci a scelerisque purus semper eget.

                    Blandit turpis cursus in hac. Volutpat ac tincidunt vitae semper quis lectus nulla. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Suscipit adipiscing bibendum est ultricies integer quis. Nisl purus in mollis nunc sed. Odio ut sem nulla pharetra diam sit amet. Aenean euismod elementum nisi quis eleifend quam. Aliquet risus feugiat in ante. Porttitor rhoncus dolor purus non enim praesent. Habitant morbi tristique senectus et netus et malesuada fames. Enim nunc faucibus a pellentesque sit amet. Sollicitudin ac orci phasellus egestas tellus rutrum. Tristique et egestas quis ipsum suspendisse. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Nulla at volutpat diam ut venenatis tellus. Lorem ipsum dolor sit amet. Nunc mi ipsum faucibus vitae. Varius morbi enim nunc faucibus a pellentesque sit. Suspendisse in est ante in nibh mauris cursus. Maecenas accumsan lacus vel facilisis volutpat est velit egestas.

                    Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Ullamcorper a lacus vestibulum sed arcu non. Aliquam faucibus purus in massa tempor nec feugiat nisl. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Faucibus et molestie ac feugiat sed. Lectus vestibulum mattis ullamcorper velit sed. Pharetra vel turpis nunc eget lorem dolor. Ipsum faucibus vitae aliquet nec ullamcorper sit. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Tempor orci eu lobortis elementum. Sed risus ultricies tristique nulla aliquet enim tortor. Justo eget magna fermentum iaculis eu. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Fames ac turpis egestas sed tempus urna. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. In tellus integer feugiat scelerisque varius morbi. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean.

                    Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Porttitor eget dolor morbi non arcu risus. Elementum sagittis vitae et leo duis ut diam quam nulla. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Varius duis at consectetur lorem. Velit laoreet id donec ultrices tincidunt arcu. Tortor consequat id porta nibh venenatis cras sed felis. Et ultrices neque ornare aenean euismod elementum nisi quis. Facilisis volutpat est velit egestas dui. Augue ut lectus arcu bibendum. At consectetur lorem donec massa sapien. Lorem sed risus ultricies tristique nulla aliquet. Ut morbi tincidunt augue interdum velit euismod. Scelerisque viverra mauris in aliquam sem fringilla ut.

                    Elementum facilisis leo vel fringilla est ullamcorper. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Nec nam aliquam sem et tortor. Metus dictum at tempor commodo ullamcorper a lacus. Sed vulputate odio ut enim blandit. Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Odio pellentesque diam volutpat commodo. Et molestie ac feugiat sed lectus. Arcu non odio euismod lacinia. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Penatibus et magnis dis parturient montes nascetur ridiculus mus.
                </Box>
                <Interact handleLike={handleLike} toggleComments={toggleComments} blogLikes={blogLikes} isLiked={isLiked} length={blog?.comments?.length}/> : 
            </Grid>
            {
                blog.comments && show ?
                <CommentSection blogid={blog?._id} show={show} comments={blog?.comments} length={blog?.comments?.length} /> :
                <SideBlog writer={blog?.user}/> 
            }
        </Grid>
    )
}