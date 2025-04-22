import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4 rounded border p-6">
        <h2 className="text-center text-xl font-semibold">Iniciar sesión</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          required
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded bg-primary py-2 text-accent hover:bg-secondary"
        >
          Entrar
        </button>
      </form>
      <p className="text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-primary underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
