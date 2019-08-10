package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.VAuthenticatorOAuth2User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class OAuth2SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.oauth2.client.registration.client.client-id}")
    private String familyBudgetClientRegistrationId;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().mvcMatchers("/actuator/**").permitAll().and()
                .authorizeRequests().anyRequest().authenticated()
                .and().oauth2Login()
                .userInfoEndpoint()
                .customUserType(VAuthenticatorOAuth2User.class, familyBudgetClientRegistrationId);
    }
}