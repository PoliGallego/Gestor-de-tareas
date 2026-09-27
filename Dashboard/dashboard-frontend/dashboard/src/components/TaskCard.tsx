import '../assets/Task.css';
import type { TaskData } from '../services/dashboardService';

const setPriority: Record<number, { prior: string, bg: string; fg: string }> = {
  1: { prior: "Baja", bg: "#e0f2fe", fg: "#0369a1" },
  2: { prior: "Media", bg: "#fef3c7", fg: "#b45309" },
  3: { prior: "Alta", bg: "#ffe4e6", fg: "#be123c" },
  4: { prior: "Urgente", bg: "#fee2e2", fg: "#991b1b" },
};

export default function TaskCard({ task }: { task: TaskData }) {
  const priority = setPriority[task.prioridad];
  const dueDate = new Date(task.fecha_fin);
  const formattedDate = dueDate.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="task-card" style={{ backgroundColor: task.color }}>
      <div className="task-card__header">
        <span
          className="task-card__priority"
          style={{ backgroundColor: priority.bg, color: priority.fg }}
        >
          {priority.prior}
        </span>
        <span className="task-card__due">{formattedDate}</span>
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
