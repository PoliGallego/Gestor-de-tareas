import type { Task, TaskPriority, TaskStatus } from "../types";

export interface PanelDTO {
  id: string;
  nombre: string;
  color?: string;
  estado: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADO";
  fechaInicio?: string;
  fechaFin?: string;
  prioridad: number;
  propietarioId: string;
  fechaCreacion?: string;
}

export interface CrearPanelRequest {
  nombre: string;
  color?: string;
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
    assigneeId: panel.propietarioId || "u1",
    priority: priorityMap[panel.prioridad] || "Media",
    status: statusMap[panel.estado] || "todo",
    dueDate: panel.fechaFin || panel.fechaInicio || "",
    tags: panel.color ? [panel.color] : ["panel"],
  };
}

export async function getPaneles(): Promise<Task[]> {
  const response = await fetch("/api/paneles", {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error(`Error al consultar paneles: ${response.status} ${response.statusText}`);
  }

  const data: PanelDTO[] = await response.json();
  return data.map(mapPanelToTask);
}

/**
 * Crea un nuevo panel en el backend.
 */
export async function crearPanel(nuevoPanel: CrearPanelRequest): Promise<Task> {
  const response = await fetch("/api/paneles", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(nuevoPanel),
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error(`Error al crear panel: ${response.status}`);
  }

  const data: PanelDTO = await response.json();
  return mapPanelToTask(data);
}