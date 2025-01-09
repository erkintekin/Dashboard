import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      toast.success("Giriş başarılı!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error);
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-100">
          Giriş Yap
        </h1>
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            E-posta
          </label>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Şifre
          </label>
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-gray-100 py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Giriş Yap
        </button>
        <p className="text-gray-400 text-sm text-center mt-4">
          Şifrenizi mi unuttunuz?{" "}
          <a href="/reset" className="text-blue-500 hover:underline">
            Şifreyi Sıfırla
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
