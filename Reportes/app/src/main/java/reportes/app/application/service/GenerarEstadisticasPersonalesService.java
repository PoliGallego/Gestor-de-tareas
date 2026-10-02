package reportes.app.application.service;

import reportes.app.domain.model.EstadisticasPersonales;
import reportes.app.domain.model.RegistroPanel;
import reportes.app.domain.port.in.GenerarEstadisticasPersonalesUseCase;
import reportes.app.domain.port.out.RegistroPanelRepositoryPort;

import java.util.List;

public class GenerarEstadisticasPersonalesService implements GenerarEstadisticasPersonalesUseCase {

    private final RegistroPanelRepositoryPort repositorio;

    public GenerarEstadisticasPersonalesService(RegistroPanelRepositoryPort repositorio) {
        this.repositorio = repositorio;
    }

    @Override
    public EstadisticasPersonales ejecutar(String propietarioId) {
        List<RegistroPanel> historial = repositorio.buscarTodosPorUsuario(propietarioId);

        long activas = 0;
        long enRiesgo = 0;
        long completadas = 0;
        long entregadasATiempo = 0;
        long totalDiasResolucion = 0;

        for (RegistroPanel panel : historial) {
            
            if (panel.estaActiva()) {
                activas++;
            }
            
            if (panel.estaEnRiesgo()) {
                enRiesgo++;
            }

            if ("COMPLETADO".equalsIgnoreCase(panel.getEstado())) {
                completadas++;
                
                if (panel.fueEntregadoATiempo()) {
                    entregadasATiempo++;
                }
                
                totalDiasResolucion += panel.calcularDiasDeResolucion();
            }
        }

        double porcentajePuntualidad = 0;
        double tiempoPromedio = 0;
        
        if (completadas > 0) {
            porcentajePuntualidad = ((double) entregadasATiempo / completadas) * 100.0;
            tiempoPromedio = (double) totalDiasResolucion / completadas;
        }
        
        return EstadisticasPersonales.builder()
                .propietarioId(propietarioId)
                .tareasActivas(activas)
                .tareasEnRiesgo(enRiesgo)
                .porcentajePuntualidad(porcentajePuntualidad)
                .tiempoPromedioResolucionDias(tiempoPromedio)
                .build();
    }
}