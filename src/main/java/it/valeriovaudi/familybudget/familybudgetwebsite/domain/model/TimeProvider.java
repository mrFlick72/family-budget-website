package it.valeriovaudi.familybudget.familybudgetwebsite.domain.model;

public class TimeProvider {

    public Month getCurrentMonth(){
        return Month.now();
    }

    public Year getCurrentYear(){
        return Year.now();
    }
}
