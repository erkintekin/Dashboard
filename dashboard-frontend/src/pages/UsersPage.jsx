import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import AddUserModal from "../components/users/AddUserModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentUserRole(decodedToken.role_id);
    }

    axios
      .get("http://localhost:5000/api/user-stats/userstats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
        console.error("Kullanıcı istatistikleri fetchlenirken hata:", error);
      });
  }, []);

  const handleUserAdded = () => {
    setRefreshUsers((prev) => !prev);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Kullanıcılar" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            name="Toplam Kullanıcı"
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

        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-100">
            Kullanıcı Yönetimi
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Yeni Kullanıcı Ekle
          </button>
        </div>

        {isModalOpen && (
          <AddUserModal
            onClose={() => setIsModalOpen(false)}
            onUserAdded={handleUserAdded}
          />
        )}

        <UsersTable refresh={refreshUsers} currentUserRole={currentUserRole} />
        {/* Kullanıcı chartları */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 relative z-0">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
