package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "No hay stock suficiente del producto")
public class InsufficientStockException extends Exception {
}
