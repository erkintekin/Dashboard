import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";

const UsersPage = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    activeUsers: 0,
    churnRate: "0%",
  });

  // Backend'den veri çekme
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/user-stats/userstats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // API Endpoint'i
      .then((response) => {
        const data = response.data;
        setUserStats({
          totalUsers: data.total_users,
          newUsersToday: data.new_users_today,
          activeUsers: data.active_users,
          churnRate: `${data.churn_rate}%`,
        });
      })
      .catch((error) => {
        console.error("Kullanıcı istatistikleri datası fetchlenemedi:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Kullanıcılar" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* İstatistikler */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Kullanıcı"
            icon={UsersIcon}
            value={userStats.totalUsers}
            color="#6366F1"
          />
          <StatCard
            name="Bugün Katılanlar"
            icon={UserPlus}
            value={userStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Aktif Kullanıcılar"
            icon={UserCheck}
            value={userStats.activeUsers}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Oranı"
            icon={UserX}
            value={userStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        <UsersTable />

        {/* Kullanıcı chartları */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
