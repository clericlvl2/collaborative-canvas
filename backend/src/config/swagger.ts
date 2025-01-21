import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export default function swaggerDocs(app: Application): void {
    const options: swaggerJSDoc.OAS3Options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Collaborative Canvas API",
                version: "1.0.0",
                description: "API for collaborative canvas platform"
            },
            servers: [
                {
                    url: "https://collaborative-canvas.com/api"
                },
                {
                    url: "http://localhost:5000/api"
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            }
        },
        apis: ["./dist/routes/*.js"]
    };

    const swaggerSpec: swaggerUi.JsonObject = swaggerJSDoc(options);

    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger docs available at /api/docs");
};
