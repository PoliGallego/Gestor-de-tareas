package dashboard.app.application.ports.input;

import java.util.List;
import java.util.Map;

import rmi.shared.Panel;

public interface DashboardServicePort {
    Map<String, String> getProfileInfo(String userId);
    Map<String, Integer> getTasksInfo(String userId);
    List<Panel> getInProgressTasks(String userId);
    List<Panel> getPendingTasks(String userId);
}
