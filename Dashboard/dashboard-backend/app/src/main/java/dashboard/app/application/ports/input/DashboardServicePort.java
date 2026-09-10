package dashboard.app.application.ports.input;

import java.util.List;
import java.util.Map;

import rmi.shared.RmiPanelData;

public interface DashboardServicePort {
    Map<String, String> getProfileInfo(String token);
    Map<String, Integer> getTasksInfo(String token);
    List<RmiPanelData> getInProgressTasks(String token);
    List<RmiPanelData> getPendingTasks(String token);
}
