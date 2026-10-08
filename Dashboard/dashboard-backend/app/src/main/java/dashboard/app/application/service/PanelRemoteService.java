package dashboard.app.application.service;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.client.RestTemplate;

import dashboard.app.application.ports.input.PanelRemoteServicePort;
import dashboard.app.infrastructure.config.RestTemplateConfig;

public class PanelRemoteService implements PanelRemoteServicePort {

    private final String url;

    public PanelRemoteService(String url) {
        this.url = url;
    }

    @Override
    public List<Map<String, String>> listPanels(String token) {
        RestTemplate restTemplate = RestTemplateConfig.restTemplateWithCookies();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HttpHeaders.COOKIE, "access_token=" + token);

        HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);

        ResponseEntity<List<Map<String, String>>> response = restTemplate.exchange(
                url + "/api/paneles",
                HttpMethod.GET,
                requestEntity,
                new ParameterizedTypeReference<List<Map<String, String>>>() {
                });

        if (response.getStatusCode().value() != 200) {
            throw new ErrorResponseException(response.getStatusCode());
        }

        return response.getBody();
    }

}
