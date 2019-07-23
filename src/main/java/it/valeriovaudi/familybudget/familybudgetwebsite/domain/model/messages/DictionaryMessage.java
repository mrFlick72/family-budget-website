package it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Locale;

@Data
@Entity
@ToString
@EqualsAndHashCode(exclude = "message")
@IdClass(DictionaryMessageKey.class)
@NoArgsConstructor
@AllArgsConstructor
public class DictionaryMessage implements Serializable {

    @Id
    @Column(name = "page")
    private String pageName;

    @Id
    @Convert(converter = LocaleConverter.class)
    private Locale locale;

    @Id
    private String messageKey;

    @Column(name = "value")
    private String message;

}
