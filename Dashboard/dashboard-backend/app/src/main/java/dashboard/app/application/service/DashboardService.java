package dashboard.app.application.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import rmi.shared.Panel;
import rmi.shared.EstadoPanel;
import rmi.shared.AuthRmiPort;
import rmi.shared.PanelRemoteService;

import dashboard.app.application.ports.input.DashboardServicePort;

public class DashboardService implements DashboardServicePort {

    private final AuthRmiPort authRmiPort;
    private final PanelRemoteService panelService;

    public DashboardService(PanelRemoteService panelService, AuthRmiPort authRmiPort) {
        this.authRmiPort = authRmiPort;
        this.panelService = panelService;
    }

    @Override
    public Map<String, String> getProfileInfo(String userId) {
        try {
            System.out.println(authRmiPort.extractSubject(userId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Map<String, Integer> getTasksInfo(String userId) {
        try {
            List<Panel> panels = panelService.listarPaneles(userId);
            Integer tt = 0, tc = 0, tp = 0, pt = 0;

            for (Panel panel : panels) {
                tt++;

                switch (panel.getEstado()) {
                    case PENDIENTE:
                        pt++;
                        break;
                    case EN_PROGRESO:
                        tp++;
                        break;
                    case COMPLETADO:
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
    public List<Panel> getInProgressTasks(String userId) {
        try {
            List<Panel> panels = panelService.listarPaneles(userId);
            List<Panel> inProgress = new ArrayList<>();
            for (Panel panel : panels) {
                if (panel.getEstado() == EstadoPanel.EN_PROGRESO) {
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
    public List<Panel> getPendingTasks(String userId) {
        try {
            List<Panel> panels = panelService.listarPaneles(userId);
            List<Panel> pending = new ArrayList<>();
            for (Panel panel : panels) {
                if (panel.getEstado() == EstadoPanel.PENDIENTE) {
                    pending.add(panel);
                }
            }
            return pending;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
