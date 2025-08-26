import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const ok = await login(form.username, form.password);
      if (ok) nav("/tasks");
    } catch (e) {
      setError(e.message || "Error de login");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        />
        <button disabled={loading} type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <p style={{ marginTop: 16, fontSize: 12, opacity: 0.8 }}>
        Usa los usuarios que creaste en tu backend (p. ej. <b>admin</b> / <b>user</b>).
      </p>
    </div>
  );
}
