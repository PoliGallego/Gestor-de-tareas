import type { Task, TeamMember } from "../types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  memberById: Map<string, TeamMember>;
  accentColor: string;
}

export default function Column({ title, tasks, memberById, accentColor }: ColumnProps) {
  return (
    <section className="column">
      <header className="column__header">
        <span className="column__dot" style={{ backgroundColor: accentColor }} />
        <h2>{title}</h2>
        <span className="column__count">{tasks.length}</span>
      </header>

      <div className="column__list">
        {tasks.length === 0 ? (
          <p className="column__empty">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} assignee={memberById.get(task.assigneeId)} />
          ))
        )}
      </div>
    </section>
  );
}
