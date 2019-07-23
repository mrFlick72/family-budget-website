package it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository;

import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.delegate.SpringDataJpaDictionaryMessageRepository;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessage;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.repository.DictionaryMessageRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Slf4j
public class JpaDictionaryMessageRepository implements DictionaryMessageRepository {

    private final Locale defaultLocale;
    private final SpringDataJpaDictionaryMessageRepository delegate;

    public JpaDictionaryMessageRepository(Locale defaultLocale, SpringDataJpaDictionaryMessageRepository delegate) {
        this.defaultLocale = defaultLocale;
        this.delegate = delegate;
    }

    @Override
    public Optional<DictionaryMessage> getMessage(String page, String key, Locale locale) {
        Locale lang = Optional.ofNullable(locale).orElse(defaultLocale);
        return delegate.findByPageNameAndMessageKeyAndLocale(page, key, lang);
    }

    @Override
    public List<DictionaryMessage> getMessages(String page, Locale locale) {
        Locale lang = Optional.ofNullable(locale).orElse(defaultLocale);
        return delegate.findByPageNameAndLocale(page, lang);
    }

    @Override
    public List<DictionaryMessage> getMessages(Locale locale) {
        return delegate.findByLocale(locale);
    }

    @Override
    public void save(DictionaryMessage dictionaryMessage) {
        delegate.save(dictionaryMessage);
    }

    @Override
    public void delete(String page, String key, Locale lang) {
        delegate.deleteByPageNameAndMessageKeyAndLocale(page, key, lang);
    }

}
