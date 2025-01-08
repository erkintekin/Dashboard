import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const DailySalesTrend = () => {
  const [dailySalesData, setDailySalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend'den veriyi çekmek için useEffect kullanımı
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API'den veriyi çekme
        const response = await axios.get("/api/sales-daily/daily-trend");
        setDailySalesData(response.data); // API'den gelen veriyi state'e set etme
        setLoading(false);
      } catch (error) {
        console.error(
          "Günlük satış verileri fetchlenirken hata alındı:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-gray-300">Veriler yükleniyor...</p>;
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Günlük Satış Eğilimi
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={dailySalesData}>
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
            <Bar dataKey="sales" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DailySalesTrend;
