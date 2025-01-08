import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/common/Sidebar";

import LoginPage from "./pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kullanıcı giriş durumu
  const [userRole, setUserRole] = useState(null); // Kullanıcının rolü
  const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu

  // Token kontrolü ve kullanıcı rolünü belirleme
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // JWT decode
        console.log("Decoded Token:", decodedToken);
        setUserRole(decodedToken.role_id || null); // Varsayılan role null
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token decoding hatası:", error);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, []);

  // Yüklenme sırasında gösterilecek mesaj
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <h1>Yükleniyor..</h1>
      </div>
    );
  }

  // PrivateRoute bileşeni
  const PrivateRoute = ({ children, allowedRoles }) => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("userRole:", userRole);
    console.log("allowedRoles:", allowedRoles);

    if (!isAuthenticated) {
      console.log("Kullanıcı giriş yapmamış, /login'e yönlendiriliyor");
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.log("Erişim izni yok, /settings'e yönlendiriliyor");
      return <Navigate to="/settings" />;
    }

    return children;
  };

  // PrivateLayout bileşeni
  const PrivateLayout = ({ children }) => {
    console.log("PrivateLayout userRole:", userRole); // Debugging için
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100">
        <Sidebar userRole={userRole} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Login Sayfası */}
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <PrivateLayout>
                <OverviewPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <PrivateLayout>
                <ProductsPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <PrivateLayout>
                <UsersPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <PrivateLayout>
                <SalesPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <PrivateLayout>
                <OrdersPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <PrivateLayout>
                <AnalyticsPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={[1, 2, 3]}>
              <PrivateLayout>
                <SettingsPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
