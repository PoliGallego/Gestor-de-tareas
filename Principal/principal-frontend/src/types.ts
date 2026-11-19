export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "Baja" | "Media" | "Alta" | "Urgente";

export interface TeamMember {
  name: string;
  role: string | null | undefined;
  email: string;
  initials: string | null | undefined;
  color: string | null | undefined;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  color: string;
  startDate: string;
  tags: string[];
  assignee: TeamMember | null | undefined;
}
