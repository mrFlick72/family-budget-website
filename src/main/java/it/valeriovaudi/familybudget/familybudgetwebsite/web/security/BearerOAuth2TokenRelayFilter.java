package it.valeriovaudi.familybudget.familybudgetwebsite.web.security;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public class BearerOAuth2TokenRelayFilter extends ZuulFilter {

    private final OAuth2RefreshableTokenResolver oAuth2RefreshableTokenResolver;

    public BearerOAuth2TokenRelayFilter(OAuth2RefreshableTokenResolver oAuth2RefreshableTokenResolver) {
        this.oAuth2RefreshableTokenResolver = oAuth2RefreshableTokenResolver;
    }

    public int filterOrder() {
        return 10;
    }

    public String filterType() {
        return "pre";
    }

    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        OAuth2AuthenticationToken currentUser =
                OAuth2AuthenticationToken.class.cast(SecurityContextHolder.getContext().getAuthentication());
        String authorization = oAuth2RefreshableTokenResolver.tokenFor(currentUser);
        ctx.addZuulRequestHeader(HttpHeaders.AUTHORIZATION, "Bearer " + authorization);
        return null;
    }
}
