import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Tasks() {
  const { api, role, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await api("/api/tasks");
      setTasks(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = async (title) => {
    const t = await api("/api/tasks", { method: "POST", body: { title } });
    setTasks((prev) => [t, ...prev]);
  };

  const onToggle = async (id) => {
    await api(`/api/tasks/${id}/toggle`, { method: "PUT" });
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2>Tareas</h2>
          <small>Rol actual: {role || "desconocido"}</small>
        </div>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      {role === "admin" && <TaskForm onCreate={onCreate} />}

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <TaskList tasks={tasks} onToggle={onToggle} />
    </div>
  );
}
