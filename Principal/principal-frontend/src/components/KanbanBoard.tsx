import { useMemo, useState } from "react";
import { tasks as allTasks, teamMembers } from "../data/mockData";
import type { TaskStatus } from "../types";
import Column from "./Column";
import TeamFilter from "./TeamFilter";

const columns: { status: TaskStatus; title: string; color: string }[] = [
  { status: "todo", title: "Por hacer", color: "#94a3b8" },
  { status: "in-progress", title: "En progreso", color: "#3b82f6" },
  { status: "done", title: "Hecho", color: "#22c55e" },
];

export default function KanbanBoard() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const memberById = useMemo(() => new Map(teamMembers.map((m) => [m.id, m])), []);

  const visibleTasks = useMemo(
    () =>
      selectedMemberId
        ? allTasks.filter((task) => task.assigneeId === selectedMemberId)
        : allTasks,
    [selectedMemberId]
  );

  return (
    <div className="board">
      <header className="board__header">
        <div>
          <h1>Tareas del equipo</h1>
          <p className="board__subtitle">
            {visibleTasks.length} tarea{visibleTasks.length !== 1 && "s"}
            {selectedMemberId ? ` asignadas a ${memberById.get(selectedMemberId)?.name}` : " en total"}
          </p>
        </div>
      </header>

      <TeamFilter members={teamMembers} selectedId={selectedMemberId} onSelect={setSelectedMemberId} />

      <div className="board__columns">
        {columns.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            accentColor={col.color}
            memberById={memberById}
            tasks={visibleTasks.filter((task) => task.status === col.status)}
          />
        ))}
      </div>
    </div>
  );
}
