import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPerformance = () => {
  const [productPerformanceData, setProductPerformanceData] = useState([]);

  // Backend'den veri çekme
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/product-performance/performance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // API Endpoint'i
      .then((response) => {
        setProductPerformanceData(response.data);
      })
      .catch((error) => {
        console.error(
          "Ürün performansı datasını fetchlerken hata alındı:",
          error
        );
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Ürün Performansı
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={productPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#8B5CF6" />
            <Bar dataKey="revenue" fill="#10B981" />
            <Bar dataKey="profit" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformance;
