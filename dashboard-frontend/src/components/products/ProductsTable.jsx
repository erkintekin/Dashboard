import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductsTable = ({ refresh }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Düzenlenen ürün
  const [userRole, setUserRole] = useState(null); // Kullanıcı rolü
  const [isProcessing, setIsProcessing] = useState(false); // İşlem durumu

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // JWT Decode
    setUserRole(decodedToken.role_id);

    axios
      .get("http://localhost:5000/api/products/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Ürün verileri fetchlenirken hata alındı:", error);
        toast.error("Ürün verileri yüklenirken hata oluştu!");
      });
  }, [refresh]);

  const isSuperAdmin = userRole === 1; // SuperAdmin kontrolü
  const isAdmin = userRole === 2; // Admin kontrolü

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    setIsProcessing(true); // İşlem başladı
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setFilteredProducts((prevFiltered) =>
        prevFiltered.filter((product) => product.id !== id)
      );
      toast.success("Ürün başarıyla silindi!");
    } catch (error) {
      console.error("Ürün silinirken hata oluştu:", error);
      toast.error("Ürün silinirken hata oluştu!");
    } finally {
      setIsProcessing(false); // İşlem bitti
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/products/edit/${editingProduct.id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? editingProduct : product
        )
      );
      setFilteredProducts(
        filteredProducts.map((product) =>
          product.id === editingProduct.id ? editingProduct : product
        )
      );
      toast.success("Ürün başarıyla güncellendi!");
      setEditingProduct(null);
    } catch (error) {
      console.error("Ürün güncellenirken hata oluştu:", error);
      toast.error("Ürün güncellenirken hata oluştu!");
    }
  };

  return (
    <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Ürün Listesi</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Ürün ara..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th>İsim</th>
              <th>Kategori</th>
              <th>Fiyat</th>
              <th>Stok</th>
              {(isSuperAdmin || isAdmin) && <th>Aksiyon</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
                <td>{product.stock}</td>
                {(isSuperAdmin || isAdmin) && (
                  <td>
                    <button
                      className="text-indigo-400 mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400"
                      onClick={() => handleDelete(product.id)}
                    >
                      {isProcessing ? <Spinner /> : <Trash2 size={18} />}
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-100 mb-4">
              Ürün Düzenle
            </h2>
            <input
              type="text"
              className="mb-4 p-2 w-full bg-gray-700 text-gray-100 rounded"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              className="mb-4 p-2 w-full bg-gray-700 text-gray-100 rounded"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <input
              type="number"
              className="mb-4 p-2 w-full bg-gray-700 text-gray-100 rounded"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setEditingProduct(null)}
              >
                İptal
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={saveEdit}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsTable;
