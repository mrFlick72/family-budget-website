package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.*;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OAuth2ClientConfig {

    @Bean
    public OAuth2TokenResolver oAuth2TokenResolver(OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        OAuth2RefreshableTokenResolver delegate =
                new OAuth2RefreshableTokenResolver(oAuth2AuthorizedClientService);

        RetryTemplate retryTemplate = new RetryTemplate();
        SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy(5);
        retryTemplate.setRetryPolicy(retryPolicy);
        retryTemplate.setBackOffPolicy(new FixedBackOffPolicy());

        return new RetryableOAuth2RefreshableTokenResolver(delegate, retryTemplate);
    }

    @Bean
    public BearerOAuth2TokenRelayFilter bearerOAuth2TokenRelayFilter(OAuth2TokenResolver oAuth2TokenResolver) {
        return new BearerOAuth2TokenRelayFilter(oAuth2TokenResolver);
    }

    @Bean
    @LoadBalanced
    public RestTemplate accountRestTemplate(OAuth2TokenResolver oAuth2TokenResolver) {
        return new RestTemplateBuilder()
                .additionalInterceptors(new BearerTokenInterceptor(oAuth2TokenResolver))
                .build();
    }

}