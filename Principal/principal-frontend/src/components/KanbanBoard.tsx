import { useMemo, useState, useEffect } from "react";
// 1. Ya no importamos 'tasks', solo los miembros del equipo.
import { teamMembers } from "../data/mockData";
// 2. Importamos tu servicio y el tipo Task
import { crearPanel, getPaneles } from "../services/panelesService";
import type { TaskStatus, Task } from "../types";
import Column from "./Column";

const columns: { status: TaskStatus; title: string; color: string }[] = [
  { status: "todo", title: "Por hacer", color: "#94a3b8" },
  { status: "in-progress", title: "En progreso", color: "#3b82f6" },
  { status: "done", title: "Hecho", color: "#22c55e" },
];

const initialTaskForm = {
  title: "",
  description: "",
  assigneeId: teamMembers[0]?.id ?? "",
  priority: "Media" as Task["priority"],
  status: "todo" as TaskStatus,
  color: "#afa7a7",
  startDate: "",
  dueDate: "",
};

export default function KanbanBoard() {
  const [selectedMemberId] = useState<string | null>(null);

  // 3. Nuevos estados para manejar los datos del backend, la carga y los errores
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [taskForm, setTaskForm] = useState(initialTaskForm);

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

  function closeModal() {
    if (isSaving) return;
    setIsModalOpen(false);
    setTaskForm(initialTaskForm);
  }

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const savedTask = await crearPanel({
        nombre: taskForm.title,
        color: taskForm.color,
        prioridad: { Baja: 1, Media: 2, Alta: 3, Urgente: 4 }[taskForm.priority],
        fechaInicio: taskForm.startDate || undefined,
        fechaFin: taskForm.dueDate || undefined,
      });

      setAllTasks((currentTasks) => [
        ...currentTasks,
        {
          ...savedTask,
          description: taskForm.description,
          assigneeId: taskForm.assigneeId,
          priority: taskForm.priority,
          status: taskForm.status,
        },
      ]);
      setIsSaving(false);
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar la tarea");
    } finally {
      setIsSaving(false);
    }
  }

  // 5. Pequeña validación visual mientras cargan los datos o si hay error
  if (isLoading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando paneles del equipo...</div>;
  }

  if (error && !isModalOpen) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>Error: {error}</div>;
  }

  return (
    <div className="board">
      <header className="board__header">
        <div>
          <h1>Tareas del equipo</h1>
          <input type="button" value="Agregar tarea" onClick={() => { setError(null); setIsModalOpen(true); }} />
          <p className="board__subtitle">
            {visibleTasks.length} tarea{visibleTasks.length !== 1 && "s"}
            {selectedMemberId ? ` asignadas a ${memberById.get(selectedMemberId)?.name}` : " en total"}
          </p>
        </div>
      </header>

      {/* <TeamFilter members={teamMembers} selectedId={selectedMemberId} onSelect={setSelectedMemberId} /> */}

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

      {isModalOpen && (
        <div className="task-modal__backdrop" role="presentation" onMouseDown={closeModal}>
          <section
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="task-modal__header">
              <div>
                <p className="task-modal__eyebrow">Nueva tarea</p>
                <h2 id="task-modal-title">Agregar tarea</h2>
              </div>
            </div>

            <form className="task-form" onSubmit={handleCreateTask}>
              {error && <p className="task-form__error">{error}</p>}
              <label>
                Título
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
                  placeholder="Escribe el título de la tarea"
                  required
                />
              </label>

              <label>
                Descripción
                <textarea
                  value={taskForm.description}
                  onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })}
                  placeholder="Describe lo que hay que hacer"
                  rows={3}
                />
              </label>

              <div className="task-form__grid">
                {/* <label>
                  Responsable
                  <select value={taskForm.assigneeId} onChange={(event) => setTaskForm({ ...taskForm, assigneeId: event.target.value })}>
                    {teamMembers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                  </select>
                </label> */}

                <label>
                  Prioridad
                  <select value={taskForm.priority} onChange={(event) => setTaskForm({ ...taskForm, priority: event.target.value as Task["priority"] })}>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </label>

                <label>
                  Estado
                  <select value={taskForm.status} onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value as TaskStatus })}>
                    <option value="todo">Por hacer</option>
                    <option value="in-progress">En progreso</option>
                    <option value="done">Hecho</option>
                  </select>
                </label>

                {/* <label>
                  Color
                  <input type="color" value={taskForm.color} onChange={(event) => setTaskForm({ ...taskForm, color: event.target.value })} />
                </label> */}

                <label>
                  Fecha de inicio
                  <input type="date" value={taskForm.startDate} onChange={(event) => setTaskForm({ ...taskForm, startDate: event.target.value })} />
                </label>

                <label>
                  Fecha límite
                  <input type="date" value={taskForm.dueDate} onChange={(event) => setTaskForm({ ...taskForm, dueDate: event.target.value })} />
                </label>
              </div>

              <div className="task-modal__actions">
                <button type="button" className="task-modal__cancel" onClick={closeModal}>Cerrar</button>
                <button type="submit" className="task-modal__save" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar tarea"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}