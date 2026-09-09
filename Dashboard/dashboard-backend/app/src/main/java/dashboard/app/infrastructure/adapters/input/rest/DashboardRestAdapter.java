package dashboard.app.infrastructure.adapters.input.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmi.shared.AuthRmiPort;
import rmi.shared.RmiPanelData;
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

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getProfile(
            @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Map<String, String> userInfo = dashboardService.getProfileInfo(token);

        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Profile not found"));
        }

        return ResponseEntity.ok(userInfo);
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
    public ResponseEntity<List<RmiPanelData>> getInProgressTasks(
        @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<RmiPanelData> inProgList = dashboardService.getInProgressTasks(token);
        if (inProgList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(inProgList);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<RmiPanelData>> getPendingTaks(
        @CookieValue(name = "access_token", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<RmiPanelData> pendingList = dashboardService.getPendingTasks(token);
        if (pendingList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(pendingList);
    }
}
