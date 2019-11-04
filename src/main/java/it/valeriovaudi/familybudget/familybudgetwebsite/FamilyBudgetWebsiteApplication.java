package it.valeriovaudi.familybudget.familybudgetwebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@EnableRetry
@EnableCaching
@EnableZuulProxy
@SpringBootApplication
public class FamilyBudgetWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(FamilyBudgetWebsiteApplication.class, args);
    }

}


@RestController
class Bo {

    @GetMapping("/principal")
    public ResponseEntity bo(Principal principal){
        return ResponseEntity.ok(principal);
    }

}