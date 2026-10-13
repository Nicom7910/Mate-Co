package com.uade.tpo.mates.util;

import java.time.DayOfWeek;
import java.time.LocalDate;

public final class BusinessDays {

    private BusinessDays() {
    }

    public static LocalDate add(LocalDate start, int days) {
        LocalDate result = start;
        int added = 0;

        while (added < days) {
            result = result.plusDays(1);
            DayOfWeek day = result.getDayOfWeek();
            if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY)
                added++;
        }

        return result;
    }
}