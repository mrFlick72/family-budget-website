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
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;

@Slf4j
@RestController
public class ZuulReplacementEndPoint {

    private final String budgetServiceUri;
    private final RestTemplate budgetRestTemplate;

    public ZuulReplacementEndPoint(@Value("${budgetServiceUri:http://budget-service:8080}") String budgetServiceUri,
                                   RestTemplate budgetRestTemplate) {
        this.budgetServiceUri = budgetServiceUri;
        this.budgetRestTemplate = budgetRestTemplate;
    }

    @RequestMapping("/budget-service/**")
    public ResponseEntity<String> proxy(WebRequest webRequest,
                                        HttpMethod method,
                                        @RequestBody(required = false) String body) {

        Map<String, List<String>> parameters = requestParameterFor(webRequest);
        String path = budgetServiceUri + pathFor(webRequest, parameters);
        HttpEntity<?> requestEntity = httpEntityFor(body);

        log(method, body, path, requestEntity, parameters);

        ResponseEntity<String> response = budgetRestTemplate.exchange(path, method, requestEntity, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    private void log(HttpMethod method, String body, String path, HttpEntity<?> requestEntity, Map<String, List<String>> parameters) {
        log.debug("path: " + path);
        log.debug("method: " + method);
        log.debug("body: " + body);
        log.debug("parameters: " + parameters);
        log.debug("requestEntity: " + requestEntity);
    }

    private HttpEntity<?> httpEntityFor(String body) {
        HttpEntity<?> requestEntity = HttpEntity.EMPTY;
        if (body != null) {
            requestEntity = new HttpEntity<>(body);
        }
        return requestEntity;
    }

    private Map<String, List<String>> requestParameterFor(WebRequest webRequest) {

        return webRequest.getParameterMap().
                entrySet().stream()
                .map(entry -> Map.of(entry.getKey(), Arrays.stream(entry.getValue()).collect(Collectors.toList())))
                .reduce(new HashMap(), (i, j) -> {
                    i.putAll(j);
                    return i;
                });
    }

    private String pathFor(WebRequest webRequest, Map<String, List<String>> parameters) {
        String path = (String) webRequest.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, SCOPE_REQUEST);
        path = path.substring("/budget-service".length());

        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUriString(path);

        parameters.forEach(uriComponentsBuilder::queryParam);

        return uriComponentsBuilder.build().toUriString();
    }
}