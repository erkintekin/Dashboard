import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import axios from "axios";

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Backend'den veri çekme
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders") // API Endpoint'i
      .then((response) => {
        setOrders(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => {
        console.error("Siparişleri fetchlerken hata alındı:", error);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.order_id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Sipariş Listesi</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Sipariş ara..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sipariş ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Müşteri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Statü
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actionlar
              </th>
            </tr>
          </thead>

          <tbody className="divide divide-gray-700">
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.order_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.order_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Eye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
