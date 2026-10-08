import type { Task, TaskStatus, TeamMember } from "../types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  memberById: Map<string, TeamMember>;
  accentColor: string;
  draggedTask: Task | null;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  onDrop: (status: TaskStatus) => void;
}

export default function Column({ title, status, tasks, memberById, accentColor, 
  draggedTask, onDragStart, onDragEnd, onDrop }: ColumnProps) {

  const isDropTarget = draggedTask !== null && draggedTask.status !== status;

  return (
    <section className="column">
      <header className="column__header">
        <span className="column__dot" style={{ backgroundColor: accentColor }} />
        <h2>{title}</h2>
        <span className="column__count">{tasks.length}</span>
      </header>

      <div className={`column__list${isDropTarget ? " column__list--drop-target" : ""}`}
        onDragOver={(event) => event.preventDefault()} onDrop={() => onDrop(status)}>
        {tasks.length === 0 ? (
          <p className="column__empty">Sin tareas</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assignee={memberById.get(task.assigneeId)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </section>
  );
}
