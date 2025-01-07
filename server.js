const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const salesRoutes = require("./src/routes/salesRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const salesChannelsRoutes = require("./src/routes/salesChannelsRoutes");
const salesOverviewRoutes = require("./src/routes/salesOverviewRoutes");
const dailyOrdersRoutes = require("./src/routes/dailyOrdersRoutes");
const orderStatusRoutes = require("./src/routes/orderStatusRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");
const channelPerformanceRoutes = require("./src/routes/channelPerformanceRoutes");
const customerSegmentationRoutes = require("./src/routes/customerSegmentationRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales-channels", salesChannelsRoutes);
app.use("/api/sales-overview", salesOverviewRoutes);
app.use("/api/daily-orders", dailyOrdersRoutes);
app.use("/api/order-status", orderStatusRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/channel-performance", channelPerformanceRoutes);
app.use("/api/customer-segmentation", customerSegmentationRoutes);

console.log(
  "API dökümantasyonuna http://localhost:5000/api-docs adresinden erişebilirsiniz"
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portu üzerinden çalışıyor`));
