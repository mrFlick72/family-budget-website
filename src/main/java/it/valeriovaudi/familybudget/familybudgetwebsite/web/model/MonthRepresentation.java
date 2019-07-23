package it.valeriovaudi.familybudget.familybudgetwebsite.web.model;

import lombok.*;

import java.io.Serializable;
import java.util.List;

import static java.util.Arrays.asList;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MonthRepresentation implements Serializable {

    private String monthLabel;
    private Integer monthValue;

    public static List<MonthRepresentation> newMonthRepresentationList(){
        return asList(new MonthRepresentation("January",1),
                new MonthRepresentation("February",2),
                new MonthRepresentation("March", 3),
                new MonthRepresentation("April",4),
                new MonthRepresentation("May",5),
                new MonthRepresentation("June",6),
                new MonthRepresentation("July",7),
                new MonthRepresentation("August",8),
                new MonthRepresentation("September",9),
                new MonthRepresentation("October",10),
                new MonthRepresentation("November",11),
                new MonthRepresentation("December", 12));
        }
}
