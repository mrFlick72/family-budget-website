package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;

import it.valeriovaudi.familybudget.familybudgetwebsite.web.security.VAuthenticatorOAuth2User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.CustomUserTypesOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

@EnableWebSecurity
public class OAuth2SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.oauth2.client.registration.client.client-id}")
    private String familyBudgetClientRegistrationId;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().mvcMatchers("/actuator/**").permitAll().and()
                .authorizeRequests().anyRequest().authenticated()
                .and().oauth2Login().defaultSuccessUrl("/index")
                .userInfoEndpoint()
                .oidcUserService(oidcUserService(familyBudgetClientRegistrationId));
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService(String familyBudgetClientRegistrationId) {
        final OidcUserService delegate = new OidcUserService();

        Map<String, Class<? extends OAuth2User>> asMap = Map.of(familyBudgetClientRegistrationId, VAuthenticatorOAuth2User.class);
        CustomUserTypesOAuth2UserService customUserTypesOAuth2UserService = new CustomUserTypesOAuth2UserService(asMap);
        delegate.setOauth2UserService(customUserTypesOAuth2UserService);

        return (userRequest) -> {
            // Delegate to the default implementation for loading a user
            final OidcUser oidcUser = delegate.loadUser(userRequest);

            OAuth2User oAuth2User = customUserTypesOAuth2UserService.loadUser(userRequest);
            Collection<? extends GrantedAuthority> mappedAuthorities = oAuth2User.getAuthorities()
                    .stream()
                    .map(authority ->
                            new OidcUserAuthority(authority.getAuthority(),
                                    oidcUser.getIdToken(),
                                    oidcUser.getUserInfo()))
                    .collect(Collectors.toList());

            return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
        };
    }
}