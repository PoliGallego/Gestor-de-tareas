package reportes.app.infrastructure.adapters.out.database;

import org.springframework.stereotype.Component;
import reportes.app.domain.model.RegistroPanel;
import reportes.app.domain.port.out.RegistroPanelRepositoryPort;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RegistroPanelRepositoryAdapter implements RegistroPanelRepositoryPort {

    private final RegistroPanelJpaRepository jpaRepository;

    public RegistroPanelRepositoryAdapter(RegistroPanelJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public void guardar(RegistroPanel registroPanel) {
        RegistroPanelEntity entity = RegistroPanelEntity.builder()
                .panelIdOriginal(registroPanel.getPanelIdOriginal())
                .propietarioId(registroPanel.getPropietarioId())
                .estado(registroPanel.getEstado())
                .fechaInicio(registroPanel.getFechaInicio())
                .fechaFin(registroPanel.getFechaFin())
                .fechaCompletado(registroPanel.getFechaCompletado())
                .build();
        
        jpaRepository.save(entity);
    }

    @Override
    public List<RegistroPanel> buscarTodosPorUsuario(String propietarioId) {
        return jpaRepository.findByPropietarioId(propietarioId).stream()
                .map(this::traducirADominio)
                .collect(Collectors.toList());
    }

    @Override
    public List<RegistroPanel> buscarActivosPorUsuario(String propietarioId) {
        List<String> estadosActivos = List.of("PENDIENTE", "EN_PROGRESO");
        return jpaRepository.findByPropietarioIdAndEstadoIn(propietarioId, estadosActivos).stream()
                .map(this::traducirADominio)
                .collect(Collectors.toList());
    }

    private RegistroPanel traducirADominio(RegistroPanelEntity entity) {
        return RegistroPanel.builder()
                .panelIdOriginal(entity.getPanelIdOriginal())
                .propietarioId(entity.getPropietarioId())
                .estado(entity.getEstado())
                .fechaInicio(entity.getFechaInicio())
                .fechaFin(entity.getFechaFin())
                .fechaCompletado(entity.getFechaCompletado())
                .build();
    }
}