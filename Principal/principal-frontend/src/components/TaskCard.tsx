import { useState } from "react";
import type { Task, TeamMember } from "../types";
import { usePageContext } from "../PageContext";

const priorityStyles: Record<Task["priority"], { bg: string; fg: string }> = {
  Baja: { bg: "#e0f2fe", fg: "#0369a1" },
  Media: { bg: "#fef3c7", fg: "#b45309" },
  Alta: { bg: "#ffe4e6", fg: "#be123c" },
  Urgente: { bg: "#fee2e2", fg: "#991b1b" },
};

interface TaskCardProps {
  task: Task;
  assignee?: TeamMember;
  onDragStart?: (task: Task) => void;
  onDragEnd?: () => void;
}

export default function TaskCard({ task, assignee, onDragStart, onDragEnd }: TaskCardProps) {
  const { setFocusTask, setIsUModalOpen, setIsDModalOpen} = usePageContext();
  const [isHover, setIsHover] = useState(false);
  const priorityStyle = priorityStyles[task.priority];
  const dueDate = new Date(task.dueDate);
  const formattedDate = dueDate.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });

  const editFunt = () => {
    setFocusTask(task);
    setIsUModalOpen(true);
  };

  const deleteFunt = () => {
    setFocusTask(task);
    setIsDModalOpen(true);
  };

  return (
    <article className="task-card" draggable onDragStart={() => onDragStart?.(task)}
      onDragEnd={() => onDragEnd?.()} style={{ backgroundColor: task.color }}>
      <div className="task-card__header" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <span
          className="task-card__priority"
          style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.fg }}
        >
          {task.priority}
        </span>
        {!isHover ? <span className="task-card__due">{task.dueDate ? formattedDate : "Sin fecha límite"}</span> :
          <div className="ed-buttons">
            <button className="ed-button" onClick={() => editFunt()}>
              <div className="ed-icon edit" />
            </button>
            <button className="ed-button" onClick={() => deleteFunt()}>
              <div className="ed-icon delete" />
            </button>
          </div>}
      </div>

      <h3 className="task-card__title">{task.title}</h3>
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
    </article>
  );
}
