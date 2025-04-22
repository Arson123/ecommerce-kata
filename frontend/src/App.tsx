import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import AdminRoute from "./components/AdminRoute";
import AdminProductsPage from "./pages/admin/AdminProductsPage";

const App = () => (
  <>
    <NavBar />
    <Routes>
      {/* rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* rutas privadas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default App;
