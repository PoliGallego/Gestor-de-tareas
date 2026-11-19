package dashboard.app.infrastructure.config;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import dashboard.app.application.ports.input.DashboardServicePort;
import dashboard.app.application.ports.input.PanelRemoteServicePort;
import dashboard.app.application.service.DashboardService;
import dashboard.app.application.service.PanelRemoteService;

@Configuration
public class ClientConfig {
    private static final Logger logger = Logger.getLogger(ClientConfig.class.getName());

    @Value("${auth.host}")
    private String authHost;

    @Value("${panel.host}")
    private String panelHost;

    @Value("${auth.port}")
    private int authPort;

    @Value("${panel.port}")
    private int panelPort;

    @Bean
    public PanelRemoteServicePort panelRemoteService() {
        logger.info("panel url: " + panelHost + panelPort);
        return new PanelRemoteService(panelHost + panelPort);
    }

    @Bean
    public DashboardServicePort dashboardService(PanelRemoteServicePort panelRemoteService) {

        return new DashboardService(panelRemoteService);
    }
}
