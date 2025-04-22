import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "ADMIN" ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
