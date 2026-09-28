// src/components/ReportesDashboard.tsx
import { useEffect, useState, useCallback } from 'react';
import { obtenerEstadisticasPersonales, UnauthorizedError } from '../services/reportesService';
import type { EstadisticasPersonales } from '../services/reportesService';
import { Button } from '@gestor-tareas/react-components';
import '../assets/ReportesDashboard.css';

export const ReportesDashboard: React.FC = () => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasPersonales | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsUnauthorized(false);
      const data = await obtenerEstadisticasPersonales();
      setEstadisticas(data);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        setIsUnauthorized(true);
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado al cargar las estadísticas.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const irAlLogin = () => {
    window.location.href = 'http://localhost:3000/';
  };

  const formatearDecimal = (valor: number | undefined): string => {
    if (valor === undefined || isNaN(valor)) return '0.0';
    return Number(valor).toFixed(1);
  };

  return (
    <div className="reportes-body">
      <div className="reportes-wrapper">
        {/* Encabezado Principal */}
        <header className="reportes-header-box">
          <div className="reportes-header-text">
            <h1 className="reportes-title">Panel de Rendimiento Personal</h1>
            <p className="reportes-subtitle">
              Métricas clave de productividad, puntualidad y estado de tus tareas asignadas.
            </p>
          </div>
          <div className="reportes-actions">
            <Button
              variant="quiet"
              text={loading ? 'Actualizando...' : 'Actualizar'}
              onClick={cargarDatos}
              disabled={loading}
            />
          </div>
        </header>

        {/* Alerta de Error 401: Sesión Expirada */}
        {isUnauthorized && (
          <div className="container reportes-alert-container warning-border">
            <div className="reportes-alert-content">
              <div className="alert-icon-box">🔒</div>
              <div className="alert-texts">
                <h2>Acceso Restringido o Sesión Expirada</h2>
                <p>{error || 'Tu sesión no es válida o ha expirado. Por favor, inicia sesión nuevamente para continuar.'}</p>
              </div>
            </div>
            <div className="alert-buttons">
              <Button variant="primary" text="Iniciar Sesión" onClick={irAlLogin} />
              <Button variant="quiet" text="Reintentar" onClick={cargarDatos} />
            </div>
          </div>
        )}

        {/* Alerta de Error General (red, conexión al microservicio, etc.) */}
        {error && !isUnauthorized && (
          <div className="container reportes-alert-container danger-border">
            <div className="reportes-alert-content">
              <div className="alert-icon-box">⚠️</div>
              <div className="alert-texts">
                <h2>Error de Conexión</h2>
                <p>{error}</p>
              </div>
            </div>
            <div className="alert-buttons">
              <Button variant="primary" text="Reintentar" onClick={cargarDatos} />
            </div>
          </div>
        )}

        {/* Estado de Carga (Skeletons) */}
        {loading && !estadisticas && (
          <div className="metricas-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="container metrica-card skeleton-box">
                <div className="skeleton-placeholder skeleton-header" />
                <div className="skeleton-placeholder skeleton-value" />
                <div className="skeleton-placeholder skeleton-detail" />
              </div>
            ))}
          </div>
        )}

        {/* Tarjetas de Métricas */}
        {estadisticas && (
          <>
            <div className="metricas-grid">
              {/* Tarjeta 1: Tareas Activas */}
              <div className="container metrica-card activa">
                <div className="card-header-row">
                  <span className="card-badge badge-activa">En Curso</span>
                  <span className="card-emoji">📋</span>
                </div>
                <h3 className="card-label">Tareas Activas</h3>
                <div className="valor-container">
                  <span className="valor-principal">{estadisticas.tareasActivas}</span>
                </div>
                <p className="card-info">Tareas que se encuentran actualmente en progreso o pendientes.</p>
              </div>

              {/* Tarjeta 2: Tareas en Riesgo */}
              <div className={`container metrica-card riesgo ${estadisticas.tareasEnRiesgo > 0 ? 'alerta-activa' : ''}`}>
                <div className="card-header-row">
                  <span className={`card-badge ${estadisticas.tareasEnRiesgo > 0 ? 'badge-riesgo-alerta' : 'badge-riesgo-ok'}`}>
                    {estadisticas.tareasEnRiesgo > 0 ? 'Atención' : 'Estable'}
                  </span>
                  <span className="card-emoji">⚡</span>
                </div>
                <h3 className="card-label">Tareas en Riesgo</h3>
                <div className="valor-container">
                  <span className={`valor-principal ${estadisticas.tareasEnRiesgo > 0 ? 'texto-riesgo' : ''}`}>
                    {estadisticas.tareasEnRiesgo}
                  </span>
                </div>
                <p className="card-info">Tareas con fecha próxima a expirar o tiempos de entrega comprometidos.</p>
              </div>

              {/* Tarjeta 3: Puntualidad */}
              <div className="container metrica-card puntualidad">
                <div className="card-header-row">
                  <span className="card-badge badge-puntualidad">Cumplimiento</span>
                  <span className="card-emoji">🎯</span>
                </div>
                <h3 className="card-label">Puntualidad</h3>
                <div className="valor-container">
                  <span className="valor-principal">
                    {formatearDecimal(estadisticas.porcentajePuntualidad)}
                    <span className="unidad">%</span>
                  </span>
                </div>
                <div className="barra-progreso-fondo">
                  <div
                    className="barra-progreso-relleno"
                    style={{
                      width: `${Math.min(Math.max(estadisticas.porcentajePuntualidad, 0), 100)}%`,
                    }}
                  />
                </div>
                <p className="card-info">Porcentaje de tareas completadas antes o durante su fecha pactada.</p>
              </div>

              {/* Tarjeta 4: Tiempo Promedio de Resolución */}
              <div className="container metrica-card tiempo">
                <div className="card-header-row">
                  <span className="card-badge badge-tiempo">Agilidad</span>
                  <span className="card-emoji">⏱️</span>
                </div>
                <h3 className="card-label">Resolución Promedio</h3>
                <div className="valor-container">
                  <span className="valor-principal">
                    {formatearDecimal(estadisticas.tiempoPromedioResolucionDias)}
                    <span className="unidad"> días</span>
                  </span>
                </div>
                <p className="card-info">Tiempo medio transcurrido desde la creación hasta la resolución de la tarea.</p>
              </div>
            </div>

            {/* Diagnóstico y Resumen de Estado */}
            <div className="container reportes-diagnostico-container">
              <div className="diagnostico-header">
                <h2>Resumen de Diagnóstico</h2>
              </div>
              <div className="diagnostico-items">
                <div className="diagnostico-item">
                  <span className="diagnostico-bullet">📌</span>
                  <p>
                    <strong>Carga de trabajo: </strong>
                    Tienes <b>{estadisticas.tareasActivas}</b> {estadisticas.tareasActivas === 1 ? 'tarea activa' : 'tareas activas'}.
                    {estadisticas.tareasEnRiesgo > 0
                      ? ` De ellas, ${estadisticas.tareasEnRiesgo} requieren atención prioritaria para evitar retrasos.`
                      : ' Todas marchan dentro del calendario esperado.'}
                  </p>
                </div>
                <div className="diagnostico-item">
                  <span className="diagnostico-bullet">📊</span>
                  <p>
                    <strong>Efectividad mensual: </strong>
                    Tu puntualidad actual es del <b>{formatearDecimal(estadisticas.porcentajePuntualidad)}%</b> con un tiempo medio de resolución de <b>{formatearDecimal(estadisticas.tiempoPromedioResolucionDias)} días</b> por tarea.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportesDashboard;