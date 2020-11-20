package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toList;
import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

@Slf4j
@Service
class BudgetProxyService {

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
        log.debug("requestEntity: " + requestEntity.getBody());
        log.debug("requestEntity: " + requestEntity.getHeaders());
    }

    HttpEntity<?> httpEntityFor(Object body, MultiValueMap<String, String> headers) {
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        if (body != null) {
            requestEntity = new HttpEntity(body, headers);
        }
        return requestEntity;
    }
}
