import { useMemo, useState, useEffect } from "react";
// 2. Importamos tu servicio y el tipo Task
import { getPaneles, mapPanelToTask, updatePanel, type PanelDTO } from "../services/panelesService";
import type { TaskStatus, Task, TeamMember } from "../types";
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
import TeamFilter from "./TeamFilter";
import { createClient } from "graphql-ws";

const columns: { status: TaskStatus; title: string; color: string }[] = [
  { status: "todo", title: "Por hacer", color: "#94a3b8" },
  { status: "in-progress", title: "En progreso", color: "#3b82f6" },
  { status: "done", title: "Hecho", color: "#22c55e" },
];

// Clave del localStorage donde se recuerda el último tablero abierto
const TABLERO_GUARDADO_KEY = "tableroActualId";

function leerTableroGuardado(): string | null {
  try {
    return localStorage.getItem(TABLERO_GUARDADO_KEY);
  } catch {
    return null;
  }
}

function guardarTablero(tableroId: string) {
  try {
    localStorage.setItem(TABLERO_GUARDADO_KEY, tableroId);
  } catch {
    // Si el navegador no permite guardar, simplemente no se recuerda el tablero
  }
}

// Convierte un participante del tablero al formato que usa el Avatar de la tarjeta
function toTeamMember(participante: Participante): TeamMember {
  const initials = participante.nombre.split(" ").filter((palabra) => palabra.length > 0)
    .slice(0, 2).map((palabra) => palabra[0].toUpperCase()).join("");

  return {
    name: participante.nombre,
    email: participante.email,
    role: participante.esPropietario ? "Propietario" : "Miembro",
    initials,
    color: "#977a7a",
  };
}

export default function KanbanBoard() {
  const { error, setError, isCModalOpen, setIsCModalOpen, isDModalOpen,
    isUModalOpen, allTasks, setAllTasks, tableroActual, setTableroActual } = usePageContext();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedMemberEmail, setSelectedMemberEmail] = useState<string | null>(null);
  const [tableros, setTableros] = useState<Tablero[]>([]);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  // 3. Nuevos estados para manejar los datos del backend, la carga y los errores
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const memberByEmail = useMemo(
    () => new Map(participantes.map((participante) => [participante.email, toTeamMember(participante)])),
    [participantes]
  );

  useEffect(() => {
    if (!tableroActual) return;

    const client = createClient({
      url: `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/graphql`,
    });

    const unsubscribe = client.subscribe<{
      updatedPanels: {
        type: "CREADO" | "ACTUALIZADO" | "ELIMINADO";
        panel: PanelDTO;
      };
      errors?: readonly { message: string }[];
    }>({
      query: `
      subscription UpdatedPanels($tableroId: ID!) {
        updatedPanels(tableroId: $tableroId) {
          type
          panel {
            id nombre color estado fechaInicio fechaFin prioridad descripcion
            assignee { nombre email }
          }
        }
      }
    `,
      variables: { tableroId: tableroActual.id },
    }, {
      next: ({ data, errors }) => {

        if (errors?.length) {
          setError(errors.map(({ message }) => message).join(", "));
          return;
        }
        const event = data?.updatedPanels;
        
        if (!event) return;

        const task = mapPanelToTask(event.panel);

        setAllTasks((current) => {
          if (event.type === "ELIMINADO") {
            return current.filter((item) => item.id !== task.id);
          }

          // Upsert: evita duplicados si el cliente ya agregó la tarea localmente.
          return current.some((item) => item.id === task.id)
            ? current.map((item) => item.id === task.id ? task : item)
            : [...current, task];
        });
      },
      error: (err) => setError(`Error en la suscripción: ${String(err)}`),
      complete: () => {}
    });

    return () => {
      unsubscribe();
      void client.dispose();
    };
  }, [tableroActual?.id, setAllTasks, setError]);

  // Al cargar la página se consultan los tableros del usuario y se abre el último que se usó,
  // o el primero si no hay uno guardado o ya no se tiene acceso a él
  useEffect(() => {
    const fetchTableros = async () => {
      try {
        const tablerosBackend = await getTableros();
        setTableros(tablerosBackend);
        const tableroGuardado = tablerosBackend.find((tablero) => tablero.id === leerTableroGuardado());
        setTableroActual(tableroGuardado ?? tablerosBackend[0] ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido al cargar tableros");
        setIsLoading(false);
      }
    };

    fetchTableros();
  }, []);

  // useEffect para llamar al backend cada vez que cambia el tablero seleccionado
  useEffect(() => {
    if (!tableroActual) {
      return;
    }

    guardarTablero(tableroActual.id);

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
      selectedMemberEmail
        ? allTasks.filter((task) => task.assignee?.email === selectedMemberEmail)
        : allTasks,
    [selectedMemberEmail, allTasks]
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
    updatePanel({ ...draggedTask, status: destinationStatus }, tableroActual?.id);

    setDraggedTask(null);
  }

  const header = () => {
    return <header className="board__header">
      <div>
        <h1>Tus tareas</h1>
        <BoardSelector tableros={tableros} tableroActual={tableroActual} onSelect={setTableroActual}
          onCreate={() => setIsBoardModalOpen(true)} onDelete={() => setIsDeleteBoardOpen(true)}
          onParticipants={() => setIsParticipantsOpen(true)} />
        {participantes.length > 1 && <div className="board-actions">
          {tableroActual?.esPropietario && <Button text="Agregar tarea" onClick={() => { setError(null); setIsCModalOpen(true); }} />}
          <TeamFilter
            members={participantes.map((participante) => toTeamMember(participante))}
            selectedEmail={selectedMemberEmail}
            onSelect={(email) => {
              setSelectedMemberEmail(email);
            }} />
        </div>}
        <p className="board__subtitle">
          {visibleTasks.length} tarea{visibleTasks.length !== 1 && "s"}
          {selectedMemberEmail ? ` asignadas a ${memberByEmail.get(selectedMemberEmail)?.name}` : " en total"}
        </p>
      </div>
    </header>
  };

  // Pequeña validación visual mientras cargan los datos o si hay error
  if (isLoading) {
    return <div className="loading-label">Cargando paneles del usuario...</div>;
  }

  if (error && !isCModalOpen && !isUModalOpen) {
    return <div className="board">
      {header()}
      <div className="error-label">{error}
      </div>
    </div>;
  }

  return (
    <div className="board">
      {header()}

      <div className="board__columns">
        {columns.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            accentColor={col.color}
            memberByEmail={memberByEmail}
            tasks={visibleTasks.filter((task) => task.status === col.status)}
            status={col.status}
            draggedTask={draggedTask}
            onDragStart={setDraggedTask}
            onDragEnd={() => setDraggedTask(null)}
            onDrop={moveTask}
          />
        ))}
      </div>

      {isCModalOpen && <CreateModal participantes={participantes} />}
      {isUModalOpen && <UpdateModal participantes={participantes} />}
      {isDModalOpen && <DeleteModal />}
      {isBoardModalOpen && <CreateBoardModal onCreated={handleBoardCreated} onClose={() => setIsBoardModalOpen(false)} />}
      {isDeleteBoardOpen && <Modal title="Eliminar tablero" isChoose={true}
        text={`Se eliminará el tablero "${tableroActual?.nombre}" y todas sus tareas. ¿Deseas continuar?`}
        setChoose={handleDeleteBoardChoice} setShow={setIsDeleteBoardOpen} />}
      {isParticipantsOpen && tableroActual &&
        <ParticipantsModal tablero={tableroActual} onClose={handleParticipantsClosed} />}
    </div>
  );
}