import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export function protect(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret);
            req._id = decoded._id;
            next();
        }
        catch (error) {
            console.error(error.message);
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