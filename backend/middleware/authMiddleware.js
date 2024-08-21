import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export async function protect(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret);
            req._id = decoded._id;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }
    else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};