import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartModal = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  // Sepetteki ürünleri getirme
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Sepet yüklenirken hata oluştu:", error);
        toast.error("Sepet verisi alınamadı!");
      });
  }, []);

  // Toplam fiyatı hesaplama
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * item.quantity,
    0
  );

  // Sepetten ürün çıkarma
  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      toast.success("Ürün sepetten çıkarıldı!");
    } catch (error) {
      console.error("Ürün sepetten çıkarılırken hata oluştu:", error);
      toast.error("Ürün sepetten çıkarılırken hata oluştu!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
          onClick={onClose}
        >
          Kapat
        </button>
        <h2 className="text-xl text-gray-100 font-bold mb-4">Sepetiniz</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-300">Sepetiniz boş.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id} // `key` için benzersiz bir değer
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <p className="text-gray-100">{item.name}</p>
                  <p className="text-gray-400">
                    ${parseFloat(item.price || 0).toFixed(2)}
                  </p>
                </div>
                <span className="px-3 text-gray-100">{item.quantity}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleRemove(item.id)}
                >
                  Kaldır
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg text-gray-100 font-bold">
                Toplam: ${total.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
