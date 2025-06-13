import { verifyToken } from "../utils/index.js";
import { getUserByUserId } from "../services/users.js";

export function authenticateUser(req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = verifyToken(token);
        if(decoded){
            req.user = decoded;
            next();
        } else {
            next({
                status : 400,
                message : error.name === 'TokenExpiredError' 
                    ? 'Session expired. Please log in again.' 
                    : 'Invalid token'
            })  
        }
    } else {
        next({
            status : 400,
            message : 'No token provided'
        })
    }
}

export async function authorizeAdmin(req, res, next) {
        if(req.user) {
            const user = await getUserByUserId(req.user.userId);
            if(user && user.role === 'admin') {
                next();
            } else {
                next({
                    status : 400,
                    message : 'No access'
                })  
            }
        } else {
            next({
                status : 400,
                message : 'No token found'
            })
        }
}

