package it.valeriovaudi.familybudget.familybudgetwebsite;

import io.micrometer.core.instrument.MeterRegistry;
import it.valeriovaudi.vauthenticator.security.clientsecuritystarter.security.RedisOAuth2AuthorizedClientService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

@EnableCaching
@SpringBootApplication
public class FamilyBudgetWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(FamilyBudgetWebsiteApplication.class, args);
    }

    @Bean
    public RedisOAuth2AuthorizedClientService redisOAuth2AuthorizedClientService(RedisTemplate redisTemplate,
                                                                                 ClientRegistrationRepository clientRegistrationRepository) {
        return new RedisOAuth2AuthorizedClientService(redisTemplate, clientRegistrationRepository);
    }

    @Bean
    MeterRegistryCustomizer<MeterRegistry> configurer(@Value("${spring.application.name:}") String applicationName) {
        return (registry) -> registry.config().commonTags("application", applicationName);
    }

}