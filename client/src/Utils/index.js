import axios from "axios";

export const verifyToken = async (token, refresh) => {
    let response = await axios.get(`http://localhost:8080/users/token`,{headers: {"token" : token}});
    if(!response.data.verified){
        let refreshRes = await axios.get(`http://localhost:8080/users/refreshtoken`,{headers: {"refresh" : refresh}});
        return refreshRes.data;
    }
    return response.data;
}