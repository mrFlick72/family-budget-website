package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;


import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.JpaDictionaryMessageRepository;
import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.delegate.SpringDataJpaDictionaryMessageRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Locale;

@Configuration
public class RepositoryConfiguration {

    @Bean
    public JpaDictionaryMessageRepository messagesRepository(SpringDataJpaDictionaryMessageRepository springDataJpaDictionaryMessageRepository) {
        return new JpaDictionaryMessageRepository(Locale.ENGLISH, springDataJpaDictionaryMessageRepository);
    }
}
