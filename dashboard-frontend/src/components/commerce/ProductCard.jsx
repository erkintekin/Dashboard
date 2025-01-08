import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product.id,
          quantity: 1, // Varsayılan olarak 1 adet ekle
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Ürün sepete eklendi!");
    } catch (error) {
      console.error("Sepete eklerken hata oluştu:", error);
      toast.error("Ürün sepete eklenirken hata oluştu.");
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-400">{product.description}</p>
      <p className="text-lg font-bold text-blue-400 mt-2">
        ${parseFloat(product.price).toFixed(2)}
      </p>
      <button
        onClick={addToCart}
        className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600"
      >
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;
