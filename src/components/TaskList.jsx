export default function TaskList({ tasks, onToggle }) {
  if (!tasks.length) return <p>No hay tareas aún.</p>;

  return (
    <ul style={{ paddingLeft: 18 }}>
      {tasks.map((t) => (
        <li key={t.id} style={{ marginBottom: 6 }}>
          <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {t.title}
          </span>{" "}
          <button onClick={() => onToggle(t.id)} style={{ marginLeft: 8 }}>
            {t.completed ? "Reabrir" : "Completar"}
          </button>
        </li>
      ))}
    </ul>
  );
}
