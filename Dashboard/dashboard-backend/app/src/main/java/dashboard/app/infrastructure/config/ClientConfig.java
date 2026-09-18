package dashboard.app.infrastructure.config;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import dashboard.app.application.ports.input.AuthRemoteServicePort;
import dashboard.app.application.ports.input.DashboardServicePort;
import dashboard.app.application.ports.input.PanelRemoteServicePort;
import dashboard.app.application.service.AuthRemoteService;
import dashboard.app.application.service.DashboardService;
import dashboard.app.application.service.PanelRemoteService;

@Configuration
public class ClientConfig {

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
       return new PanelRemoteService(panelHost + panelPort);
    }

    @Bean
    public AuthRemoteServicePort authRmiPort() throws RemoteException, NotBoundException {
        return new AuthRemoteService(authHost + authPort);
    }

    @Bean
    public DashboardServicePort dashboardService(
            AuthRemoteServicePort authRemoteService,
            PanelRemoteServicePort panelRemoteService) {

        return new DashboardService(panelRemoteService, authRemoteService);
    }
}
