import { useState } from "react";
import type { Task, TeamMember } from "../types";
import { usePageContext } from "../PageContext";
import Avatar from "./Avatar";

const priorityStyles: Record<Task["priority"], { bg: string; fg: string }> = {
  Baja: { bg: "#DDF0F5", fg: "#1F4F5C" },
  Media: { bg: "#FFE7C2", fg: "#5C3A07" },
  Alta: { bg: "#FFD3E2", fg: "#6E1638" },
  Urgente: { bg: "#422618", fg: "#FFFFFF" },
};

interface TaskCardProps {
  task: Task;
  assignee?: TeamMember;
  onDragStart?: (task: Task) => void;
  onDragEnd?: () => void;
}

export default function TaskCard({ task, assignee, onDragStart, onDragEnd }: TaskCardProps) {
  const { setFocusTask, setIsUModalOpen, setIsDModalOpen, tableroActual } = usePageContext();
  const [isHover, setIsHover] = useState(false);
  const priorityStyle = priorityStyles[task.priority];
  const dueDate = new Date(task.dueDate);
  const formattedDate = dueDate.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });

  const getRGBColor = (hex: string): number[] => {
    const bgColor = hex.replace("#", "");

    let color: number[] = [0, 0, 0];

    color[0] = Number(`0x${bgColor.slice(0, 2)}`);
    color[1] = Number(`0x${bgColor.slice(2, 4)}`);
    color[2] = Number(`0x${bgColor.slice(4, 6)}`);

    return color;
  }

  const isDarkLigth = (hex: string): boolean => {
    const color = getRGBColor(hex);

    return (color[0] + color[1] + color[2]) < 450;
  }

  const getTextColor = (): string => {

    if (isDarkLigth(task.color)) {
      return "var(--text-lighter)";
    }

    return "var(--text-light)";
  };

  const getEditIconColor = (): string => {

    if (isDarkLigth(task.color)) {
      return "url('" + window.location.href + "/edit_w.png')";
    }

    return "url('" + window.location.href + "/edit_b.png')";
  };

  const getDeleteIconColor = (): string => {

    if (isDarkLigth(task.color)) {
      return "url('" + window.location.href + "/delete_w.png')";
    }

    return "url('" + window.location.href + "/delete_b.png')";
  };

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
      onDragEnd={() => onDragEnd?.()} style={{ backgroundColor: task.color, color: getTextColor() }}>
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
              <div className="ed-icon edit" style={{ backgroundImage: getEditIconColor() }} />
            </button>
            {tableroActual?.esPropietario &&
            <button className="ed-button" onClick={() => deleteFunt()}>
              <div className="ed-icon delete" style={{ backgroundImage: getDeleteIconColor() }}/>
            </button>}
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

      <div className="task-card__footer">
        {assignee ? (
          <div className="task-card__assignee">
            <Avatar member={assignee} />
            <span>{assignee.name}</span>
          </div>
        ) : (
          <span className="task-card__assignee task-card__assignee--empty">Sin asignar</span>
        )}
      </div>
    </article>
  );
}
