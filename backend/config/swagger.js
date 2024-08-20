import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Collaborative Canvas API",
            version: "1.0.0",
            description: "API for collaborative canvas platform"
        },
        servers: [
            {
                url: `${process.env.URL || "http://localhost:5000"}/api`
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app, port) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at ${process.env.URL || 'http://localhost:5000'}/api-docs`);
};