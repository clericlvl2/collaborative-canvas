import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    url: process.env.URL || "http://localhost",
    mongoUri: process.env.MONGO_URI,
    ioPort: process.env.IO_PORT || 3000
};

export default config;