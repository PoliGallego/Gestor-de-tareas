package dashboard.app.infrastructure.config;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Arrays;

import rmi.shared.AuthRmiPort;
import rmi.shared.PanelRemoteService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dashboard.app.application.ports.input.DashboardServicePort;
import dashboard.app.application.service.DashboardService;

@Configuration
public class RmiClientConfig {
    @Value("${rmi.auth.host}")
    private String authHost;

    @Value("${rmi.panel.host}")
    private String panelHost;

    @Value("${rmi.auth.port}")
    private int authPort;

    @Value("${rmi.panel.port}")
    private int panelPort;

    @Bean
    public PanelRemoteService panelRemoteService()
            throws RemoteException, NotBoundException {

        Registry registry = LocateRegistry.getRegistry(panelHost, panelPort);
        System.out.println("registro panel: " + registry.toString());
        return (PanelRemoteService) registry.lookup("PanelService");
    }

    @Bean
    public AuthRmiPort authRmiPort() throws RemoteException, NotBoundException {
        Registry registry = LocateRegistry.getRegistry(authHost, authPort);
        System.out.println("registro auth: " + Arrays.toString(registry.list()));

        AuthRmiPort service = (AuthRmiPort) registry.lookup("AuthService");
        return service;
    }

    @Bean
    public DashboardServicePort dashboardService(
            AuthRmiPort authRmiPort,
            PanelRemoteService panelRemoteService) {

        return new DashboardService(panelRemoteService, authRmiPort);
    }
}
