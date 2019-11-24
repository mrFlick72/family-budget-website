package it.valeriovaudi.familybudget.familybudgetwebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.retry.annotation.EnableRetry;

@EnableRetry
@EnableCaching
@EnableZuulProxy
@SpringBootApplication(scanBasePackages = {"it.valeriovaudi.familybudget.familybudgetwebsite", "it.valeriovaudi.vauthenticator.security"})
public class FamilyBudgetWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(FamilyBudgetWebsiteApplication.class, args);
    }

}