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
import { useState, useEffect } from "react";
import axios from "axios";

const UserActivityHeatmap = () => {
  const [userActivityData, setUserActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend'den veriyi çekmek için useEffect kullanımı
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/user-activity/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // API Endpoint'i
      .then((response) => {
        setUserActivityData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Kullanıcı aktivitesi datası fetchlenemedi:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-300">Veriler yükleniyor...</p>;
  }

  return (
    <motion.div
      className="bg-gray-800 z-0 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Kullanıcı Aktivitesi Isı Haritası
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={userActivityData}>
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
            <Bar dataKey="0_4" stackId="a" fill="#6366F1" />
            <Bar dataKey="4_8" stackId="a" fill="#8B5CF6" />
            <Bar dataKey="8_12" stackId="a" fill="#EC4899" />
            <Bar dataKey="12_16" stackId="a" fill="#10B981" />
            <Bar dataKey="16_20" stackId="a" fill="#F59E0B" />
            <Bar dataKey="20_24" stackId="a" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserActivityHeatmap;
