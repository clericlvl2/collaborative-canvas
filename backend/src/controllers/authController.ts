import User from '../models/userModel.js';
import bcrypt  from 'bcryptjs';
import { generateToken } from '../services/authService.js';
import Session from '../models/sessionModel.js';
import { Request, Response } from 'express';

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
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unknown error occured");
        }
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
            token: token
        });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unknown error occured");
        }
        res.status(500).send('Server error');
    }
};