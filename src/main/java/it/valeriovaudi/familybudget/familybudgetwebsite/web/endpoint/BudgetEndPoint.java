package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toList;
import static org.springframework.http.HttpMethod.POST;
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

    @PostMapping(value = "/budget-service/**", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity multipartProxy(WebRequest webRequest,
                                         @RequestHeader MultiValueMap<String, String> headers,
                                         @RequestParam("attachment") MultipartFile attachment) throws IOException {
        String path = budgetServiceUri + pathFor(webRequest);

        LinkedMultiValueMap<String, Object> body = multipartBodyFor(attachment);
        HttpEntity<?> requestEntity = httpEntityFor(body, headers);

        log(POST, body, path, requestEntity);

        ResponseEntity response = budgetRestTemplate.exchange(path, POST, requestEntity, Void.class);
        return ResponseEntity.status(response.getStatusCode())
                .headers(response.getHeaders())
                .build();
    }

    private LinkedMultiValueMap<String, Object> multipartBodyFor(MultipartFile attachment) throws IOException {
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("attachment", filePartFor(attachment));
        return body;
    }

    private HttpEntity<byte[]> filePartFor(MultipartFile attachment) throws IOException {
        MultiValueMap<String, String> fileMetadata = new LinkedMultiValueMap<>();
        ContentDisposition contentDisposition = ContentDisposition
                .builder("form-data")
                .name("attachment")
                .filename(attachment.getOriginalFilename())
                .build();
        fileMetadata.add(HttpHeaders.CONTENT_TYPE, attachment.getContentType());
        fileMetadata.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(attachment.getSize()));
        fileMetadata.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString());
        HttpEntity<byte[]> attachmentEntity = new HttpEntity<>(attachment.getBytes(), fileMetadata);
        return attachmentEntity;
    }

    @RequestMapping(value = "/budget-service/**", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity proxy(WebRequest webRequest,
                                HttpMethod method,
                                @RequestHeader MultiValueMap<String, String> headers,
                                @RequestBody(required = false) Object body) {

        String path = budgetServiceUri + pathFor(webRequest);
        HttpEntity<?> requestEntity = httpEntityFor(body, headers);

        log(method, body, path, requestEntity);

        ResponseEntity response = budgetRestTemplate.exchange(path, method, requestEntity, byte[].class);
        return ResponseEntity.status(response.getStatusCode())
                .headers(response.getHeaders())
                .body(response.getBody());
    }

    private HttpEntity<?> httpEntityFor(Object body, MultiValueMap<String, String> headers) {
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
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

    private void log(HttpMethod method, Object body, String path, HttpEntity<?> requestEntity) {
        log.info("path: " + path);
        log.info("method: " + method);
        log.info("body: " + body);
        log.info("requestEntity: " + requestEntity.getBody());
        log.info("requestEntity: " + requestEntity.getHeaders());
    }
}