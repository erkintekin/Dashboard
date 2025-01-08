import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-green-500",
    insight:
      "Gelir, geçen aya göre %15 artış gösterdi. Bu artışın ana nedeni başarılı bir e-posta kampanyasıdır.",
  },
  {
    icon: Users,
    color: "text-blue-500",
    insight:
      "Yeni sadakat programının lansmanının ardından müşteri sadakati %8 oranında iyileşti.",
  },
  {
    icon: ShoppingBag,
    color: "text-purple-500",
    insight:
      '"Elektronik" ürün kategorisi, son pazar trendlerine göre en yüksek büyüme potansiyelini göstermektedir.',
  },
  {
    icon: DollarSign,
    color: "text-yellow-500",
    insight:
      "Fiyatlandırma stratejisinin optimize edilmesi, toplam kar marjlarını %5-7 artırabilir.",
  },
];

const AIPoweredInsights = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Yapay Zeka Destekli Analizler
      </h2>
      <div className="space-y-4">
        {INSIGHTS.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <p className="text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default AIPoweredInsights;
