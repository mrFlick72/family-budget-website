package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
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

@Service
class BudgetProxyService {

    private final List<String> headersToSkip;

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(BudgetProxyService.class);

    BudgetProxyService(@Value("${headersToSkip:[]}") List<String> headersToSkip) {
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
        log.debug("header before filtering: " + headers);

        headers.forEach((name, values) -> {
            if (headersToSkip.contains(name)) {
                headers.remove(name);
            }
        });
        log.debug("header before filtering: " + headers);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        if (body != null) {
            requestEntity = new HttpEntity(body, headers);
        }
        return requestEntity;
    }
}
