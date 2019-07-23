package it.valeriovaudi.familybudget.familybudgetwebsite.domain.repository;


import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessage;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

public interface DictionaryMessageRepository {

    Optional<DictionaryMessage> getMessage(String page, String key, Locale locale);

    List<DictionaryMessage> getMessages(String page, Locale locale);

    List<DictionaryMessage> getMessages(Locale locale);

    void save(DictionaryMessage dictionaryMessage);

    void delete(String page, String key, Locale lang);
}
