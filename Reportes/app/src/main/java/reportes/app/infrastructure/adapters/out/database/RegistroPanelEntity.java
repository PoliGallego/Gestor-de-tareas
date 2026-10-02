package reportes.app.infrastructure.adapters.out.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "registros_panel")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroPanelEntity {

    @Id
    private String panelIdOriginal; 
    
    private String propietarioId;
    private String estado;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDateTime fechaCompletado;
}