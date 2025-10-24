import Session, { SessionModel } from "../models/sessionModel";
import jwt from 'jsonwebtoken';
import Config from '../config/env.js';
import { Types } from "mongoose";

export const createSession = async (userId: string, token: string): Promise<SessionModel | void> => {
    try {
        return Session.create({ userId, token });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error creating session: ${error}`);
        }
    }
};

export const removeSession = async (token: string): Promise<SessionModel> => {
    const session = await Session.findOneAndDelete({ token });

    if (!session) {
        throw new Error("Session not found");
    }

    return session;
};

export const generateToken = (_id: Types.ObjectId): string => jwt.sign({ _id }, Config.JWTSecret, {
    expiresIn: '1d'
});