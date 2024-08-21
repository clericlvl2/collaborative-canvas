import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export default function swaggerDocs(app, url, port) {
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
                    url: `${url}:${port}/api`
                }
            ]
        },
        apis: ["./routes/*.js"]
    };
    
    const swaggerSpec = swaggerJSDoc(options);
    
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at ${url}:${port}/api-docs`);
};