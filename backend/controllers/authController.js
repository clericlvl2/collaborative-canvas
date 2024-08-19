import User from '../models/User.js';
import bcrypt  from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User ({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};