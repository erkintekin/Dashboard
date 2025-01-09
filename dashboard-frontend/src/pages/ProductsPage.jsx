import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";
import { useState } from "react";
import AddProductModal from "../components/products/AddProductModal";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false); // Liste güncelleme kontrolü

  const handleProductAdded = () => {
    setRefreshProducts((prev) => !prev); // Listeyi güncelle
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* Sayfa Başlığı */}
      <Header title="Ürünler" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* İstatistik Kartları */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Ürünler"
            icon={Package}
            value={1234}
            color="#6366F1"
          />
          <StatCard
            name="En Çok Satılanlar"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Düşük Stok"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Total Kar"
            icon={DollarSign}
            value={"543.210 ₺"}
            color="#EF4444"
          />
        </motion.div>

        {/* Ürün Yönetimi Başlığı ve Butonu */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-100">Ürün Yönetimi</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Yeni Ürün Ekle
          </button>
        </div>

        {/* Yeni Ürün Modalı */}
        {isModalOpen && (
          <AddProductModal
            onClose={() => setIsModalOpen(false)}
            onProductAdded={handleProductAdded}
          />
        )}

        {/* Ürün Tablosu */}
        <ProductsTable refresh={refreshProducts} />

        {/* Satış ve Kategori Grafikleri */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
