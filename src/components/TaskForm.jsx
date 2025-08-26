import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input
        placeholder="Nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button>Crear</button>
    </form>
  );
}
