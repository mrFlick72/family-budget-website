package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.vauthenticator.security.clientsecuritystarter.filter.BearerTokenInterceptor;
import it.valeriovaudi.vauthenticator.security.clientsecuritystarter.filter.OAuth2TokenResolver;
import it.valeriovaudi.vauthenticator.security.clientsecuritystarter.user.VAuthenticatorOAuth2User;
import it.valeriovaudi.vauthenticator.security.clientsecuritystarter.user.VAuthenticatorOidcUserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.CustomUserTypesOAuth2UserService;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@EnableWebSecurity
public class OAuth2SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${vauthenticator.client.registrationId}")
    private String registrationId;

    @Value("${granted-role.family-budget-website}")
    private String grantedRole;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().mvcMatchers("/actuator/**", "/oidc_logout.html").permitAll()
                .and()
                .authorizeRequests().anyRequest().hasAnyRole(grantedRole)
                .and().oauth2Login().defaultSuccessUrl("/index")
                .userInfoEndpoint()
                .oidcUserService(vAuthenticatorOidcUserService());
    }

    public VAuthenticatorOidcUserService vAuthenticatorOidcUserService() {
        return new VAuthenticatorOidcUserService(new OidcUserService(),
                new CustomUserTypesOAuth2UserService(Map.of(registrationId, VAuthenticatorOAuth2User.class))
        );
    }

    @Bean
    public RestTemplate accountRestTemplate(OAuth2TokenResolver oAuth2TokenResolver) {
        return new RestTemplateBuilder()
                .additionalInterceptors(new BearerTokenInterceptor(oAuth2TokenResolver))
                .build();
    }

    @Bean
    public RestTemplate budgetRestTemplate(OAuth2TokenResolver oAuth2TokenResolver) {
        return new RestTemplateBuilder()
                .additionalInterceptors(new BearerTokenInterceptor(oAuth2TokenResolver))
                .build();
    }

}
