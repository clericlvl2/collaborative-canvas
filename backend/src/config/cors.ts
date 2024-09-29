import cors from "cors";
import { Application } from "express";

export default function setupCors(app: Application): void {
    const allowedOrigins = ["http://localhost:*"];

    const corsOptions: cors.CorsOptions = {
        origin: allowedOrigins,
        credentials: true
    };

    app.use(cors(corsOptions));
};