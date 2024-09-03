import cors from "cors";

export default function setupCors(app) {
    const allowedOrigins = ["http://localhost:*"];

    const corsOptions = {
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    };

    app.use(cors(corsOptions));
};