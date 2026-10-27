package com.uade.tpo.mates.exceptions;

import java.util.Map;

public class InvalidFieldsException extends RuntimeException {

    private final Map<String, String> errors;

    public InvalidFieldsException(Map<String, String> errors) {
        super("Revisá los datos ingresados");
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
