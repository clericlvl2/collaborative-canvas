import { Schema, model, Types } from "mongoose";

export interface SessionModel {
    token: string;
    user: Types.ObjectId;
    createdAt: Date;
}

const SessionSchema = new Schema<SessionModel>({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Session = model<SessionModel>("Session", SessionSchema);
export default Session;