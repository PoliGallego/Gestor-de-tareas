package dashboard.app.infrastructure.adapters.input.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboard.app.application.ports.input.DashboardServicePort;

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

    @GetMapping("/tasks")
    public ResponseEntity<Map<String, Integer>> getTasksInfo(
        @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Map<String, Integer> tasksInfo = dashboardService.getTasksInfo(token);
        if (tasksInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(tasksInfo);
    }

    @GetMapping("/in-prog")
    public ResponseEntity<List<Map<String, String>>> getInProgressTasks(
        @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Map<String, String>> inProgList = dashboardService.getInProgressTasks(token);
        if (inProgList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(inProgList);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Map<String, String>>> getPendingTaks(
        @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Map<String, String>> pendingList = dashboardService.getPendingTasks(token);
        if (pendingList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(pendingList);
    }
}
