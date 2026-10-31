package dashboard.app.infrastructure.adapters.input.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboard.app.application.ports.input.DashboardServicePort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/dash")
public class DashboardRestAdapter {
    private final DashboardServicePort dashboardService;

    public DashboardRestAdapter(DashboardServicePort dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboard(
            @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Map<String, Object> output = new HashMap<>();

        Map<String, Integer> tasksInfo = dashboardService.getTasksInfo(token);
        if (tasksInfo != null) {
            output.put("count", tasksInfo);
        }

        List<Map<String, String>> inProgList = dashboardService.getInProgressTasks(token);
        if (inProgList != null) {
            output.put("inprog", inProgList);
        }

        List<Map<String, String>> pendingList = dashboardService.getPendingTasks(token);
        if (pendingList != null) {
            output.put("pending", pendingList);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(output);
    }
}
