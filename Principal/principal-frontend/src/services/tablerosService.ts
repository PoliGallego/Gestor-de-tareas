import { getAuthHeaders } from "./panelesService";

export interface Tablero {
  id: string;
  nombre: string;
  propietarioId: string;
  fechaCreacion?: string;
}

export async function getTableros(): Promise<Tablero[]> {
  const response = await fetch("/api/tableros", {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error al consultar tableros: ${response.status}`);
  }

  const data: Tablero[] = await response.json();
  return data;
}

export async function crearTablero(nombre: string): Promise<Tablero> {
  const response = await fetch("/api/tableros", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ nombre }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error al crear tablero: ${response.status}`);
  }

  const data: Tablero = await response.json();
  return data;
}

export async function eliminarTablero(tableroId: string) {
  const response = await fetch("/api/tableros/" + tableroId, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (response.status !== 204) {
    throw new Error(`Error al eliminar tablero: ${response.status}`);
  }
}
