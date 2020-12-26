package it.valeriovaudi.familybudget.familybudgetwebsite.domain.model;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Optional;

public final class Month {

    public static final Month JANUARY               = new Month(1);
    public static final Month FEBRUARY              = new Month(2);
    public static final Month MARCH                 = new Month(3);
    public static final Month APRIL                 = new Month(4);
    public static final Month MAY                   = new Month(5);
    public static final Month JUNE                  = new Month(6);
    public static final Month JULY                  = new Month(7);
    public static final Month AUGUST                = new Month(8);
    public static final Month SEPTEMBER             = new Month(9);
    public static final Month OCTOBER               = new Month(10);
    public static final Month NOVEMBER              = new Month(11);
    public static final Month DECEMBER              = new Month(12);

    private final Integer monthValue;

    Month(Integer monthValue) {
        this.monthValue = monthValue;
    }

    public static Month of(Integer monthValue) {
        return new Month(monthValue);
    }

    public String localizedMonthName(Locale locale) {
        return java.time.Month.of(monthValue).getDisplayName(TextStyle.FULL,
                Optional.ofNullable(locale).orElse(Locale.ENGLISH));
    }

    public static Month now() {
        return new Month(LocalDate.now().getMonthValue());
    }

    public Integer getMonthValue() {
        return this.monthValue;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Month)) return false;
        final Month other = (Month) o;
        final Object this$monthValue = this.getMonthValue();
        final Object other$monthValue = other.getMonthValue();
        if (this$monthValue == null ? other$monthValue != null : !this$monthValue.equals(other$monthValue))
            return false;
        return true;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $monthValue = this.getMonthValue();
        result = result * PRIME + ($monthValue == null ? 43 : $monthValue.hashCode());
        return result;
    }

    public String toString() {
        return "Month(monthValue=" + this.getMonthValue() + ")";
    }
}