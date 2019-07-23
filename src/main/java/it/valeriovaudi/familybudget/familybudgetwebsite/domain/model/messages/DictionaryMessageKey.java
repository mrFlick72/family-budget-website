package it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages;

import lombok.*;

import javax.persistence.Convert;
import java.io.Serializable;
import java.util.Locale;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class DictionaryMessageKey implements Serializable {

    private String pageName;

    @Convert(converter = LocaleConverter.class)
    private Locale locale;

    private String messageKey;

}
