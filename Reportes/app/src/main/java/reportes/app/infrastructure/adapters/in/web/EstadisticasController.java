package reportes.app.infrastructure.adapters.in.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reportes.app.domain.model.EstadisticasPersonales;
import reportes.app.domain.port.in.GenerarEstadisticasPersonalesUseCase;

@RestController
@RequestMapping("/api/reportes")
public class EstadisticasController {

    private final GenerarEstadisticasPersonalesUseCase generarEstadisticasUseCase;

    public EstadisticasController(GenerarEstadisticasPersonalesUseCase generarEstadisticasUseCase) {
        this.generarEstadisticasUseCase = generarEstadisticasUseCase;
    }

    // Endpoint: GET http://localhost:8081/api/reportes/estadisticas/USUARIO-123
    @GetMapping("/estadisticas/{propietarioId}")
    public ResponseEntity<EstadisticasPersonales> obtenerMisEstadisticas(@PathVariable String propietarioId) {
        
        // 1. Le pedimos al Servicio que orqueste todo el cálculo para este usuario específico.
        EstadisticasPersonales reporteFinal = generarEstadisticasUseCase.ejecutar(propietarioId);
        
        // 2. Devolvemos el modelo. Spring Boot automáticamente lo transforma en un JSON limpio 
        // para que el frontend dibuje las gráficas.
        return ResponseEntity.ok(reporteFinal);
    }
}