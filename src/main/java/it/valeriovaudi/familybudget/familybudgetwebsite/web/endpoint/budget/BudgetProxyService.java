package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget;

import org.slf4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toList;
import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

public class BudgetProxyService {

    private final List<String> headersToSkip;

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(BudgetProxyService.class);

    public BudgetProxyService(List<String> headersToSkip) {
        this.headersToSkip = headersToSkip;
    }

    String pathFor(WebRequest webRequest) {
        String path = (String) webRequest.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, SCOPE_REQUEST);
        String strippedPath = path.substring("/budget-service".length());
        Map<String, String[]> parameters = webRequest.getParameterMap();

        UriComponentsBuilder uriComponentsBuilder = fromUriString(strippedPath);

        parameters.forEach((name, values) -> uriComponentsBuilder.queryParam(name, stream(values).collect(toList())));

        return uriComponentsBuilder.build().toUriString();
    }

    void log(HttpMethod method, Object body, String path, HttpEntity<?> requestEntity) {
        log.debug("path: " + path);
        log.debug("method: " + method);
        log.debug("body: " + body);
        log.debug("requestEntity.body: " + requestEntity.getBody());
        log.debug("requestEntity.header: " + requestEntity.getHeaders());
        log.debug("header to be skipped: " + headersToSkip);
    }

    HttpEntity<?> httpEntityFor(Object body, MultiValueMap<String, String> headers) {
        HttpHeaders filteredHeaders = new HttpHeaders();
        log.debug("header before filtering: " + headers);

        headers.forEach((name, values) -> {
            if (!headersToSkip.contains(name)) {
                filteredHeaders.addAll(name, values);
            }
        });
        log.debug("header after filtering: " + filteredHeaders);

        HttpEntity<?> requestEntity = HttpEntity.EMPTY;
        if (body != null) {
            requestEntity = new HttpEntity(body);
        }
        return requestEntity;
    }
}
