import User from '../models/User.js';
import bcrypt  from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User ({
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
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export async function login (req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token: generateToken(user._id)
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};