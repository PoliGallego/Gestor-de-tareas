package reportes.app.domain.port.in;

import reportes.app.domain.model.EstadisticasPersonales;

public interface GenerarEstadisticasPersonalesUseCase {
    
    /**
     * Calcula y consolida todas las métricas de un usuario específico.
     */
    EstadisticasPersonales ejecutar(String propietarioId);
    
}