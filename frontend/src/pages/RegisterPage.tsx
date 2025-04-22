import { FormEvent, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { PasswordInputWithRules } from "../components/PasswordInputWithRules";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(name, email, password);
      alert("Cuenta creada con éxito, inicia sesión.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message ?? "No se pudo registrar");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4 rounded border p-6">
        <h2 className="text-center text-xl font-semibold">Crear cuenta</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          required
          className="w-full rounded border px-3 py-2"
        />

        <PasswordInputWithRules
          value={password}
          onChange={setPassword}
          onValidChange={setPassValid}
        />

        <button
          type="submit"
          disabled={!passValid}
          className={`w-full rounded py-2 text-accent ${
            passValid
              ? "bg-primary hover:bg-secondary"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Registrarse
        </button>

        <p className="text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
