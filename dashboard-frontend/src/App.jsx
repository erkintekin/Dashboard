import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu

  // localStorage'dan token kontrolü
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Token varsa true, yoksa false yap
    setIsLoading(false); // Kontrol tamamlandıktan sonra yüklenmeyi durdur
  }, []);

  // Yüklenme sırasında gösterilecek mesaj
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <h1>Loading...</h1>
      </div>
    );
  }

  // PrivateRoute bileşeni
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // PrivateLayout bileşeni
  const PrivateLayout = ({ children }) => {
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    );
  };

  return (
    <Routes>
      {/* Login Sayfası */}
      <Route
        path="/login"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <OverviewPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/products"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <ProductsPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <UsersPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <SalesPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <OrdersPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <AnalyticsPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <SettingsPage />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
