package com.uade.tpo.mates.exceptions;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.util.StringUtils;

// Junta los errores de varios campos y los lanza todos juntos.
public class FieldErrors {

    private static final int MIN_PHONE_DIGITS = 8;

    private final Map<String, String> errors = new LinkedHashMap<>();

    public FieldErrors add(String field, String message) {
        errors.putIfAbsent(field, message);
        return this;
    }

    public boolean has(String field) {
        return errors.containsKey(field);
    }

    public FieldErrors requireText(String field, String value, String message) {
        if (!StringUtils.hasText(value))
            add(field, message);
        return this;
    }

    public FieldErrors requirePhone(String phone) {
        if (!StringUtils.hasText(phone))
            return add("phone", "Ingresá tu teléfono.");
        if (phone.replaceAll("\\D", "").length() < MIN_PHONE_DIGITS)
            add("phone", "El teléfono debe tener al menos " + MIN_PHONE_DIGITS + " números.");
        return this;
    }

    public void throwIfAny() {
        if (!errors.isEmpty())
            throw new InvalidFieldsException(errors);
    }
}
