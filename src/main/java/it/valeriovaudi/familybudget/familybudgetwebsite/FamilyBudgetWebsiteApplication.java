package it.valeriovaudi.familybudget.familybudgetwebsite;

import com.vauthenticator.springbootclientstarter.security.RedisOAuth2AuthorizedClientService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

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


}

@ControllerAdvice
class BaseUiModelInjector {
    private final String vauthenticatorHost;
    private final String managementUiHost;

    BaseUiModelInjector(@Value("${vauthenticator.host}") String vauthenticatorHost,
                        @Value("${vauthenticator.session-management.rp-iframe.host}") String managementUiHost) {
        this.vauthenticatorHost = vauthenticatorHost;
        this.managementUiHost = managementUiHost;
    }

    @ModelAttribute("rpSessionManagementIFrame")
    public String rpSessionManagementIFrame() {
        return String.format("%s/session/management", managementUiHost);
    }

    @ModelAttribute("opSessionManagementIFrame")
    public String opSessionManagementIFrame() {
        return String.format("%s/session/management", vauthenticatorHost);
    }

}