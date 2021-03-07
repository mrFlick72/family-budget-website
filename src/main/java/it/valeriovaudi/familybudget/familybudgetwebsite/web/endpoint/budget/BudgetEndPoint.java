package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.WebRequest;

@RestController
public class BudgetEndPoint {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(BudgetEndPoint.class);
    private final String budgetServiceUri;
    private final BudgetProxyService budgetProxyService;
    private final RestTemplate budgetRestTemplate;

    public BudgetEndPoint(@Value("${budgetServiceUri:http://budget-service:8080}") String budgetServiceUri,
                          BudgetProxyService budgetProxyService,
                          RestTemplate budgetRestTemplate) {
        this.budgetServiceUri = budgetServiceUri;
        this.budgetProxyService = budgetProxyService;
        this.budgetRestTemplate = budgetRestTemplate;
    }

    @RequestMapping(value = "/budget-service/**", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity proxy(WebRequest webRequest,
                                HttpMethod method,
                                @RequestBody(required = false) Object body) {

        String path = budgetServiceUri + budgetProxyService.pathFor(webRequest);
        HttpEntity<?> requestEntity = budgetProxyService.httpEntityFor(body);

        budgetProxyService.log(method, body, path, requestEntity);

        ResponseEntity response = budgetRestTemplate.exchange(path, method, requestEntity, byte[].class);
        budgetProxyService.log(response);

        return ResponseEntity.status(response.getStatusCode())
                .headers(budgetProxyService.responseHeadersFrom(response.getHeaders()))
                .body(response.getBody());
    }

}