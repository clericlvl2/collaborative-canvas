import cors from "cors";
import { Application } from "express";

const CORS_ORIGIN_REGEX = /^http:\/\/localhost:\d+$/;

export default function setupCors(app: Application): void {
    const corsOptions: cors.CorsOptions = {
        origin: CORS_ORIGIN_REGEX,
        credentials: true
    };

    app.use(cors(corsOptions));
};