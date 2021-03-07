package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget;

import org.slf4j.Logger;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.Optional;

import static java.lang.String.format;
import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toList;
import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;
import static org.springframework.web.util.UriComponentsBuilder.fromUriString;

@Service
public class BudgetProxyService {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(BudgetProxyService.class);

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
    }

    void log(ResponseEntity responseEntity) {
        log.debug("responseEntity.body: " + responseEntity.getBody());
        log.debug("responseEntity.header: " + responseEntity.getHeaders());
        log.debug("responseEntity.statusCode: " + responseEntity.getStatusCode());
    }

    HttpEntity<?> httpEntityFor(Object body) {
        HttpEntity<?> requestEntity = HttpEntity.EMPTY;
        if (body != null) {
            requestEntity = new HttpEntity(body);
        }
        return requestEntity;
    }

    HttpHeaders responseHeadersFrom(HttpHeaders responseHeaders) {
        HttpHeaders result = new HttpHeaders();
        setContentLengthHeader(responseHeaders, result);
        setContentTypeHeader(responseHeaders, result);
        setContentDispositionHeader(responseHeaders, result);
        return result;
    }

    private void setContentLengthHeader(HttpHeaders responseHeaders, HttpHeaders result) {
        result.set(HttpHeaders.CONTENT_LENGTH, String.valueOf(responseHeaders.getContentLength()));
    }

    private void setContentDispositionHeader(HttpHeaders responseHeaders, HttpHeaders result) {
        if (responseHeaders.containsKey(HttpHeaders.CONTENT_DISPOSITION)) {
            ContentDisposition contentDisposition = responseHeaders.getContentDisposition();
            result.set(HttpHeaders.CONTENT_DISPOSITION, format("inline; filename=%s", contentDisposition.getFilename()));
        }
    }

    private void setContentTypeHeader(HttpHeaders responseHeaders, HttpHeaders result) {
        Optional.ofNullable(responseHeaders.getContentType())
                .ifPresent(mediaType -> result.set(HttpHeaders.CONTENT_TYPE, mediaType.toString()));
    }
}
