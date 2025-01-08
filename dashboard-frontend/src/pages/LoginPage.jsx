import React, { useState } from "react"; // React ve useState import edildi
import { useNavigate } from "react-router-dom"; // useNavigate import edildi
import axios from "axios";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Token'ı localStorage'a kaydet
      localStorage.setItem("token", response.data.token);

      // Giriş durumunu güncelle
      setIsAuthenticated(true);

      // Başarıyla giriş yapıldıktan sonra yönlendir
      navigate("/");
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900"
      style={{
        zIndex: 1000, // Sayfayı en öne getir
        position: "relative", // Üstte görünmesini sağlar
      }}
    >
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Giriş Yap</h1>
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-800 text-gray-100"
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-800 text-gray-100"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-gray-100 px-4 py-2 rounded"
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default LoginPage;
