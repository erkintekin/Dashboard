const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const salesRoutes = require("./src/routes/salesRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);

console.log(
  "API dökümantasyonuna http://localhost:5000/api-docs adresinden erişebilirsiniz"
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portu üzerinden çalışıyor`));
