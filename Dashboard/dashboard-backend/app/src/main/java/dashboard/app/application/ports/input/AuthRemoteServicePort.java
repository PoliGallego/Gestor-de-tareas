package dashboard.app.application.ports.input;

import java.util.Map;

import org.springframework.web.ErrorResponseException;

public interface AuthRemoteServicePort {
    Map<String, String> extractSubject(String token) throws ErrorResponseException;
}
