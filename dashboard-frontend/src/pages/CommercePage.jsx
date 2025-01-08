import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import CartModal from "../components/commerce/CartModal";
import ProductCard from "../components/commerce/ProductCard";

const CommercePage = () => {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/products/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Ürünleri yüklerken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray-100 font-bold">Ürünler</h1>
        <button
          onClick={() => setCartOpen(true)}
          className="relative p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          <ShoppingCart size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </div>
  );
};

export default CommercePage;
