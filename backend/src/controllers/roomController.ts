import Room from '../models/roomModel.js';
import { Response } from "express";
import { CustomRequest } from '../middleware/authMiddleware.js';
import { Types } from 'mongoose';

export async function createRoom(req: CustomRequest, res: Response): Promise<void> {
    try {
        const { name }: { name: string} = req.body;
        const ownerId: Types.ObjectId | undefined = req._id;

        if (!ownerId) {
            res.status(400).send("Empty Owner ID");
        }

        const newRoom = new Room({
            name,
            owner: ownerId,
            participants: [ownerId]
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unknown error occured");
        }
        res.status(500).send("Failed to create room");
    }
};

export async function getRooms(req: CustomRequest, res: Response): Promise<void> {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unknown error occured");
        }
        res.status(500).send("Failed to retrieve rooms");
    }
};

export async function deleteRoom(req: CustomRequest, res: Response): Promise<void> {
    try {
        const roomId = req.params.roomId;

        if (!Types.ObjectId.isValid(roomId)) {
            res.status(400).json({ message: "Invalid room ID" });
        }

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            res.status(404).json({ message: "Room not found" });
        }

        res.sendStatus(204);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unknown error occured");
        }
        res.status(500).send("Failed to delete room");
    }
};