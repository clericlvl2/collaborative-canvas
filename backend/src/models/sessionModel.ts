import { Schema, model, Types } from "mongoose";

export interface ISession {
    user: Types.ObjectId;
    token: string;
    createdAt: Date;
}

const SessionSchema = new Schema<ISession>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Session = model<ISession>("Session", SessionSchema);
export default Session;