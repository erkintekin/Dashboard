const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dashboard API",
      version: "1.0.0",
      description: "API dokümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [
    "./routes/authRoutes.js",
    "./routes/cartRoutes.js",
    "./routes/categoryRoutes.js",
    "./routes/channelPerformanceRoutes.js",
    "./routes/customerSegmentationRoutes.js",
    "./routes/dailyOrdersRoutes.js",
    "./routes/ordersRoutes.js",
    "./routes/orderStatsRoutes.js",
    "./routes/orderStatusRoutes.js",
    "./routes/overviewRoutes.js",
    "./routes/productPerformanceRoutes.js",
    "./routes/productRoutes.js",
    "./routes/revenueRoutes.js",
    "./routes/salesByCategoryRoutes.js",
    "./routes/salesChannelsRoutes.js",
    "./routes/salesDailyRoutes.js",
    "./routes/salesOverviewChartRoutes.js",
    "./routes/salesOverviewRoutes.js",
    "./routes/salesRoutes.js",
    "./routes/salesStatsRoutes.js",
    "./routes/userActivityRoutes.js",
    "./routes/userDemographicsRoutes.js",
    "./routes/userGrowthRoutes.js",
    "./routes/userRetentionRoutes.js",
    "./routes/userRoutes.js",
    "./routes/userStatsRoutes.js",
  ], //
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs çalışıyor: http://localhost:5000/api-docs");
};

module.exports = setupSwaggerDocs;
