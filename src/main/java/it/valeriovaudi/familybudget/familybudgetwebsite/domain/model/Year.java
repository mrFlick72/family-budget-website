package it.valeriovaudi.familybudget.familybudgetwebsite.domain.model;

import java.time.LocalDate;

public final class Year {

    private final Integer yearValue;

    Year(Integer yearValue) {
        this.yearValue = yearValue;
    }

    public static Year of(Integer year) {
        return new Year(year);
    }
    public static Year now() {
        return new Year(LocalDate.now().getYear());
    }

    public Integer getYearValue() {
        return this.yearValue;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Year)) return false;
        final Year other = (Year) o;
        final Object this$yearValue = this.getYearValue();
        final Object other$yearValue = other.getYearValue();
        if (this$yearValue == null ? other$yearValue != null : !this$yearValue.equals(other$yearValue)) return false;
        return true;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $yearValue = this.getYearValue();
        result = result * PRIME + ($yearValue == null ? 43 : $yearValue.hashCode());
        return result;
    }

    public String toString() {
        return "Year(yearValue=" + this.getYearValue() + ")";
    }
}
