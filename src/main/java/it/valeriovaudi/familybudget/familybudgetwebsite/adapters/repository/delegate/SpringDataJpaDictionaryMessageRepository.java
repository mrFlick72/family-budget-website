package it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.delegate;

import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessage;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessageKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Transactional(readOnly = true)
public interface SpringDataJpaDictionaryMessageRepository extends JpaRepository<DictionaryMessage, DictionaryMessageKey> {

    Optional<DictionaryMessage> findByPageNameAndMessageKeyAndLocale(String pageName, String key, Locale locale);

    List<DictionaryMessage> findByPageNameAndLocale(String pageName, Locale locale);

    List<DictionaryMessage> findByLocale(Locale locale);

    void deleteByPageNameAndMessageKeyAndLocale(String pageName, String key, Locale locale);
}
