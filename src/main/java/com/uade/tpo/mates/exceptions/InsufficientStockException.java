package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "No hay stock suficiente de este producto.")
public class InsufficientStockException extends Exception {

    public InsufficientStockException() {
    }

    public InsufficientStockException(String productName, int available) {
        super(available > 0
                ? "Solo hay " + available + (available == 1 ? " unidad disponible" : " unidades disponibles")
                        + " de " + productName + "."
                : productName + " está agotado.");
    }
}
