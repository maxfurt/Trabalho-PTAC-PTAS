import { jwtVerify } from "jose";
import { decode } from "jsonwebtoken";
const validateToken = async(token)=>{
    const secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    try{
    /*const isTokenValidate = await jwtVerify(token,new TextEncoder().encode(secret));

        if (isTokenValidate) {
            return true
            
    }*/
        const isTokenValidate = await decode(token);

        if (isTokenValidate) {
            return true
            
        }
        }catch{
            return false
        }
    
}   
export {validateToken};