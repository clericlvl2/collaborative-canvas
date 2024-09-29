import { Types } from "mongoose";
import Room, { IRoom } from "../models/roomModel.js";

export const getRoomStateFromDB = async(roomId: Types.ObjectId): Promise<IRoom> => {
    try {
        const room = await Room.findById(roomId);

        if (!room) {
            throw new Error("Room not found");
        }

        const roomState = {
            canvasData: room.canvasData,
            participants: room.participants,
            chatHistory: room.chatHistory.slice(0, 50),
            roomName: room.name,
            createdAt: room.createdAt,
            roomOwner: room.owner,
            updatedAt: room.updatedAt,
            name: room.name,
            owner: room.owner
        };

        return roomState;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching room state:", error.message);
        }
        else {
            console.error("Unknown error occured");
        }
        throw error;
    }
};