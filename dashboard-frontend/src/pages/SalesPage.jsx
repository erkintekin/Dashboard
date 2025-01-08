import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";

const SalesPage = () => {
  const [salesStats, setSalesStats] = useState({
    totalRevenue: "$0",
    averageOrderValue: "$0",
    conversionRate: "0%",
    salesGrowth: "0%",
  });

  // Backend'den veri çekme
  useEffect(() => {
    fetch("http://localhost:5000/api/sales-stats")
      .then((response) => response.json())
      .then((data) => {
        setSalesStats({
          totalRevenue: `$${data.total_revenue.toLocaleString()}`,
          averageOrderValue: `$${data.average_order_value.toFixed(2)}`,
          conversionRate: `${data.conversion_rate.toFixed(2)}%`,
          salesGrowth: `${data.sales_growth.toFixed(1)}%`,
        });
      })
      .catch((error) =>
        console.error("Satış istatistikleri fetchlenirken hata alındı:", error)
      );
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Satış" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Satış İstatistikleri */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Kar"
            icon={DollarSign}
            value={salesStats.totalRevenue}
            color="#6366F1"
          />
          <StatCard
            name="Ortalama Sipariş Değeri"
            icon={ShoppingCart}
            value={salesStats.averageOrderValue}
            color="#10B981"
          />
          <StatCard
            name="Dönüşüm Oranı"
            icon={TrendingUp}
            value={salesStats.conversionRate}
            color="#F59E0B"
          />
          <StatCard
            name="Satış Büyümesi"
            icon={CreditCard}
            value={salesStats.salesGrowth}
            color="#EF4444"
          />
        </motion.div>

        <SalesOverviewChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SalesByCategoryChart />
          <DailySalesTrend />
        </div>
      </main>
    </div>
  );
};

export default SalesPage;
