package reportes.app.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroPanel {
    
    private String panelIdOriginal;
    private String propietarioId;
    private String estado;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDateTime fechaCompletado;


    public boolean fueEntregadoATiempo() {
        if (fechaCompletado == null || fechaFin == null) {
            return false;
        }
        LocalDateTime limite = fechaFin.atTime(23, 59, 59);
        return !fechaCompletado.isAfter(limite); // Es puntual si no superó el límite
    }

    public boolean estaEnRiesgo() {
        if ("COMPLETADO".equalsIgnoreCase(this.estado)) {
            return false;
        }
        if (fechaFin == null) {
            return false;
        }
        
        LocalDate hoy = LocalDate.now();
        // Si la fecha límite es hoy, ya pasó, o falta 1 o 2 días.
        long diasRestantes = ChronoUnit.DAYS.between(hoy, fechaFin);
        return diasRestantes <= 2;
    }

    public long calcularDiasDeResolucion() {
        if (fechaInicio == null || fechaCompletado == null) {
            return 0;
        }
        return ChronoUnit.DAYS.between(fechaInicio, fechaCompletado.toLocalDate());
    }
    
    public boolean estaActiva() {
        return "PENDIENTE".equalsIgnoreCase(this.estado) || "EN_PROGRESO".equalsIgnoreCase(this.estado);
    }
}