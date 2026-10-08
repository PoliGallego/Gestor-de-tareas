package reportes.app.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadisticasPersonales {
    
    private String propietarioId;
    
    // Métrica 1: Carga Actual
    private long tareasActivas;
    
    // Métrica 2: Puntualidad del mes (Ej: 85.5 representa 85.5%)
    private double porcentajePuntualidad;
    
    // Métrica 3: Urgencias
    private long tareasEnRiesgo;
    
    // Métrica 4: Velocidad (Ej: 2.5 días por tarea en promedio)
    private double tiempoPromedioResolucionDias;
    
}