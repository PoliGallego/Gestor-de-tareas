import type { Task, TaskPriority, TaskStatus } from "../types";

export interface PanelDTO {
  id: string;
  nombre: string;
  color?: string;
  estado: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADO";
  fechaInicio?: string;
  fechaFin?: string;
  prioridad: number;
  descripcion: string
  fechaCreacion?: string;
  assignee?: {
    nombre: string;
    email: string;
  };
}

export interface PanelRequest {
  nombre: string;
  color?: string;
  estado: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADO";
  fechaInicio?: string;
  fechaFin?: string;
  prioridad: number;
  tableroId: string;
  panelId: string | null;
  responsableEmail?: string | null;
}

export interface CrearPanelRequest {
  nombre: string;
  color?: string;
  estado: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADO";
  prioridad?: number;
  fechaInicio?: string;
  fechaFin?: string;
}

export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  return headers;
}

export function mapPanelToTask(panel: PanelDTO): Task {
  const statusMap: Record<string, TaskStatus> = {
    PENDIENTE: "todo",
    EN_PROGRESO: "in-progress",
    COMPLETADO: "done",
  };

  const priorityMap: Record<number, TaskPriority> = {
    1: "Baja",
    2: "Media",
    3: "Alta",
    4: "Urgente",
  };

  return {
    id: panel.id,
    title: panel.nombre,
    description: `Panel ID: ${panel.id} - Color: ${panel.color || "predeterminado"}`,
    priority: priorityMap[panel.prioridad] || "Media",
    status: statusMap[panel.estado] || "todo",
    dueDate: panel.fechaFin || "",
    tags: panel.color ? [panel.color] : ["panel"],
    color: panel.color ? panel.color : "panel",
    startDate: panel.fechaInicio || "",
    assignee: panel.assignee ? {
      name: panel.assignee.nombre,
      email: panel.assignee.email,
      role: null,
      initials: null,
      color: null
    } : null
  };
}

export function mapTaskToPanel(task: Task): PanelDTO {
  const statusMap: Record<TaskStatus, ("PENDIENTE" | "EN_PROGRESO" | "COMPLETADO")> = {
    todo: "PENDIENTE",
    "in-progress": "EN_PROGRESO",
    done: "COMPLETADO",
  };

  const priorityMap: Record<TaskPriority, number> = {
    "Baja": 1,
    "Media": 2,
    "Alta": 3,
    "Urgente": 4,
  };

  return {
    nombre: task.title,
    estado: statusMap[task.status],
    prioridad: priorityMap[task.priority],
    color: task.color,
    fechaInicio: task.startDate,
    fechaFin: task.dueDate,
    id: task.id,
    descripcion: task.description,
    assignee: task.assignee ? {
      nombre: task.assignee.name,
      email: task.assignee.email
    } : undefined
  };
}

export function mapTaskToPanelRequest(task: Task, tableroId: string | undefined): PanelRequest {
  const statusMap = {
    todo: "PENDIENTE",
    "in-progress": "EN_PROGRESO",
    done: "COMPLETADO",
  } as const;

  return {
    panelId: task.id,
    nombre: task.title,
    color: task.color,
    estado: statusMap[task.status],
    prioridad: {
      Baja: 1,
      Media: 2,
      Alta: 3,
      Urgente: 4,
    }[task.priority],
    fechaInicio: task.startDate || undefined,
    fechaFin: task.dueDate || undefined,
    tableroId: tableroId ?? "",
    responsableEmail: task.assignee?.email || null,
  };
}

export async function getPaneles(tableroId: string): Promise<Task[]> {
  const query = `
    query Panels($tableroId: ID!) {
      getPanels(tableroId: $tableroId) {
        id
        nombre
        color
        estado
        fechaInicio
        fechaFin
        prioridad
        descripcion
        assignee {
          nombre
          email
        }
      }
    }`;

  const result = await fetchGraphQL({
    query,
    variables: { tableroId },
  });

  const data: PanelDTO[] = result.data.getPanels;
  return data.map(mapPanelToTask);
}

/**
 * Crea un nuevo panel en el backend.
 */
export async function crearPanel(nuevoPanel: PanelRequest) {
  const query = `
    mutation Panel($nuevoPanel: PanelInput!) {
      createPanel(panel: $nuevoPanel) {
        id
        nombre
        color
        estado
        fechaInicio
        fechaFin
        prioridad
        descripcion
        assignee {
          nombre
          email
        }
      }
    }`;

  fetchGraphQL({
    query,
    variables: { nuevoPanel },
  });
}

export async function updatePanel(task: Task, tableroId: string | undefined) {
  let panel: PanelRequest = mapTaskToPanelRequest(task, tableroId);

  const query = `
    mutation Panel($panel: PanelInput!) {
      updatePanel(panel: $panel) {
        id
        nombre
        color
        estado
        fechaInicio
        fechaFin
        prioridad
        descripcion
        assignee {
          nombre
          email
        }
      }
    }`;

  fetchGraphQL({
    query,
    variables: { panel },
  });
}

export async function deletePanel(panelId: String) {
  const query = `
    mutation Panel($panelId: ID!) {
      deletePanel(panelId: $panelId)
    }`;

  fetchGraphQL({
    query,
    variables: { panelId },
  });
}

async function fetchGraphQL(body: {}) {
  const response = await fetch("http://localhost:8081/graphql", {
    method: "POST",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok || result.errors?.length) {
    throw new Error(
      result.errors?.map((error: { message: string }) => error.message).join(", ")
      ?? `Error HTTP ${response.status}`,
    );
  }

  return result;
}