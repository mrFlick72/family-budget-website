package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;

@RestController
@RequestMapping("/account-service/account")
public class AccountEndPoint {

    private final RestTemplate accountRestTemplate;

    public AccountEndPoint(@Qualifier("accountRestTemplate") RestTemplate accountRestTemplate) {
        this.accountRestTemplate = accountRestTemplate;
    }

    @GetMapping
    public ResponseEntity account(@AuthenticationPrincipal Principal principal) {
        System.out.println(principal);
        return ResponseEntity.ok(accountRestTemplate.getForObject("http://account-service/account/{mail}/mail",
                String.class, principal.getName()));
    }

    @PutMapping
    public ResponseEntity save(@AuthenticationPrincipal Principal principal, @RequestBody String body) throws URISyntaxException {
        URI uri = new URI(String.format("http://account-service/account/%s/mail", principal.getName()));
        RequestEntity<String> request = RequestEntity.put(uri).contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).body(body);
        accountRestTemplate.exchange(request, Void.class);
        return ResponseEntity.noContent().build();
    }
}
