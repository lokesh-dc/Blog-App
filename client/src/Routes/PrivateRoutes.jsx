import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function PrivateRoutes({children}) {

    const navigate = useNavigate();
    
    async function verifyToken(token, refresh) {
        let response = await axios.get(`http://localhost:8080/users/token`,{headers: {"token" : token}});
        if(!response.data.verified){
            let refreshRes = await axios.get(`http://localhost:8080/users/refreshtoken`,{headers: {"refresh" : refresh}});
            return refreshRes.data;
        }
        return response.data;
    }
    
    
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