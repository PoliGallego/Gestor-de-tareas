package dashboard.app.application.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import rmi.shared.AuthRmiPort;
import rmi.shared.PanelRemoteService;
import rmi.shared.RmiPanelData;
import dashboard.app.application.ports.input.DashboardServicePort;

public class DashboardService implements DashboardServicePort {

    private final AuthRmiPort authRmiPort;
    private final PanelRemoteService panelService;

    public DashboardService(PanelRemoteService panelService, AuthRmiPort authRmiPort) {
        this.authRmiPort = authRmiPort;
        this.panelService = panelService;
    }

    @Override
    public Map<String, String> getProfileInfo(String token) {
        try {
            return authRmiPort.extractSubject(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Map<String, Integer> getTasksInfo(String token) {
        try {
            List<RmiPanelData> panels = panelService.listarPaneles(getUserId(token));
            Integer tt = 0, tc = 0, tp = 0, pt = 0;

            for (RmiPanelData panel : panels) {
                tt++;

                switch (panel.getEstado()) {
                    case "PENDIENTE":
                        pt++;
                        break;
                    case "EN_PROGRESO":
                        tp++;
                        break;
                    case "COMPLETADO":
                        tc++;
                        break;
                }
            }
            return Map.of("tt", tt, "tc", tc, "tp", tp, "pt", pt);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<RmiPanelData> getInProgressTasks(String token) {
        try {
            List<RmiPanelData> panels = panelService.listarPaneles(getUserId(token));
            List<RmiPanelData> inProgress = new ArrayList<>();
            for (RmiPanelData panel : panels) {
                if (panel.getEstado().equals("EN_PROGRESO")) {
                    inProgress.add(panel);
                }
            }
            return inProgress;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<RmiPanelData> getPendingTasks(String token) {
        try {
            List<RmiPanelData> panels = panelService.listarPaneles(getUserId(token));
            List<RmiPanelData> pending = new ArrayList<>();
            for (RmiPanelData panel : panels) {
                if (panel.getEstado().equals("PENDIENTE")) {
                    pending.add(panel);
                }
            }
            return pending;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private String getUserId(String token) throws Exception {
        try {
            return authRmiPort.extractSubject(token).get("id");
        } catch (Exception e) {
            throw new Exception("Error en la obtencion del perfil");
        }
    }
}
