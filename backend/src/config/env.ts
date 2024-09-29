import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    jwtSecret: process.env.JWT_SECRET || "",
    mongoUri: process.env.MONGO_URI || "",
    ioPort: process.env.IO_PORT ? parseInt(process.env.IO_PORT, 10) : 3000
};

export default config;