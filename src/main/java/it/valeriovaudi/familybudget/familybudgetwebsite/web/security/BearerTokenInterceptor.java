package it.valeriovaudi.familybudget.familybudgetwebsite.web.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import java.io.IOException;

@Slf4j
public class BearerTokenInterceptor implements ClientHttpRequestInterceptor {
    private final OAuth2RefreshableTokenResolver oAuth2RefreshableTokenResolver;

    public BearerTokenInterceptor(OAuth2RefreshableTokenResolver oAuth2RefreshableTokenResolver) {
        this.oAuth2RefreshableTokenResolver = oAuth2RefreshableTokenResolver;
    }

    @Override
    public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution execution) throws IOException {
        OAuth2AuthenticationToken currentUser =
                OAuth2AuthenticationToken.class.cast(SecurityContextHolder.getContext().getAuthentication());


        httpRequest.getHeaders()
                .add(HttpHeaders.AUTHORIZATION, "Bearer " + oAuth2RefreshableTokenResolver.tokenFor(currentUser));

        return execution.execute(httpRequest, bytes);
    }

}
