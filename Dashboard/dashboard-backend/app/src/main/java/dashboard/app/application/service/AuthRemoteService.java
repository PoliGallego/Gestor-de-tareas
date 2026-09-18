package dashboard.app.application.service;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.client.RestTemplate;

import dashboard.app.application.ports.input.AuthRemoteServicePort;

public class AuthRemoteService implements AuthRemoteServicePort {

    private final String url;
    private final RestTemplate restTemplate = new RestTemplate();

    public AuthRemoteService(String url) {
        this.url = url;
    }

    @Override
    public Map<String, String> extractSubject(String token) throws ErrorResponseException {
        ResponseEntity<Map<String, String>> response = restTemplate.exchange(
                url + "/extract?token=" + token,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, String>>() {
                });

        return response.getBody();
    }

}
