import cors from "cors";
import { Application } from "express";

const LOCAL_DEV_URL_REGEX = /^http:\/\/localhost:\d+$/;

export default function setupCors(app: Application): void {
    const corsOptions: cors.CorsOptions = {
        origin: LOCAL_DEV_URL_REGEX,
        credentials: true
    };

    app.use(cors(corsOptions));
};