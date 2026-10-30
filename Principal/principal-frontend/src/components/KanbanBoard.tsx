import { useMemo, useState, useEffect } from "react";
// 1. Ya no importamos 'tasks', solo los miembros del equipo.
import { teamMembers } from "../data/mockData";
// 2. Importamos tu servicio y el tipo Task
import { getPaneles, updatePanel } from "../services/panelesService";
import type { TaskStatus, Task } from "../types";
import Column from "./Column";
import CreateModal from "./CreateModal";
import { usePageContext } from "../PageContext";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { Button, Modal } from "@gestor-tareas/react-components";
import { eliminarTablero, getParticipantes, getTableros } from "../services/tablerosService";
import type { Participante, Tablero } from "../services/tablerosService";
import BoardSelector from "./BoardSelector";
import CreateBoardModal from "./CreateBoardModal";
import ParticipantsModal from "./ParticipantsModal";

const columns: { status: TaskStatus; title: string; color: string }[] = [
  { status: "todo", title: "Por hacer", color: "#94a3b8" },
  { status: "in-progress", title: "En progreso", color: "#3b82f6" },
  { status: "done", title: "Hecho", color: "#22c55e" },
];

export default function KanbanBoard() {
  const { error, setError, isCModalOpen, setIsCModalOpen, isDModalOpen,
    isUModalOpen, allTasks, setAllTasks, tableroActual, setTableroActual } = usePageContext();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedMemberId] = useState<string | null>(null);
  const [tableros, setTableros] = useState<Tablero[]>([]);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  // 3. Nuevos estados para manejar los datos del backend, la carga y los errores
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const memberById = useMemo(() => new Map(teamMembers.map((m) => [m.id, m])), []);

  // Al cargar la página se consultan los tableros del usuario y se selecciona el primero
  useEffect(() => {
    const fetchTableros = async () => {
      try {
        const tablerosBackend = await getTableros();
        setTableros(tablerosBackend);
        setTableroActual(tablerosBackend[0] ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido al cargar tableros");
        setIsLoading(false);
      }
    };

    fetchTableros();
  }, []);

  // 4. useEffect para llamar al backend cada vez que cambia el tablero seleccionado
  useEffect(() => {
    if (!tableroActual) {
      return;
    }

    const fetchPaneles = async () => {
      try {
        setIsLoading(true);
        // Llamamos a tu servicio que trae los datos reales
        const panelesBackend = await getPaneles(tableroActual.id);
        // Guardamos los datos en el estado
        setAllTasks(panelesBackend);
        // Los participantes se usan para elegir y mostrar el responsable de cada tarea
        setParticipantes(await getParticipantes(tableroActual.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido al cargar paneles");
        console.error("Error al cargar paneles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaneles();
  }, [tableroActual]); // Se vuelve a ejecutar cada vez que cambia 'tableroActual'

  // Este filtro ahora usa el estado 'allTasks' que se llenará con el backend
  const visibleTasks = useMemo(
    () =>
      selectedMemberId
        ? allTasks.filter((task) => task.assigneeId === selectedMemberId)
        : allTasks,
    [selectedMemberId, allTasks]
  );

  function handleBoardCreated(tablero: Tablero) {
    setTableros((currentTableros) => [...currentTableros, tablero]);
    setTableroActual(tablero);
    setIsBoardModalOpen(false);
  }

  // El Modal de la librería llama a esta función con true al presionar "Aceptar"
  function handleDeleteBoardChoice(aceptado: React.SetStateAction<boolean>) {
    if (aceptado === true) {
      deleteBoard();
    }
  }

  async function deleteBoard() {
    if (!tableroActual) {
      return;
    }

    try {
      await eliminarTablero(tableroActual.id);
      // Se vuelve a consultar la lista: si era el único tablero, el backend crea uno por defecto
      const tablerosBackend = await getTableros();
      setTableros(tablerosBackend);
      setTableroActual(tablerosBackend[0] ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al eliminar el tablero");
    }
  }

  // Al cerrar el modal de participantes se recargan los datos: si se quitó a alguien,
  // el backend dejó sin responsable las tareas que tenía asignadas
  async function handleParticipantsClosed() {
    setIsParticipantsOpen(false);

    if (!tableroActual) {
      return;
    }

    try {
      setParticipantes(await getParticipantes(tableroActual.id));
      setAllTasks(await getPaneles(tableroActual.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al recargar el tablero");
    }
  }

  function moveTask(destinationStatus: TaskStatus) {
    if (!draggedTask || draggedTask.status === destinationStatus) {
      setDraggedTask(null);
      return;
    }

    setAllTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === draggedTask.id
          ? { ...task, status: destinationStatus }
          : task
      )
    );
    updatePanel(draggedTask.id, {...draggedTask, status: destinationStatus});

    setDraggedTask(null);
  }

  // 5. Pequeña validación visual mientras cargan los datos o si hay error
  if (isLoading) {
    return <div className="loading-label">Cargando paneles del usuario...</div>;
  }

  if (error && !isCModalOpen && !isUModalOpen) {
    return <div className="error-label">Error: {error}</div>;
  }

  return (
    <div className="board">
      <header className="board__header">
        <div>
          <h1>Tus tareas</h1>
          <BoardSelector tableros={tableros} tableroActual={tableroActual} onSelect={setTableroActual}
            onCreate={() => setIsBoardModalOpen(true)} onDelete={() => setIsDeleteBoardOpen(true)}
            onParticipants={() => setIsParticipantsOpen(true)} />
          <Button text="Agregar tarea" onClick={() => { setError(null); setIsCModalOpen(true); }} />
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
            status={col.status}
            draggedTask={draggedTask}
            onDragStart={setDraggedTask}
            onDragEnd={() => setDraggedTask(null)}
            onDrop={moveTask}
          />
        ))}
      </div>

      {isCModalOpen && <CreateModal participantes={participantes}/>}
      {isUModalOpen && <UpdateModal participantes={participantes}/>}
      {isDModalOpen && <DeleteModal/>}
      {isBoardModalOpen && <CreateBoardModal onCreated={handleBoardCreated} onClose={() => setIsBoardModalOpen(false)} />}
      {isDeleteBoardOpen && <Modal title="Eliminar tablero" isChoose={true}
        text={`Se eliminará el tablero "${tableroActual?.nombre}" y todas sus tareas. ¿Deseas continuar?`}
        setChoose={handleDeleteBoardChoice} setShow={setIsDeleteBoardOpen} />}
      {isParticipantsOpen && tableroActual &&
        <ParticipantsModal tablero={tableroActual} onClose={handleParticipantsClosed} />}
    </div>
  );
}