package reportes.app.application.service;

import reportes.app.domain.model.RegistroPanel;
import reportes.app.domain.port.in.IngestarRegistroPanelUseCase;
import reportes.app.domain.port.out.RegistroPanelRepositoryPort;

public class IngestarRegistroPanelService implements IngestarRegistroPanelUseCase {

    private final RegistroPanelRepositoryPort repositorio;

    public IngestarRegistroPanelService(RegistroPanelRepositoryPort repositorio) {
        this.repositorio = repositorio;
    }

    @Override
    public void ejecutar(Comando comando) {
        RegistroPanel nuevoRegistro = RegistroPanel.builder()
                .panelIdOriginal(comando.panelIdOriginal())
                .propietarioId(comando.propietarioId())
                .estado(comando.estado())
                .fechaInicio(comando.fechaInicio())
                .fechaFin(comando.fechaFin())
                .fechaCompletado(comando.fechaCompletado())
                .build();
        repositorio.guardar(nuevoRegistro);
    }

    @Override 
    public void ejecutarEliminar(Comando comando) {
        repositorio.eliminar(comando.panelIdOriginal());
    }
}