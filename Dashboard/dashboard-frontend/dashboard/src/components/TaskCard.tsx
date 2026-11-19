import '../assets/Task.css';
import type { TaskData } from '../services/dashboardService';

const setPriority: Record<number, { prior: string, bg: string; fg: string }> = {
  1: { prior: "Baja", bg: "#DDF0F5", fg: "#1F4F5C" },
  2: { prior: "Media", bg: "#FFE7C2", fg: "#5C3A07" },
  3: { prior: "Alta", bg: "#FFD3E2", fg: "#6E1638" },
  4: { prior: "Urgente", bg: "#422618", fg: "#FFFFFF" },
};

export default function TaskCard({ task }: { task: TaskData }) {
  const priority = setPriority[task.prioridad];
  const dueDate = new Date(task.fechaFin);
  const formattedDate = dueDate.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });

  // Misma regla que TaskCard de Principal: si el fondo es oscuro, el texto va claro
  const isDarkColor = (hex: string): boolean => {
    const color = hex.replace("#", "");
    const r = Number(`0x${color.slice(0, 2)}`);
    const g = Number(`0x${color.slice(2, 4)}`);
    const b = Number(`0x${color.slice(4, 6)}`);

    return (r + g + b) < 450;
  };

  const textColor = isDarkColor(task.color) ? "var(--text-lighter)" : "var(--ink)";

  return (
    <div className="task-card" style={{ backgroundColor: task.color, color: textColor }}>
      <div className="task-card__header">
        <span
          className="task-card__priority"
          style={{ backgroundColor: priority.bg, color: priority.fg }}
        >
          {priority.prior}
        </span>
        <span className="task-card__due">{task.fechaFin ? formattedDate : "Sin fecha límite"}</span>
      </div>

      <h3 className="task-card__title">{task.nombre}</h3>
      {/* <p className="task-card__description">{task.description}</p> */}

      {/* <div className="task-card__tags">
        {task.tags.map((tag) => (
          <span key={tag} className="task-card__tag">
            #{tag}
          </span>
        ))}
      </div> */}

      {/* <div className="task-card__footer">
        {assignee ? (
          <div className="task-card__assignee">
            <Avatar member={assignee} />
            <span>{assignee.name}</span>
          </div>
        ) : (
          <span className="task-card__assignee task-card__assignee--empty">Sin asignar</span>
        )}
      </div> */}
    </div>
  );
}
