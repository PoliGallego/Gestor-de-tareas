package reportes.app.domain.port.out;

import reportes.app.domain.model.RegistroPanel;
import java.util.List;

public interface RegistroPanelRepositoryPort {
    
    void guardar(RegistroPanel registroPanel);
    
    // Para buscar todos los paneles de un usuario (útil para varios cálculos)
    List<RegistroPanel> buscarTodosPorUsuario(String propietarioId);
    
    // Para buscar solo los activos (PENDIENTE o EN_PROGRESO)
    List<RegistroPanel> buscarActivosPorUsuario(String propietarioId);
}