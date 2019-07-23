package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.BearerOAuth2TokenRelayFilter;
import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.BearerTokenInterceptor;
import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.OAuth2RefreshableTokenResolver;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OAuth2ClientConfig {

    @Bean
    public BearerOAuth2TokenRelayFilter bearerOAuth2TokenRelayFilter(OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        return new BearerOAuth2TokenRelayFilter(new OAuth2RefreshableTokenResolver(oAuth2AuthorizedClientService));
    }

    @Bean
    @LoadBalanced
    public RestTemplate accountRestTemplate(OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        return new RestTemplateBuilder()
                .additionalInterceptors(new BearerTokenInterceptor(new OAuth2RefreshableTokenResolver(oAuth2AuthorizedClientService)))
                .build();
    }

}