import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config();

const JWT_KEY = process.env.JWT_SECRET

function authMiddleware(req, res, next){
    const authHead = req.headers.authorization;
    if(!authHead){
        return res.status(411).json({
            message: "No authorization token sent"
        })
    }

    const authArray = authHead.split(" ");
    if(authArray[0] !== "Bearer"){
        return res.status(403).json({
            message: "Invalid Token"
        })
    }

    try {
        const JWTtoken = authArray[1];
        const decodedToken = jwt.verify(JWTtoken, JWT_KEY);
    
        req.userID = decodedToken.userID;
        
        next();
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(403).json({
            message: "Invalid token"
        })
    }
}

export default authMiddleware;