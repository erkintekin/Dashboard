import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddProductModal = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image_url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // İşlem durumu

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/products/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Ürün başarıyla eklendi!");
      onProductAdded(); // Listeyi güncelleme
      onClose(); // Modalı kapatma
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
      toast.error(
        error.response?.data?.message || "Ürün eklenirken bir hata oluştu."
      );
    } finally {
      setIsSubmitting(false); // İşlem durumu sıfırlanır
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
          onClick={onClose}
        >
          Kapat
        </button>
        <h2 className="text-xl font-bold text-gray-100 mb-4">Yeni Ürün Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Ürün Adı</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              placeholder="Ürün adı giriniz"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Kategori</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              placeholder="Ürün kategorisi giriniz"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Fiyat</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              placeholder="Ürün fiyatı giriniz"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              placeholder="Ürün stok adedi giriniz"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              placeholder="Ürün açıklaması giriniz"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Görsel URL
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              placeholder="Ürün görsel URL'sini giriniz"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ekleniyor..." : "Ürünü Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
