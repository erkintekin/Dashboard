import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserModal = ({ user, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        {
          name: formData.name,
          email: formData.email,
          role_id: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Kullanıcı başarıyla güncellendi!");
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
      toast.error("Kullanıcı güncellenirken hata oluştu!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
          onClick={onClose}
        >
          Kapat
        </button>
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          Kullanıcı Düzenle
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Ad</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
              required
            >
              <option value="1">SuperAdmin</option>
              <option value="2">Admin</option>
              <option value="3">User</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
