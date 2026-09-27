package dashboard.app.application.ports.input;

import java.util.List;
import java.util.Map;

public interface  PanelRemoteServicePort {
    List<Map<String, String>> listPanels(String token);
}
