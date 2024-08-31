import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const generateToken = (_id) => jwt.sign({ _id }, config.jwtSecret, {
    expiresIn: '1h'
});

export default generateToken;