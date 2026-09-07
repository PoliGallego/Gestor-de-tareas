package dashboard.app.application.ports.input;

import java.util.List;
import java.util.Map;

import rmi.shared.Panel;

public interface DashboardServicePort {
    Map<String, String> getProfileInfo(String token);
    Map<String, Integer> getTasksInfo(String token);
    List<Panel> getInProgressTasks(String token);
    List<Panel> getPendingTasks(String token);
}
