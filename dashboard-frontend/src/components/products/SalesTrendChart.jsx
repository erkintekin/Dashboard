import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

const SalesTrendChart = () => {
  const [salesData, setSalesData] = useState([]);

  // Backend'den veri çekme
  useEffect(() => {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan alın

    axios
      .get("http://localhost:5000/api/sales/totalsales", {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header'ı ekleyin
        },
      })
      .then((response) => {
        console.log("API'den gelen veri:", response.data);
        const formattedData = response.data.map((item) => ({
          month: item.month,
          sales: item.sales,
        }));
        setSalesData(formattedData);
      })
      .catch((error) => {
        console.error("Satış verisi fetchlenirken hata alındı:", error);
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Satış Eğrisi</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesTrendChart;
