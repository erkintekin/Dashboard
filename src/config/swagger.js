const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Role-Based Management API",
      version: "1.0.0",
      description:
        "Role-based management and e-commerce system API documentation",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./src/routes/*.js"], // Swagger için API Route dosyası belirtildi
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
