import { useMemo, useState, useEffect } from "react";
// 1. Ya no importamos 'tasks', solo los miembros del equipo.
import { teamMembers } from "../data/mockData"; 
// 2. Importamos tu servicio y el tipo Task
import { getPaneles } from "../services/panelesService";
import type { TaskStatus, Task } from "../types"; 
import Column from "./Column";
import TeamFilter from "./TeamFilter";

const columns: { status: TaskStatus; title: string; color: string }[] = [
  { status: "todo", title: "Por hacer", color: "#94a3b8" },
  { status: "in-progress", title: "En progreso", color: "#3b82f6" },
  { status: "done", title: "Hecho", color: "#22c55e" },
];

export default function KanbanBoard() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  
  // 3. Nuevos estados para manejar los datos del backend, la carga y los errores
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const memberById = useMemo(() => new Map(teamMembers.map((m) => [m.id, m])), []);

  // 4. useEffect para llamar al backend cuando el componente se dibuja por primera vez
  useEffect(() => {
    const fetchPaneles = async () => {
      try {
        setIsLoading(true);
        // Llamamos a tu servicio que trae los datos reales
        const panelesBackend = await getPaneles();
        // Guardamos los datos en el estado
        setAllTasks(panelesBackend);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido al cargar paneles");
        console.error("Error al cargar paneles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaneles();
  }, []); // El array vacío [] indica que esto solo se ejecuta una vez al cargar la página

  // Este filtro ahora usa el estado 'allTasks' que se llenará con el backend
  const visibleTasks = useMemo(
    () =>
      selectedMemberId
        ? allTasks.filter((task) => task.assigneeId === selectedMemberId)
        : allTasks,
    [selectedMemberId, allTasks]
  );

  // 5. Pequeña validación visual mientras cargan los datos o si hay error
  if (isLoading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando paneles del equipo...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>Error: {error}</div>;
  }

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