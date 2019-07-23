package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;


import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.TimeProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TimeProviderConfig {

    @Bean
    public TimeProvider timeProvider(){
        return new TimeProvider();
    }
}
