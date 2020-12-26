package it.valeriovaudi.familybudget.familybudgetwebsite.web.model;

import java.io.Serializable;
import java.util.List;

import static java.util.Arrays.asList;

public class MonthRepresentation implements Serializable {

    public String monthLabel;
    public Integer monthValue;


    private static MonthRepresentation newMonthRepresentation(String monthLabel, Integer monthValue) {
        MonthRepresentation monthRepresentation = new MonthRepresentation();
        monthRepresentation.monthLabel = monthLabel;
        monthRepresentation.monthValue = monthValue;
        return monthRepresentation;
    }

    public static List<MonthRepresentation> newMonthRepresentationList() {
        return asList(
                newMonthRepresentation("January", 1),
                newMonthRepresentation("February", 2),
                newMonthRepresentation("March", 3),
                newMonthRepresentation("April", 4),
                newMonthRepresentation("May", 5),
                newMonthRepresentation("June", 6),
                newMonthRepresentation("July", 7),
                newMonthRepresentation("August", 8),
                newMonthRepresentation("September", 9),
                newMonthRepresentation("October", 10),
                newMonthRepresentation("November", 11),
                newMonthRepresentation("December", 12)
        );
    }

}
