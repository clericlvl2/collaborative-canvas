import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/env.js';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export interface CustomRequest extends Request {
    _id?: Types.ObjectId;
}

export function protect(req: CustomRequest, res: Response, next: NextFunction): void {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
            req._id = decoded._id;
            next();
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            else {
                console.error("Unknown error occured");
            }
            if (res.constructor.name === "WebSocketResponse") {
                return next(new Error("Not authorized, no token"));
            }
            else {
                res.status(401).json({ message: 'Not authorized, no token' });
            }
        }
    }
    else {
        if (res.constructor.name === "WebSocketResponse") {
            return next(new Error("Not authorized, no token"));
        }
        else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }
};