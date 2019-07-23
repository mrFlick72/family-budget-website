package it.valeriovaudi.familybudget.familybudgetwebsite.web.security;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface OAuth2TokenResolver {

    String tokenFor(OAuth2AuthenticationToken currentUser);
}
