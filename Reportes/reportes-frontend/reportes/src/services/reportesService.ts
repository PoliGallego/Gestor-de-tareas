// src/services/reportesService.ts

export interface EstadisticasPersonales {
  propietarioId: string;
  tareasActivas: number;
  tareasEnRiesgo: number;
  porcentajePuntualidad: number;
  tiempoPromedioResolucionDias: number;
}

export class UnauthorizedError extends Error {
  constructor(message = 'No autorizado. Tu sesión ha expirado o falta la cookie de acceso.') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export const obtenerEstadisticasPersonales = async (): Promise<EstadisticasPersonales> => {
  const response = await fetch('http://localhost:8083/api/reportes/estadisticas', {
    method: 'GET',
    credentials: 'include', // CRÍTICO: Envía la cookie 'access_token' para evitar el 401
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    throw new UnauthorizedError('Tu sesión ha expirado o no tienes permisos para acceder a las estadísticas.');
  }

  if (!response.ok) {
    throw new Error(`Error en el servidor de reportes (${response.status}): ${response.statusText}`);
  }

  return await response.json();
};