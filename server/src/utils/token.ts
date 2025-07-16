import jwt from "jsonwebtoken";

//generate token
export function generate_token(payload: object): string {
   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXPIRESIN}); 
}

//verify token
export function verify_token(token: string): object | null {
   try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error("Token verification error: ", err);
        return null;
    }
}
