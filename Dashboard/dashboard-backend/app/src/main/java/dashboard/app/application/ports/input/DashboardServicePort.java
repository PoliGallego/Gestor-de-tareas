package dashboard.app.application.ports.input;

import java.util.List;
import java.util.Map;

public interface DashboardServicePort {
    Map<String, Integer> getTasksInfo(String token);
    List<Map<String, String>> getInProgressTasks(String token);
    List<Map<String, String>> getPendingTasks(String token);
}
