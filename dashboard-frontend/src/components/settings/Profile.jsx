import { useState, useEffect } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import EditProfileModal from "./EditProfileModal";
import axios from "axios";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Kullanıcı verilerini tutacak state
  const [loading, setLoading] = useState(true);

  // Kullanıcı bilgilerini backend'den çekme
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Kullanıcı oturum açmamış.");
        return;
      }

      try {
        // Token'dan kullanıcı ID'sini decode etme
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id; // Token'dan gelen kullanıcı ID

        // Kullanıcı bilgilerini backend'den alma
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data); // Kullanıcı bilgilerini state'e atama
        setLoading(false);
      } catch (error) {
        console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser); // Kullanıcı verilerini güncelle
  };

  if (loading) {
    return <p className="text-gray-300">Veriler yükleniyor...</p>;
  }

  if (!user) {
    return <p className="text-gray-300">Kullanıcı bilgileri bulunamadı.</p>;
  }

  return (
    <SettingSection icon={User} title={"Profil"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/3.jpg"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">{user.name}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Profili Düzenle
      </button>

      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </SettingSection>
  );
};

export default Profile;
