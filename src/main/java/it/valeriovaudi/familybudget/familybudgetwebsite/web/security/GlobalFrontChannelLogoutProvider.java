package it.valeriovaudi.familybudget.familybudgetwebsite.web.security;

import org.springframework.web.client.RestOperations;

import java.util.HashMap;


public class GlobalFrontChannelLogoutProvider {

    private final String postLogoutRedirectUri;
    private final String oidConnectDiscoveryEndPoint;
    private final RestOperations restTemplate;

    public GlobalFrontChannelLogoutProvider(String postLogoutRedirectUri, String oidConnectDiscoveryEndPoint, RestOperations restTemplate) {
        this.postLogoutRedirectUri = postLogoutRedirectUri;
        this.oidConnectDiscoveryEndPoint = oidConnectDiscoveryEndPoint;
        this.restTemplate = restTemplate;
    }

    public String getLogoutUrl() {
        String logoutUrl = baseLogoutUrlFromOP();
        return logoutUrl + "?post_logout_redirect_uri=" + postLogoutRedirectUri;
    }

    private String baseLogoutUrlFromOP() {
        HashMap<String, String> forObject = restTemplate.getForObject(oidConnectDiscoveryEndPoint, HashMap.class);
        return forObject.get("frontchannel_logout_uri");
    }
}

