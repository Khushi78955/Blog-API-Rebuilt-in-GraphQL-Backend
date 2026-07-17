import jwt from "jsonwebtoken";

export function authenticate(req){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return null;
    }
    if(!authHeader.startsWith("Bearer ")){
        return null;
    }

    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return payload;
    } catch {
        return null;
    }
}