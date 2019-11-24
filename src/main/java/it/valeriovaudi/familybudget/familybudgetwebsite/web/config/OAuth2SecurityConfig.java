package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.vauthenticator.security.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Map;

@EnableWebSecurity
public class OAuth2SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.oauth2.client.registration.client.client-id}")
    private String familyBudgetClientRegistrationId;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().mvcMatchers("/actuator/**", "/oidc_logout.html").permitAll()
                .and()
                .authorizeRequests().anyRequest().authenticated()
                .and().oauth2Login().defaultSuccessUrl("/index")
                .userInfoEndpoint()
                .oidcUserService(vAuthenticatorOidcUserService());
    }

    public VAuthenticatorOidcUserService vAuthenticatorOidcUserService() {
        return new VAuthenticatorOidcUserService(
                Map.of(familyBudgetClientRegistrationId, VAuthenticatorOAuth2User.class),
                new OidcUserService()
        );
    }


    @Bean
    public OAuth2TokenResolver oAuth2TokenResolver(OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        return new OAuth2RefreshableTokenResolver(Duration.ofSeconds(5), oAuth2AuthorizedClientService);
    }

    @Bean
    public GlobalFrontChannelLogoutProvider globalFrontChannelLogoutProvider(@Value("${postLogoutRedirectUri}") String postLogoutRedirectUri,
                                                                             @Value("${auth.oidcIss}") String oidConnectDiscoveryEndPoint) {
        return new GlobalFrontChannelLogoutProvider(postLogoutRedirectUri,
                oidConnectDiscoveryEndPoint + "/.well-known/openid-configuration",
                new RestTemplate());
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
