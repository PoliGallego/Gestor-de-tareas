package reportes.app.infrastructure.adapters.in.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reportes.app.domain.port.in.IngestarRegistroPanelUseCase;
import reportes.app.domain.port.in.IngestarRegistroPanelUseCase.Comando;

@RestController
@RequestMapping("/api/webhooks/paneles")
public class IngestaWebhookController {

    private final IngestarRegistroPanelUseCase ingestarUseCase;

    public IngestaWebhookController(IngestarRegistroPanelUseCase ingestarUseCase) {
        this.ingestarUseCase = ingestarUseCase;
    }

    @PostMapping("/evento")
    public ResponseEntity<Void> recibirEventoPanel(@RequestBody Comando comando) {
        ingestarUseCase.ejecutar(comando);
        
        return ResponseEntity.ok().build();
    }

    @PostMapping("/evento/eliminacion")
    public ResponseEntity<Void> recibirEventoEliminacionPanel(@RequestBody Comando comando) {
        ingestarUseCase.ejecutarEliminar(comando);
        
        return ResponseEntity.ok().build();
    }
}