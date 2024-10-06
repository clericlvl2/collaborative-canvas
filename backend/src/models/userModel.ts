import { Schema,  model } from 'mongoose';

interface UserModel {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

const userSchema = new Schema<UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String
},
{
    timestamps: true
});

const User = model<UserModel>("User", userSchema);
export default User;