package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toList;
import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

@Slf4j
@RestController
public class BudgetEndPoint {

    private final String budgetServiceUri;
    private final RestTemplate budgetRestTemplate;

    public BudgetEndPoint(@Value("${budgetServiceUri:http://budget-service:8080}") String budgetServiceUri,
                          RestTemplate budgetRestTemplate) {
        this.budgetServiceUri = budgetServiceUri;
        this.budgetRestTemplate = budgetRestTemplate;
    }

    @RequestMapping("/budget-service/**")
    public ResponseEntity<String> proxy(WebRequest webRequest,
                                        HttpMethod method,
                                        @RequestHeader MultiValueMap<String, String> headers,
                                        @RequestBody(required = false) String body) {

        String path = budgetServiceUri + pathFor(webRequest);
        HttpEntity<?> requestEntity = httpEntityFor(body, headers);

        log(method, body, path, requestEntity);

        ResponseEntity<String> response = budgetRestTemplate.exchange(path, method, requestEntity, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    private HttpEntity<?> httpEntityFor(String body, MultiValueMap<String, String> headers) {
        HttpEntity<?> requestEntity = HttpEntity.EMPTY;
        if (body != null) {
            requestEntity = new HttpEntity(body, headers);
        }
        return requestEntity;
    }

    private String pathFor(WebRequest webRequest) {
        String path = (String) webRequest.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, SCOPE_REQUEST);
        String strippedPath = path.substring("/budget-service".length());
        Map<String, String[]> parameters = webRequest.getParameterMap();

        UriComponentsBuilder uriComponentsBuilder = fromUriString(strippedPath);

        parameters.forEach((name, values) -> uriComponentsBuilder.queryParam(name, stream(values).collect(toList())));

        return uriComponentsBuilder.build().toUriString();
    }

    private void log(HttpMethod method, String body, String path, HttpEntity<?> requestEntity) {
        log.debug("path: " + path);
        log.debug("method: " + method);
        log.debug("body: " + body);
        log.debug("requestEntity: " + requestEntity);
    }
}