import { getAuthHeaders } from "./panelesService";

export interface Tablero {
  id: string;
  nombre: string;
  propietarioId: string;
  fechaCreacion?: string;
  esPropietario: boolean;
}

export interface Participante {
  usuarioId: string;
  nombre: string;
  email: string | null;
  esPropietario: boolean;
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

export async function getParticipantes(tableroId: string): Promise<Participante[]> {
  const response = await fetch("/api/tableros/" + tableroId + "/miembros", {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error al consultar participantes: ${response.status}`);
  }

  const data: Participante[] = await response.json();
  return data;
}

export async function agregarMiembro(tableroId: string, email: string): Promise<Participante> {
  const response = await fetch("/api/tableros/" + tableroId + "/miembros", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (response.status === 404) {
    throw new Error("No existe un usuario registrado con ese correo");
  }

  if (response.status === 400) {
    throw new Error("El correo no es válido o el usuario ya pertenece al tablero");
  }

  if (!response.ok) {
    throw new Error(`Error al agregar participante: ${response.status}`);
  }

  const data: Participante = await response.json();
  return data;
}

export async function quitarMiembro(tableroId: string, usuarioId: string) {
  const response = await fetch("/api/tableros/" + tableroId + "/miembros/" + usuarioId, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (response.status !== 204) {
    throw new Error(`Error al quitar participante: ${response.status}`);
  }
}
