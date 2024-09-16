import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../utils/generateToken';

// Define an interface for extended Request to include `userId`
interface AuthenticatedRequest extends Request {
    userId?: string;
}

// Middleware to verify JWT
const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');
    console.log(token, "token");
    
    if (!token) {
        res.status(401).send("We need a token, please give it to us next time");
        return;  // Ensure to return after sending the response
    }
    
    jwt.verify(token, secretKey, (err, decoded: any) => {
        if (err) {
            console.log(err);
            res.status(401).json({ auth: false, message: "Failed to authenticate" });
            return;  // Ensure to return after sending the response
        }
        
        req.userId = decoded.userId; // Ensure `userId` matches the key used in `sign()`
        next();
    });
};

// Middleware to verify user
const verifyUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');
    console.log(token, "token");
    
    if (!token) {
        res.status(401).send("We need a token, please give it to us next time");
        return;  // Ensure to return after sending the response
    }
    
    jwt.verify(token, secretKey, (err, decoded: any) => {
        if (err) {
            console.log(err);
            res.status(401).json({ auth: false, message: "Failed to authenticate" });
            return;  // Ensure to return after sending the response
        }
        
        req.userId = decoded.userId; // Ensure `userId` matches the key used in `sign()`
        next();
    });
};

export { verifyJWT, verifyUser };

