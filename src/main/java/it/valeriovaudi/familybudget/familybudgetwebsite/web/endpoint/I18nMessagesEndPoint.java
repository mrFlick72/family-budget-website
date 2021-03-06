package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import it.valeriovaudi.familybudget.familybudgetwebsite.domain.repository.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class I18nMessagesEndPoint {

    private final MessageRepository messageRepository;

    public I18nMessagesEndPoint(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping("/v2/messages")
    public ResponseEntity messages() {
        return ResponseEntity.ok(messageRepository.messages());
    }
}
