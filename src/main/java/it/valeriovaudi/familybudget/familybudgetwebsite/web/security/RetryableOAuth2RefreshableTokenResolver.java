package it.valeriovaudi.familybudget.familybudgetwebsite.web.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;


@Slf4j
public class RetryableOAuth2RefreshableTokenResolver implements OAuth2TokenResolver {

    private final OAuth2TokenResolver delegate;
    private final RetryTemplate retryTemplate;

    public RetryableOAuth2RefreshableTokenResolver(OAuth2TokenResolver delegate, RetryTemplate retryTemplate) {
        this.delegate = delegate;
        this.retryTemplate = retryTemplate;
    }

    @Override
    public String tokenFor(OAuth2AuthenticationToken currentUser) {
        return retryTemplate.execute(retryContext -> delegate.tokenFor(currentUser));
    }
}
