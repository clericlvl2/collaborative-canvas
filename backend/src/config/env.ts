import dotenv from "dotenv";
dotenv.config();

const Config = {
    Port: {
        Api: process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 5000,
        Socket: process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT, 10) : 4000,
    },
    JWTSecret: process.env.JWT_SECRET || "",
    DBUri: process.env.DB_URI || ""
};

export default Config;