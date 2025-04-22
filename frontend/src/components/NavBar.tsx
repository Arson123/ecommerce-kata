import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const total = items.reduce((s, it) => s + it.quantity, 0);

  return (
    <nav className="flex items-center justify-between bg-primary px-4 py-3 text-accent">
      <h1 className="text-xl font-semibold">Davivienda Shop</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/cart">Carrito&nbsp;({total})</Link>
            <Link to="/orders">Mis Compras</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
        <button onClick={toggle}>{theme === "light" ? "🌙" : "☀️"}</button>
      </div>
    </nav>
  );
};

export default NavBar;
