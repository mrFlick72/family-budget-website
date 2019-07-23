package it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BinaryOperator;

import static java.lang.String.format;

@Getter
@ToString
@EqualsAndHashCode
public class DictionaryMessages {

    private final List<DictionaryMessage> messages;

    public DictionaryMessages(List<DictionaryMessage> messages) {
        this.messages = messages;
    }

    public Map<String, String> messages() {
        return messages.stream()
                .map(DictionaryMessages::keyValueMessage)
                .reduce(new HashMap<>(), mergeMessages());
    }

    private BinaryOperator<Map<String, String>> mergeMessages() {
        return (current, accumulator) -> {
            accumulator.putAll(current);
            return accumulator;
        };
    }

    private static Map<String, String> keyValueMessage(DictionaryMessage dictionaryMessage) {
        String messageKey = format("%s.%s", dictionaryMessage.getPageName(), dictionaryMessage.getMessageKey());
        String message = dictionaryMessage.getMessage();
        Map<String, String> messageMap = new HashMap<>();
        messageMap.put(messageKey, message);
        return messageMap;
    }

}