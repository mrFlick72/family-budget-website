package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class OAuth2ClientConfig {

    @Bean
    public OAuth2TokenResolver oAuth2TokenResolver(OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        return new OAuth2RefreshableTokenResolver(Duration.ofSeconds(5), oAuth2AuthorizedClientService);
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

    @Bean
    public GlobalFrontChannelLogoutProvider globalFrontChannelLogoutProvider(@Value("${postLogoutRedirectUri}") String postLogoutRedirectUri,
                                                                             @Value("${auth.oidcIss}") String oidConnectDiscoveryEndPoint) {
        return new GlobalFrontChannelLogoutProvider(postLogoutRedirectUri,
                oidConnectDiscoveryEndPoint + "/.well-known/openid-configuration",
                new RestTemplate());
    }
}