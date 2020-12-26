package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.Optional;

import static org.springframework.http.HttpMethod.POST;

@RestController
public class MultipartBudgetEndpoint {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(MultipartBudgetEndpoint.class);
    private final String budgetServiceUri;
    private final BudgetProxyService budgetProxyService;
    private final RestTemplate budgetRestTemplate;

    public MultipartBudgetEndpoint(@Value("${budgetServiceUri:http://budget-service:8080}") String budgetServiceUri,
                                   BudgetProxyService budgetProxyService,
                                   RestTemplate budgetRestTemplate) {
        this.budgetServiceUri = budgetServiceUri;
        this.budgetProxyService = budgetProxyService;
        this.budgetRestTemplate = budgetRestTemplate;
    }

    @PostMapping(value = "/budget-service/**", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity multipartProxy(WebRequest webRequest,
                                         @RequestHeader MultiValueMap<String, String> headers,
                                         MultipartHttpServletRequest multipartHttpServletRequest) throws IOException {
        String path = budgetServiceUri + budgetProxyService.pathFor(webRequest);

        LinkedMultiValueMap<String, Object> body = multipartBodyFor(multipartHttpServletRequest.getMultiFileMap());
        HttpEntity<?> requestEntity = budgetProxyService.httpEntityFor(body, headers);

        budgetProxyService.log(POST, body, path, requestEntity);

        ResponseEntity response = budgetRestTemplate.exchange(path, POST, requestEntity, Void.class);
        return ResponseEntity.status(response.getStatusCode())
                .headers(response.getHeaders())
                .build();
    }

    private LinkedMultiValueMap<String, Object> multipartBodyFor(MultiValueMap<String, MultipartFile> multiparts) throws IOException {
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        multiparts.forEach(
                (partName, multipartFiles) ->
                        multipartFiles.forEach(
                                multipartFile -> {
                                    filePartFor(multipartFile)
                                            .ifPresent(httpEntity -> body.add(partName, httpEntity));
                                }
                        )
        );
        return body;
    }


    private Optional<HttpEntity<byte[]>> filePartFor(MultipartFile attachment) {
        Optional<HttpEntity<byte[]>> attachmentEntity = Optional.empty();

        try {
            byte[] bytes = attachment.getBytes();
            MultiValueMap<String, String> fileMetadata = new LinkedMultiValueMap<>();
            ContentDisposition contentDisposition = ContentDisposition
                    .builder("form-data")
                    .name("attachment")
                    .filename(attachment.getOriginalFilename())
                    .build();
            fileMetadata.add(HttpHeaders.CONTENT_TYPE, attachment.getContentType());
            fileMetadata.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(attachment.getSize()));
            fileMetadata.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString());
            attachmentEntity = Optional.of(new HttpEntity<>(bytes, fileMetadata));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return attachmentEntity;
    }
}