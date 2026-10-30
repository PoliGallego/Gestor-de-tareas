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
