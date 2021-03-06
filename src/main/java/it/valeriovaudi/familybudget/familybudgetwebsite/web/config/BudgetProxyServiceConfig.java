package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint.budget.BudgetProxyService;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableConfigurationProperties(BudgetProxyService.class)
public class BudgetProxyServiceConfig {

    @Bean
    public BudgetProxyService budgetProxyService(BudgetProxyServiceConfigProperties budgetProxyServiceConfigProperties) {
        return new BudgetProxyService(budgetProxyServiceConfigProperties.getHeadersToSkip());
    }

}

@ConfigurationProperties("budget-proxy-service")
class BudgetProxyServiceConfigProperties {

    private List<String> headersToSkip = new ArrayList<>();

    public List<String> getHeadersToSkip() {
        return headersToSkip;
    }

    public void setHeadersToSkip(List<String> headersToSkip) {
        this.headersToSkip = headersToSkip;
    }
}