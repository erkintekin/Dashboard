import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const DailyOrders = () => {
  const [dailyOrdersData, setDailyOrdersData] = useState([]);

  // Backend'den veri çekme
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/daily-orders") // API Endpoint'i
      .then((response) => {
        setDailyOrdersData(response.data);
      })
      .catch((error) => {
        console.error(
          "Günlük sipariş datası fetchlenirken hata alındı:",
          error
        );
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Günlük Siparişler
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={dailyOrdersData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
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
              dataKey="orders"
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DailyOrders;
