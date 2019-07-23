package it.valeriovaudi.familybudget.familybudgetwebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class FamilyBudgetWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(FamilyBudgetWebsiteApplication.class, args);
    }

}