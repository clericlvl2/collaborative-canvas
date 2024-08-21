import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (id) => jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '1h'
});

export default generateToken;