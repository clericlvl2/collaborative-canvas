import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/env.js';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { logError } from '../utils/errorProcessor.js';
import Session from '../models/sessionModel.js';

export interface CustomRequest extends Request {
    _id?: Types.ObjectId;
}

export async function protect(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token: string = req.headers.authorization.split(' ')[1];
            const session = await Session.findOne({ token });
            const decoded: JwtPayload = jwt.verify(token, config.jwtSecret) as JwtPayload;
            console.log(session?.user);
            if (session?.user.toString() === decoded?._id) {
                req._id = decoded._id;
                next();
            }
            else {
                if (res.constructor.name === "WebSocketResponse") {
                    return next(new Error("Not authorized, no token"));
                }
                else {
                    res.status(401).json({ message: 'Not authorized, no token' });
                }
            }
        }
        catch (error: unknown) {
            logError(error);
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