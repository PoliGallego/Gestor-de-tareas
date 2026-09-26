package reportes.app.domain.port.in;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface IngestarRegistroPanelUseCase {
    
    void ejecutar(Comando comando);

    // Este record actúa como el sobre del mensaje que envía el Webhook
    record Comando(
        String panelIdOriginal,
        String propietarioId,
        String estado,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        LocalDateTime fechaCompletado
    ) {}
}