package reportes.app.infrastructure.adapters.out.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroPanelJpaRepository extends JpaRepository<RegistroPanelEntity, String> {


    List<RegistroPanelEntity> findByPropietarioId(String propietarioId);
    
    List<RegistroPanelEntity> findByPropietarioIdAndEstadoIn(String propietarioId, List<String> estados);
}