package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessage;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessages;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.repository.DictionaryMessageRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.Locale;

@RestController
@RequestMapping("/messages")
public class MessagesEndPoint {

    private final DictionaryMessageRepository dictionaryMessageRepository;

    public MessagesEndPoint(DictionaryMessageRepository dictionaryMessageRepository) {
        this.dictionaryMessageRepository = dictionaryMessageRepository;
    }

    @GetMapping
    public ResponseEntity getAllMessages(@RequestParam(value = "lang", defaultValue = "en") Locale locale) {
        return ResponseEntity.ok(new DictionaryMessages(dictionaryMessageRepository.getMessages(locale)).messages());
    }

    @GetMapping("/{page}")
    public ResponseEntity getMessages(@PathVariable String page, @RequestParam(value = "lang", defaultValue = "en") Locale locale) {
        return ResponseEntity.ok(new DictionaryMessages(dictionaryMessageRepository.getMessages(page, locale)).messages());
    }

    @GetMapping("/{page}/key/{key}/lang/{lang}")
    public ResponseEntity getMessage(@PathVariable String page,
                                     @PathVariable String key,
                                     @PathVariable Locale lang) {
        return dictionaryMessageRepository.getMessage(page, key, lang)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity saveMessages(@RequestBody DictionaryMessage dictionaryMessage) {
        dictionaryMessageRepository.save(dictionaryMessage);
        String location = MvcUriComponentsBuilder.fromMethodName(MessagesEndPoint.class, "getMessage",
                dictionaryMessage.getPageName(),
                dictionaryMessage.getMessageKey(),
                dictionaryMessage.getLocale())
                .build().toUriString();

        return ResponseEntity.noContent().header(HttpHeaders.LOCATION, location).build();
    }

    @DeleteMapping("/{page}/key/{key}/lang/{lang}")
    public ResponseEntity deleteMessage(@PathVariable String page,
                                        @PathVariable String key,
                                        @PathVariable Locale lang) {
        dictionaryMessageRepository.delete(page, key, lang);

        return ResponseEntity.noContent().build();
    }
}
