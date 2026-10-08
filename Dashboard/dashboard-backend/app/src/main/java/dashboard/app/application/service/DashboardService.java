package dashboard.app.application.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dashboard.app.application.ports.input.DashboardServicePort;
import dashboard.app.application.ports.input.PanelRemoteServicePort;

public class DashboardService implements DashboardServicePort {

    private final PanelRemoteServicePort panelService;

    public DashboardService(PanelRemoteServicePort panelService) {
        this.panelService = panelService;
    }

    @Override
    public Map<String, Integer> getTasksInfo(String token) {
        try {
            List<Map<String, String>> panels = panelService.listPanels(token);
            Integer tt = 0, tc = 0, tp = 0, pt = 0;

            for (Map<String, String> panel : panels) {
                tt++;

                if (panel.get("estado").equals("PENDIENTE")) {
                    pt++;
                } else if (panel.get("estado").equals("EN_PROGRESO")) {
                    tp++;
                } else if (panel.get("estado").equals("COMPLETADO")) {
                    tc++;
                }
            }
            return Map.of("tt", tt, "tc", tc, "tp", tp, "pt", pt);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Map<String, String>> getInProgressTasks(String token) {
        try {
            List<Map<String, String>> panels = panelService.listPanels(token);
            List<Map<String, String>> inProgress = new ArrayList<>();
            for (Map<String, String> panel : panels) {
                if (panel.get("estado").equals("EN_PROGRESO")) {
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
    public List<Map<String, String>> getPendingTasks(String token) {
        try {
            List<Map<String, String>> panels = panelService.listPanels(token);
            List<Map<String, String>> pending = new ArrayList<>();
            for (Map<String, String> panel : panels) {
                if (panel.get("estado").equals("PENDIENTE")) {
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
