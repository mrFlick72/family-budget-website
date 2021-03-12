package it.valeriovaudi.familybudget.familybudgetwebsite;

import io.micrometer.core.instrument.MeterRegistry;
import it.valeriovaudi.vauthenticator.security.clientsecuritystarter.security.RedisOAuth2AuthorizedClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableCaching
@SpringBootApplication
public class FamilyBudgetWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(FamilyBudgetWebsiteApplication.class, args);
    }

    @Bean
    public RedisOAuth2AuthorizedClientService redisOAuth2AuthorizedClientService(RedisTemplate redisTemplate,
                                                                                 ClientRegistrationRepository clientRegistrationRepository) {
        return new RedisOAuth2AuthorizedClientService(redisTemplate, clientRegistrationRepository);
    }

    @Bean
    MeterRegistryCustomizer<MeterRegistry> configurer(@Value("${spring.application.name:}") String applicationName) {
        return (registry) -> registry.config().commonTags("application", applicationName);
    }

    @Bean
    public CommonsRequestLoggingFilter logFilter() {
        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter();
        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setIncludeHeaders(true);
        filter.setAfterMessagePrefix("REQUEST DATA AFTER ");
        filter.setBeforeMessagePrefix("REQUEST DATA BEFORE: ");
        return filter;
    }
}

@Component
class CommonsResponseLoggingFilter extends OncePerRequestFilter {

    private final static Logger logger = LoggerFactory.getLogger(CommonsResponseLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        HttpHeaders headers = (new ServletServerHttpResponse(httpServletResponse)).getHeaders();

        logger.debug(headers.toString());

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}