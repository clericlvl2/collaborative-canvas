import jwt from 'jsonwebtoken';

export async function protect(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }
};