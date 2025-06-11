import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import config from '../config/env.js';
import { logError } from '../utils/errorProcessor.js';
import Session from '../models/sessionModel.js';

export interface CustomRequest extends Request {
    _id?: Types.ObjectId;
}

export async function verifyUser(token: string): Promise<{
    isVerified: boolean;
    userId: Types.ObjectId;
}> {
    const session = await Session.findOne({ token });
    const decoded: JwtPayload = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const decodedUserId = decoded?._id;
    const isVerified = session?.user.toString() === decodedUserId;

    return {
        isVerified,
        userId: decodedUserId
    };
}

export async function protect(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    if (!req.headers.authorization?.startsWith('Bearer')) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const { isVerified, userId } = await verifyUser(token);

        if (!isVerified) {
            res.status(401).json({ message: 'Not authorized, no token' });
            return;
        }

        req._id = userId;
        next();
    }
    catch (error: unknown) {
        logError(error);
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}