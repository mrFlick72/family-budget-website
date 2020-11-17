package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerMapping;

import java.util.Map;

import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;

@Slf4j
@RestController
public class ZuulReplacementEndPoint {

    private final String budgetServiceUri;
    private final RestTemplate oauth2RestTemplate;

    public ZuulReplacementEndPoint(@Value("${budgetServiceUri:http://budget-service:8080}") String budgetServiceUri,
                                   RestTemplate oauth2RestTemplate) {
        this.budgetServiceUri = budgetServiceUri;
        this.oauth2RestTemplate = oauth2RestTemplate;
    }

    @RequestMapping("/budget-service/**")
    public ResponseEntity<String> proxy(WebRequest webRequest,
                                        HttpMethod method,
                                        @RequestBody String body) {

        String path = budgetServiceUri + pathFor(webRequest);
        Map<String, String[]> parameters = requestParameterFor(webRequest);
        HttpEntity<?> requestEntity = httpEntityFor(body);

        log(method, body, path, requestEntity);

        ResponseEntity<String> response = oauth2RestTemplate.exchange(path, method, requestEntity, String.class, parameters);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    private void log(HttpMethod method, String body, String path, HttpEntity<?> requestEntity) {
        log.debug("path: " + path);
        log.debug("method: " + method);
        log.debug("body: " + body);
        log.debug("body: " + body);
        log.debug("requestEntity: " + requestEntity);
    }

    private HttpEntity<?> httpEntityFor(String body) {
        HttpEntity<?> requestEntity = HttpEntity.EMPTY;
        if (body != null) {
            requestEntity = new HttpEntity<>(body);
        }
        return requestEntity;
    }

    private Map<String, String[]> requestParameterFor(WebRequest webRequest) {
        return webRequest.getParameterMap();
    }

    private String pathFor(WebRequest webRequest) {
        String path = (String) webRequest.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, SCOPE_REQUEST);
        path = path.substring("/budget-service".length());
        return path;
    }
}
