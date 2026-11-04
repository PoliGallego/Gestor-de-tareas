export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "Baja" | "Media" | "Alta" | "Urgente";

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeEmail: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  color: string;
  startDate: string;
  tags: string[];
}
