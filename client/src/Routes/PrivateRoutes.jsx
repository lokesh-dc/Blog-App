import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../Utils";


export default function PrivateRoutes({children}) {

    const navigate = useNavigate();
    useEffect(()=>{
        let token = localStorage.getItem("x_set") || false;
        let refresh = localStorage.getItem("y_set") || false;
        if(token===false){
            return navigate("/login")
        } 
        else{
            verifyToken(token, refresh).then((res)=>{
                if(!res.verified){
                    console.log("res",res)
                    return navigate("/login");
                }
            })
        }
    },[navigate])


    return(
        children
    )




}