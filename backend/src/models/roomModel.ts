import { Schema, model, Types } from "mongoose";

export interface ChatMessageModel {
    message: string;
    senderName: string;
    sender: Types.ObjectId;
    timestamp?: Date;
}

export interface RoomModel {
    name: string;
    owner: Types.ObjectId;
    participants?: Types.ObjectId[];
    canvasData?: string;
    createdAt: Date;
    updatedAt: Date;
    chatHistory: ChatMessageModel[];
}

const roomSchema = new Schema<RoomModel>({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    canvasData: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    chatHistory: [
        {
            message: String,
            sender: { 
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Room = model<RoomModel>("Room", roomSchema);
export default Room;