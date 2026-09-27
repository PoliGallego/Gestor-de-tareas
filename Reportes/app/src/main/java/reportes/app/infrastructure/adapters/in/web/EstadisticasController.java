package reportes.app.infrastructure.adapters.in.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reportes.app.domain.model.EstadisticasPersonales;
import reportes.app.domain.port.in.GenerarEstadisticasPersonalesUseCase;
import reportes.app.domain.port.out.AuthServicePort;

@RestController
@RequestMapping("/api/reportes")
public class EstadisticasController {

    private final GenerarEstadisticasPersonalesUseCase generarEstadisticasUseCase;
    private final AuthServicePort authService;
    private final boolean allowTestUserHeader;

    public EstadisticasController(
            GenerarEstadisticasPersonalesUseCase generarEstadisticasUseCase,
            AuthServicePort authService,
            @Value("${app.auth.allow-test-user-header:false}") boolean allowTestUserHeader) {
        this.generarEstadisticasUseCase = generarEstadisticasUseCase;
        this.authService = authService;
        this.allowTestUserHeader = allowTestUserHeader;
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<EstadisticasPersonales> obtenerMisEstadisticas(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @CookieValue(value = "access_token", required = false) String cookieToken) {
        
        try {
            String propietarioId = extraerPropietarioId(userIdHeader, cookieToken);
            
            EstadisticasPersonales reporteFinal = generarEstadisticasUseCase.ejecutar(propietarioId);
            return ResponseEntity.ok(reporteFinal);
            
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private String extraerPropietarioId(String userIdHeader, String cookieToken) {
        if (cookieToken != null && !cookieToken.trim().isEmpty()) {
            return authService.validarUsuario(cookieToken);
        }
        
        if (allowTestUserHeader && userIdHeader != null && !userIdHeader.trim().isEmpty()) {
            return userIdHeader.trim();
        }
        
        throw new RuntimeException("Usuario no autenticado (falta cookie 'access_token' o header de prueba)");
    }
}