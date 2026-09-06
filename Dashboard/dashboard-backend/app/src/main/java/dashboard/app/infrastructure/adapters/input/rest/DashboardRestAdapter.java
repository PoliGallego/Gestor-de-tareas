package dashboard.app.infrastructure.adapters.input.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmi.shared.Panel;

import dashboard.app.application.ports.input.DashboardServicePort;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/dash")
public class DashboardRestAdapter {
    private final DashboardServicePort dashboardService;

    public DashboardRestAdapter(DashboardServicePort dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getProfile(@RequestParam String token) {
        Map<String, String> userInfo = dashboardService.getProfileInfo(token);

        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Profile not found"));
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(userInfo);
    }

    @GetMapping("/tasks")
    public ResponseEntity<Map<String, Integer>> getTasksInfo(@RequestParam String token) {
        Map<String, Integer> tasksInfo = dashboardService.getTasksInfo(token);
        if (tasksInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(tasksInfo);
    }

    @GetMapping("/in-prog")
    public ResponseEntity<List<Panel>> getInProgressTasks(@RequestParam String token) {
       List<Panel> inProgList = dashboardService.getInProgressTasks(token);
        if (inProgList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(inProgList);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Panel>> getPendingTaks(@RequestParam String token) {
        List<Panel> pendingList = dashboardService.getPendingTasks(token);
        if (pendingList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(pendingList);
    }
}
