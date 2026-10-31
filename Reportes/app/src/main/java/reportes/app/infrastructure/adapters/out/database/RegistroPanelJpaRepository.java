package reportes.app.infrastructure.adapters.out.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistroPanelJpaRepository extends JpaRepository<RegistroPanelEntity, String> {


    List<RegistroPanelEntity> findByPropietarioId(String propietarioId);
    
    List<RegistroPanelEntity> findByPropietarioIdAndEstadoIn(String propietarioId, List<String> estados);

    // responsable_id = ?1 OR (responsable_id IS NULL AND propietario_id = ?2)
    List<RegistroPanelEntity> findByResponsableIdOrResponsableIdIsNullAndPropietarioId(String responsableId, String propietarioId);
}