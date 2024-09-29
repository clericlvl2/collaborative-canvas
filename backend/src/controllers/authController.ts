import User from '../models/userModel.js';
import bcrypt  from 'bcryptjs';
import { generateToken } from '../services/authService.js';
import Session from '../models/sessionModel.js';
import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/authMiddleware.js';
import { Types } from 'mongoose';
import { logError } from '../utils/errorProcessor.js';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await user.save();
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token: generateToken(user._id)
        });
    }
    catch (error: unknown) {
        logError(error);
        res.status(500).send('Server error');
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: { email: string, password: string } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
           res.status(400).json({ message: "Invalid email or password" });
           return;
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
        }

        const token: string = generateToken(user._id);

        await Session.create({
            user: user._id,
            token
        });

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
    catch (error: unknown) {
        logError(error);
        res.status(500).send('Server error');
    }
};

export const logout = async (req: CustomRequest, res: Response): Promise<void> => {
    const currentUserId: Types.ObjectId | undefined = req._id;

    try {
        if (!currentUserId) {
            res.status(400).send("Empty Current User ID");
        }

        if (req.headers.authorization) {
            const token: string = req.headers.authorization.split(' ')[1];

            const deletedSession = await Session.findOneAndDelete({ token });

            if (!deletedSession) {
                res.status(404).json({ message: "Session not found" });
            }

            res.sendStatus(204);
        }
        else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }
    catch (error: unknown) {
        logError(error);
        res.status(500).send("Server error");
    }
};