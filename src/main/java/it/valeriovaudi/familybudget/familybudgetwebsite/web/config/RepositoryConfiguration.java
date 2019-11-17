package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;


import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.RestMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RepositoryConfiguration {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public RestMessageRepository messageRepository(
            @Value("${i18n-messages.base-url:http://i18n-messages}") String i18nBaseUrl,
            @Value("${spring.application.name}") String applicationId,
            RestTemplate restTemplate) {
        return new RestMessageRepository(i18nBaseUrl, applicationId, restTemplate);
    }

}
