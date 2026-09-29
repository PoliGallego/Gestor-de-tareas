import type { TaskPriority, TaskStatus } from "../types";

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;

const PRIORITIES: TaskPriority[] = ["Baja", "Media", "Alta", "Urgente"];
const STATUSES: TaskStatus[] = ["todo", "in-progress", "done"];
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export interface PanelFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string;
  dueDate: string;
}

function isValidDate(value: string): boolean {
  return DATE_REGEX.test(value) && !Number.isNaN(new Date(value).getTime());
}

/**
 * Valida el formulario de creación/edición de paneles.
 * Retorna el mensaje de error o null si todo es correcto.
 */
export function validatePanelForm(form: PanelFormData): string | null {
  const title = form.title.trim();
  if (title.length === 0) {
    return "El título es obligatorio";
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return `El título no puede superar ${MAX_TITLE_LENGTH} caracteres`;
  }
  if (form.description.length > MAX_DESCRIPTION_LENGTH) {
    return `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres`;
  }
  if (!PRIORITIES.includes(form.priority)) {
    return "La prioridad seleccionada no es válida";
  }
  if (!STATUSES.includes(form.status)) {
    return "El estado seleccionado no es válido";
  }
  if (form.startDate && !isValidDate(form.startDate)) {
    return "La fecha de inicio no es válida";
  }
  if (form.dueDate && !isValidDate(form.dueDate)) {
    return "La fecha límite no es válida";
  }
  if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
    return "La fecha límite no puede ser anterior a la fecha de inicio";
  }
  return null;
}
