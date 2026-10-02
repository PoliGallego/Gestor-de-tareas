package reportes.app.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import reportes.app.application.service.GenerarEstadisticasPersonalesService;
import reportes.app.application.service.IngestarRegistroPanelService;
import reportes.app.domain.port.in.GenerarEstadisticasPersonalesUseCase;
import reportes.app.domain.port.in.IngestarRegistroPanelUseCase;
import reportes.app.domain.port.out.RegistroPanelRepositoryPort;

@Configuration
public class BeanConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public GenerarEstadisticasPersonalesUseCase generarEstadisticasPersonalesUseCase(RegistroPanelRepositoryPort registroPanelRepositoryPort) {
        return new GenerarEstadisticasPersonalesService(registroPanelRepositoryPort);
    }

    @Bean
    public IngestarRegistroPanelUseCase ingestarRegistroPanelUseCase(RegistroPanelRepositoryPort registroPanelRepositoryPort) {
        return new IngestarRegistroPanelService(registroPanelRepositoryPort);
    }
}
