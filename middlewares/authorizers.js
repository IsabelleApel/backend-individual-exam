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
                status : 401,
                message : 'No valid token'
            })  
        }
    } else {
        next({
            status : 401,
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
                    status : 403,
                    message : 'Access denied: admin role required'
                })  
            }
        } else {
            next({
                status : 401,
                message : 'No token found'
            })
        }
}

